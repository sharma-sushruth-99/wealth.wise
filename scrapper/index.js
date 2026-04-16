const puppeteer = require('puppeteer');
const mysql = require('mysql2/promise');
const companies = require('./companies');

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'password', // Default, change if needed
  database: 'wealth_wise'
};

async function initDB() {
  const connection = await mysql.createConnection({
    host: DB_CONFIG.host,
    user: DB_CONFIG.user,
    password: DB_CONFIG.password
  });
  
  await connection.query('CREATE DATABASE IF NOT EXISTS wealth_wise');
  await connection.end();

  const pool = mysql.createPool(DB_CONFIG);
  return pool;
}

// Scrape single company data
async function scrapeCompanyData(page, symbol) {
  // We use the new Yahoo Finance URL structure
  const url = `https://finance.yahoo.com/quote/${symbol}/`;
  
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Yahoo finance values can often be found by fin-streamer tags with data-field
    const data = await page.evaluate((symbol) => {
      const getFloat = (field) => {
        const el = document.querySelector(`fin-streamer[data-field="${field}"]`);
        if (!el) return null;
        const val = el.getAttribute('value') || el.innerText.replace(/,/g, '');
        return parseFloat(val);
      };
      
      const getString = (field) => {
        const el = document.querySelector(`fin-streamer[data-field="${field}"]`);
        if (!el) return null;
        return el.innerText;
      };

      const getTdValue = (label) => {
        // Yahoo finance has a grid of values. We look for the label.
        const dts = Array.from(document.querySelectorAll('td'));
        for(let i = 0; i < dts.length; i++) {
          if(dts[i].innerText.includes(label)) {
             return dts[i+1] ? dts[i+1].innerText : null;
          }
        }
        return null;
      };

      const price = getFloat('regularMarketPrice');
      const change = getFloat('regularMarketChange');
      const changePercent = getFloat('regularMarketChangePercent');
      const volume = getFloat('regularMarketVolume');

      // These are often in a table
      const marketCap = getTdValue('Market Cap');
      let peRatio = getTdValue('PE Ratio');
      if (peRatio) peRatio = parseFloat(peRatio);
      if (isNaN(peRatio)) peRatio = null;
      
      const divYieldStr = getTdValue('Forward Dividend & Yield');
      let dividendYield = null;
      if (divYieldStr && divYieldStr.includes('(')) {
         dividendYield = parseFloat(divYieldStr.split('(')[1].replace('%', '').replace(')', ''));
      }

      const weekRange = getTdValue('52 Week Range');
      let weekLow = null, weekHigh = null;
      if (weekRange && weekRange.includes('-')) {
        const parts = weekRange.split('-');
        weekLow = parseFloat(parts[0].replace(/,/g,'').trim());
        weekHigh = parseFloat(parts[1].replace(/,/g,'').trim());
      }

      const nameEl = document.querySelector('h1');
      const name = nameEl ? nameEl.innerText.split('(')[0].trim() : symbol;

      return {
        symbol,
        name,
        price,
        change,
        changePercent,
        volume,
        marketCap,
        peRatio,
        dividendYield,
        weekHigh,
        weekLow
      };
    }, symbol);

    return data;
  } catch (error) {
    console.error(`Error scraping ${symbol}:`, error.message);
    return null;
  }
}

async function main() {
  console.log("Initializing database connection...");
  let db;
  try {
    db = await initDB();
  } catch(e) {
    console.error("Failed to connect to MySQL. Ensure MySQL is running on localhost with root:password");
    console.error(e);
    return;
  }

  console.log("Launching browser...");
  const browser = await puppeteer.launch({ 
    headless: "new"
  });
  
  const page = await browser.newPage();
  // Speed up loading
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (['image', 'stylesheet', 'font', 'media'].includes(request.resourceType())) {
      request.abort();
    } else {
      request.continue();
    }
  });

  for (let i = 0; i < companies.length; i++) {
    const sym = companies[i];
    console.log(`[${i+1}/${companies.length}] Scraping ${sym}...`);
    const data = await scrapeCompanyData(page, sym);
    
    if (data && data.price !== null) {
      // 1. Insert into companies (ignore if exists)
      await db.execute(
        `INSERT IGNORE INTO companies (symbol, name) VALUES (?, ?)`,
        [data.symbol, data.name]
      );
      
      // 2. Insert or update stock_data
      await db.execute(
        `INSERT INTO stock_data 
         (symbol, price, change_value, change_percent, volume, market_cap, pe_ratio, dividend_yield, 52_week_high, 52_week_low) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
         price=VALUES(price), change_value=VALUES(change_value), change_percent=VALUES(change_percent),
         volume=VALUES(volume), market_cap=VALUES(market_cap), pe_ratio=VALUES(pe_ratio), 
         dividend_yield=VALUES(dividend_yield), 52_week_high=VALUES(52_week_high), 52_week_low=VALUES(52_week_low)`,
        [
          data.symbol, data.price, data.change, data.changePercent, data.volume,
          data.marketCap || null, data.peRatio || null, data.dividendYield || null,
          data.weekHigh || null, data.weekLow || null
        ]
      );
      console.log(`    -> Saved ${sym} (₹${data.price})`);
    } else {
      console.log(`    -> Failed to extract valid data for ${sym}`);
    }
    
    // Gentle delay to avoid blocking
    await new Promise(r => setTimeout(r, 2000));
  }

  await browser.close();
  await db.end();
  console.log("Scraping completed.");
}

main();
