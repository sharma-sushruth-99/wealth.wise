import React, { useState } from 'react';

const mockTx = [
  { id: 1, date: 'Apr 12, 2024', desc: 'Bought TCS shares', type: 'BUY', sym: 'TCS.NS', qty: 10, price: 3800, total: 38000 },
  { id: 2, date: 'Apr 10, 2024', desc: 'Initial Deposit', type: 'DEPOSIT', sym: '-', qty: '-', price: '-', total: 1500000 },
];

const Transactions = () => {
  const [filter, setFilter] = useState('ALL');

  return (
    <div className="page-content">
      <div className="mb-8">
        <div className="page-title">Transactions</div>
        <div className="page-subtitle">Track your trading activity</div>
      </div>
      
      <div className="flex items-center gap-2.5 mb-5">
        <button onClick={() => setFilter('ALL')} className={`px-4 py-2 rounded-full text-[12px] border transition-all ${filter === 'ALL' ? 'text-gold bg-[#1c1810] border-golddim' : 'text-muted border-border bg-transparent hover:text-text hover:border-border2'}`}>All</button>
        <button onClick={() => setFilter('BUY')} className={`px-4 py-2 rounded-full text-[12px] border transition-all ${filter === 'BUY' ? 'text-gold bg-[#1c1810] border-golddim' : 'text-muted border-border bg-transparent hover:text-text hover:border-border2'}`}>Buys</button>
        <button onClick={() => setFilter('SELL')} className={`px-4 py-2 rounded-full text-[12px] border transition-all ${filter === 'SELL' ? 'text-gold bg-[#1c1810] border-golddim' : 'text-muted border-border bg-transparent hover:text-text hover:border-border2'}`}>Sells</button>
      </div>
      
      <div className="card p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4">Date</th>
              <th className="px-2 py-4">Description</th>
              <th className="px-2 py-4">Symbol</th>
              <th className="px-2 py-4 text-right">Qty</th>
              <th className="px-2 py-4 text-right">Price</th>
              <th className="px-6 py-4 text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockTx.filter(t => filter === 'ALL' || t.type === filter).map(t => (
              <tr key={t.id}>
                <td className="px-6 py-3.5 text-muted text-[12px]">{t.date}</td>
                <td className="px-2 py-3.5 font-normal flex items-center gap-2">
                  <span className={`badge ${t.type === 'BUY' ? 'badge-gold' : t.type === 'SELL' ? 'badge-red' : 'badge-green'}`}>{t.type}</span>
                  {t.desc}
                </td>
                <td className="px-2 py-3.5 text-muted">{t.sym}</td>
                <td className="px-2 py-3.5 text-right">{t.qty}</td>
                <td className="px-2 py-3.5 text-right">{t.price !== '-' ? `₹${t.price}` : '-'}</td>
                <td className={`px-6 py-3.5 text-right ${t.type === 'BUY' ? 'text-red' : 'text-green'}`}>
                  {t.type === 'BUY' ? '−' : '+'}₹{t.total.toLocaleString()}
                </td>
              </tr>
            ))}
            {mockTx.filter(t => filter === 'ALL' || t.type === filter).length === 0 && (
               <tr><td colSpan="6" className="text-center py-10 text-muted">No transactions found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
