import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const lineChartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (lineChartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = lineChartRef.current.getContext('2d');
      const gold='#c9a84c', dim='#2a2720', text='#888480';
      
      chartInstance.current = new Chart(ctx, {
        type:'line',
        data:{
          labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          datasets:[{
            data:[12000,13200,14100,13800,15200,15900,16400,15800,16900,17200,17000,17600],
            borderColor:gold, borderWidth:1.5, pointRadius:0,
            tension:0.4, fill:true,
            backgroundColor:(ctx)=>{
              const g=ctx.chart.ctx.createLinearGradient(0,0,0,180);
              g.addColorStop(0,'rgba(201,168,76,0.18)');
              g.addColorStop(1,'rgba(201,168,76,0)');
              return g;
            }
          }]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins:{legend:{display:false}, tooltip:{callbacks:{label:ctx=>'₹'+ctx.raw.toLocaleString()}}},
          scales:{
            x:{grid:{color:dim},ticks:{color:text,font:{size:10}}},
            y:{grid:{color:dim},ticks:{color:text,font:{size:10},callback:v=>'₹'+v.toLocaleString()}}
          }
        }
      });
    }
    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, []);

  return (
    <div className="page-content">
      <div className="mb-8">
        <div className="page-title">Financial Overview</div>
        <div className="page-subtitle">Welcome back, Mock User</div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card py-5 flex flex-col relative overflow-hidden before:content-[''] before:w-7 before:h-[1px] before:bg-gold before:opacity-50 before:mb-3.5">
          <div className="text-[12px] text-muted uppercase tracking-[0.08em] mb-2.5 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="14" height="9" rx="1.5"/><path d="M4 4V3a1 1 0 011-1h6a1 1 0 011 1v1"/></svg>
            Total assets
          </div>
          <div className="font-serif text-[32px] font-light text-text">₹ 24,000</div>
          <div className="text-[12px] mt-1.5 text-green">▲ 8.2% this month</div>
        </div>
        <div className="card py-5 flex flex-col relative overflow-hidden before:content-[''] before:w-7 before:h-[1px] before:bg-gold before:opacity-50 before:mb-3.5">
          <div className="text-[12px] text-muted uppercase tracking-[0.08em] mb-2.5 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="14" height="9" rx="1.5"/><path d="M5 8h6"/></svg>
            Total liabilities
          </div>
          <div className="font-serif text-[32px] font-light text-text">₹ 0</div>
          <div className="text-[12px] mt-1.5 text-muted">No active liabilities</div>
        </div>
        <div className="card-gold p-6 py-5 flex flex-col relative overflow-hidden rounded-xl border before:content-[''] before:w-7 before:h-[1px] before:bg-gold before:opacity-100 before:mb-3.5">
          <div className="text-[12px] text-golddim uppercase tracking-[0.08em] mb-2.5 flex items-center gap-2">
             <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>
             Net worth
          </div>
          <div className="font-serif text-[32px] font-light text-gold">₹ 24,000</div>
          <div className="text-[12px] mt-1.5 text-green">▲ 5.4% overall</div>
        </div>
      </div>
      
      <div className="grid grid-cols-[1.6fr_1fr] gap-4 mb-6">
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <div className="chart-title">Net worth trend</div>
            <div className="flex gap-1">
              <div className="px-2.5 py-1 rounded-full text-[11px] text-muted cursor-pointer border border-transparent transition-all hover:text-text">1M</div>
              <div className="px-2.5 py-1 rounded-full text-[11px] text-gold bg-[#1c1810] border-golddim cursor-pointer transition-all">1Y</div>
            </div>
          </div>
          <div className="relative h-[180px]">
             <canvas ref={lineChartRef}></canvas>
          </div>
        </div>
        
        <div className="card">
           <div className="chart-title mb-5">Quick Actions</div>
           <div className="flex flex-col gap-3">
             <Link to="/stocks" className="p-3 rounded-md border border-border2 bg-bg3 text-[13px] text-center hover:border-golddim transition-colors">Browse Nifty 50 Stocks</Link>
             <Link to="/portfolio" className="p-3 rounded-md border border-border2 bg-bg3 text-[13px] text-center hover:border-golddim transition-colors">View My Portfolio</Link>
           </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
