import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  // Mock portfolio
  const portfolio = { cash: 157500, totalValue: 1842500 };
  const holdings = [
    { sym: 'TCS.NS', name: 'TCS', qty: 10, avgPrice: 3500, currentPrice: 3812 },
    { sym: 'INFY.NS', name: 'Infosys', qty: 25, avgPrice: 1400, currentPrice: 1478 },
  ];

  return (
    <div className="page-content">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="page-title">Portfolio</div>
          <div className="page-subtitle">Manage what you own</div>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 mb-6">
        <div className="card p-5 cursor-default">
          <div className="w-9 h-9 rounded-lg bg-bg3 flex items-center justify-center mb-4">
             <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="var(--gold)" strokeWidth="1.5"><rect x="2" y="5" width="16" height="11" rx="2"/><path d="M6 5V4a2 2 0 014 0v1"/></svg>
          </div>
          <div className="text-[12px] text-muted mb-1.5 uppercase tracking-[0.07em]">Virtual Cash</div>
          <div className="font-serif text-[26px] font-light text-text">₹{portfolio.cash.toLocaleString()}</div>
          <div className="text-[12px] text-muted mt-1.5">Available for trading</div>
        </div>
        
        {holdings.map((h, i) => {
           const pnl = (h.currentPrice - h.avgPrice) * h.qty;
           const pnlPct = ((h.currentPrice - h.avgPrice) / h.avgPrice) * 100;
           return (
            <Link to={`/stocks/${h.sym}`} key={i} className="card p-5 hover:border-golddim transition-colors block">
              <div className="w-9 h-9 rounded-lg bg-bg3 flex items-center justify-center mb-4">
                 <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="var(--gold)" strokeWidth="1.5"><polyline points="2,14 7,8 11,11 18,4"/></svg>
              </div>
              <div className="text-[12px] text-muted mb-1.5 uppercase tracking-[0.07em]">Stock — {h.name}</div>
              <div className="font-serif text-[26px] font-light text-text">₹{(h.currentPrice * h.qty).toLocaleString()}</div>
              <div className={`text-[12px] mt-1.5 ${pnl >= 0 ? 'text-green' : 'text-red'}`}>
                {pnl >= 0 ? '▲' : '▼'} ₹{Math.abs(pnl).toLocaleString()} ({Math.abs(pnlPct).toFixed(2)}%)
              </div>
            </Link>
           )
        })}
      </div>
    </div>
  );
};

export default Portfolio;
