import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const mockStocks = [
  {name:'Reliance Industries',sym:'RELIANCE.NS',price:2941,chg:1.2,cap:'19.8L Cr'},
  {name:'TCS',sym:'TCS.NS',price:3812,chg:3.2,cap:'13.8L Cr'},
  {name:'HDFC Bank',sym:'HDFCBANK.NS',price:1642,chg:-0.4,cap:'12.4L Cr'},
  {name:'Infosys',sym:'INFY.NS',price:1478,chg:1.8,cap:'6.1L Cr'},
  {name:'ICICI Bank',sym:'ICICIBANK.NS',price:1124,chg:0.9,cap:'7.9L Cr'},
];

const Stocks = () => {
  const [stocks, setStocks] = useState(mockStocks);

  useEffect(() => {
    // In actual implementation, we would fetch from backend /api/stocks here
    // fetch('http://localhost:8080/api/stocks')
    //   .then(res => res.json())
    //   .then(data => setStocks(data));
  }, []);

  return (
    <div className="page-content">
      <div className="mb-8">
        <div className="page-title">Stocks</div>
        <div className="page-subtitle">Live Nifty 50 — market prices</div>
      </div>
      
      <div className="card p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3.5">Company</th>
              <th className="px-2 py-3.5">Symbol</th>
              <th className="px-2 py-3.5 text-right">Price</th>
              <th className="px-2 py-3.5 text-right">Change</th>
              <th className="px-2 py-3.5 text-right">Mkt Cap</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((s, i) => {
              const up = s.chg >= 0;
              return (
                <tr key={i}>
                  <td className="px-6 py-3 font-normal">{s.name}</td>
                  <td className="px-2 py-3 text-muted text-[12px]">{s.sym}</td>
                  <td className="px-2 py-3 text-right">₹{s.price.toLocaleString()}</td>
                  <td className={`px-2 py-3 text-right ${up ? 'text-green' : 'text-red'}`}>
                    {up ? '▲' : '▼'} {Math.abs(s.chg)}%
                  </td>
                  <td className="px-2 py-3 text-right text-muted text-[12px]">{s.cap}</td>
                  <td className="px-6 py-3 text-right">
                    <Link to={`/stocks/${s.sym}`} className="px-3.5 py-1.5 rounded-md bg-gold text-[#0c0a06] font-medium text-[11px] hover:bg-gold2 transition-colors">Trade</Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stocks;
