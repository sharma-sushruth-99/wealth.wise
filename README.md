# Wealth.wise

**Wealth.wise** is a full-stack, mock wealth management web application built as an intern project. It simulates a premium stock portfolio tracking experience, allowing users to view real stock data (NIFTY 50), buy/sell mock equity, and seamlessly manage a virtual wallet.

## 🏗️ Architecture Stack
* **Database:** MySQL (Normalized relational data)
* **Scraper API:** Node.js & Puppeteer (Fetches live NIFTY 50 data directly from Yahoo Finance)
* **Backend API:** Java 17+ & Spring Boot 3 + JPA (Orchestrates users, portfolios, and transaction logic)
* **Frontend:** React + Vite & TailwindCSS (Premium dark-mode dashboard)

---

## 🚀 Setup & Installation

### Prerequisite Requirements
- MySQL Server (v8+)
- Node.js (LTS version) & NPM
- Java JDK 17+
- Apache Maven

### 1. Database Setup
1. Log into your local MySQL server (Username: `root`, Password: `password`).
2. Run the SQL schema:
   ```bash
   mysql -u root -p < db/schema.sql
   ```

### 2. Scraper Setup
Populate the database with the initial NIFTY 50 stock quotes.
```bash
cd scrapper
npm install
node index.js
```
*(Run this command whenever you want to update the database with fresh live stock prices).*

### 3. Backend Setup
Boot up the Spring Application to expose the REST APIs.
```bash
cd backend
mvn spring-boot:run
```
*(The API will be available at `http://localhost:8080`)*

### 4. Frontend Setup
Start the React Vite development server.
```bash
cd frontend
npm install
npm run dev
```
*(Access the web application at `http://localhost:5173`)*

---

## 🖥️ Operating the App

* **Dashboard Overview:** Upon entering the app (via the mock login login), view your Net Worth graph, total assets vs liabilities, and the recent transaction feed.
* **Stocks Market:** Check the NIFTY 50 tracker for current prices. Click **Buy** on any stock to seamlessly execute a mock transaction which will deduct your virtual cash balance.
* **Portfolio & Assets:** Any bought stock automatically registers to your Holdings and reflects in your total Portfolio calculation. Sell stocks at any time to reclaim virtual cash.
* **Transactions:** Check your comprehensive chronological list of buy/sell histories across the platform.

Happy trading!
