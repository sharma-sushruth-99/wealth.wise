import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StockDetail = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  
  // Mock data for detail
  const stock = { name: symbol.split('.')[0] + ' Ltd', sym: symbol, price: 2941, chg: 1.2, pe: 28.5, cap: '19.8L Cr', high: 3000, low: 2200 };

  const handleTrade = (type) => {
     // In an actual app, this would make a POST /api/portfolio/1/{type} request
     alert(`Successfully placed a ${type} order for ${qty} shares of ${symbol}.`);
     navigate('/portfolio');
  };

  return (
    <div className="page-content">
      <button onClick={() => navigate(-1)} className="text-gold text-[12px] mb-4 hover:underline">← Back to Stocks</button>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="page-title">{stock.name}</div>
          <div className="page-subtitle">{stock.sym}</div>
        </div>
        <div className="text-right">
           <div className="font-serif text-[32px] text-text">₹{stock.price.toLocaleString()}</div>
           <div className={`text-[13px] ${stock.chg >= 0 ? 'text-green' : 'text-red'}`}>{stock.chg >= 0 ? '▲' : '▼'} {stock.chg}%</div>
        </div>
      </div>
      
      <div className="grid grid-cols-[2fr_1fr] gap-6">
         <div className="card">
            <div className="chart-title mb-4">Key Statistics</div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <div className="text-muted text-[12px] mb-1">Market Cap</div>
                  <div className="text-[14px]">{stock.cap}</div>
               </div>
               <div>
                  <div className="text-muted text-[12px] mb-1">P/E Ratio</div>
                  <div className="text-[14px]">{stock.pe}</div>
               </div>
               <div>
                  <div className="text-muted text-[12px] mb-1">52 Week High</div>
                  <div className="text-[14px]">₹{stock.high}</div>
               </div>
               <div>
                  <div className="text-muted text-[12px] mb-1">52 Week Low</div>
                  <div className="text-[14px]">₹{stock.low}</div>
               </div>
            </div>
         </div>
         
         <div className="card bg-[#141410]">
            <div className="chart-title mb-4">Trade {stock.sym}</div>
            <div className="mb-4">
              <label className="text-muted text-[12px] block mb-1">Quantity</label>
              <input type="number" min="1" value={qty} onChange={e=>setQty(Math.max(1, parseInt(e.target.value)||1))} className="w-full p-2.5 rounded-md bg-bg3 border border-border2 text-text text-[13px] outline-none focus:border-golddim" />
            </div>
            <div className="flex justify-between text-[13px] mb-6">
              <span className="text-muted">Total Value:</span>
              <span>₹{(stock.price * qty).toLocaleString()}</span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleTrade('buy')} className="flex-1 p-2.5 rounded-md bg-gold text-[#0c0a06] font-medium text-[13px] hover:bg-gold2">Buy</button>
              <button onClick={() => handleTrade('sell')} className="flex-1 p-2.5 rounded-md border border-red text-red text-[13px] hover:bg-[rgba(224,90,90,0.1)]">Sell</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StockDetail;
