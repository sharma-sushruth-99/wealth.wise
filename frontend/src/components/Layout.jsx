import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[220px] shrink-0 bg-bg2 border-r border-[#2a2720] flex flex-col p-0">
      <div className="p-7 px-6 pb-6 border-b border-[#2a2720] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#1c1810] border border-golddim flex items-center justify-center font-serif text-[13px] text-gold italic">w.w</div>
        <div className="font-serif text-[18px] text-text tracking-[0.01em]">wealth<span className="text-gold">.</span>wise</div>
      </div>
      
      <nav className="flex-1 p-5 px-3 flex flex-col gap-1">
        <NavLink to="/dashboard" className={({isActive}) => `flex items-center gap-3 p-2.5 px-3.5 rounded-md text-[13px] transition-all duration-150 border ${isActive ? 'text-gold bg-[#1c1810] border-golddim' : 'text-muted border-transparent hover:text-text hover:bg-bg3'}`}>
          <svg className={`w-4 h-4 shrink-0 transition-opacity`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="7" height="7" rx="1.5"/><rect x="11" y="2" width="7" height="7" rx="1.5"/><rect x="2" y="11" width="7" height="7" rx="1.5"/><rect x="11" y="11" width="7" height="7" rx="1.5"/></svg>
          Dashboard
        </NavLink>
        <NavLink to="/portfolio" className={({isActive}) => `flex items-center gap-3 p-2.5 px-3.5 rounded-md text-[13px] transition-all duration-150 border ${isActive ? 'text-gold bg-[#1c1810] border-golddim' : 'text-muted border-transparent hover:text-text hover:bg-bg3'}`}>
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/><path d="M7 10h6M10 7v6"/></svg>
          Portfolio
        </NavLink>
        <NavLink to="/transactions" className={({isActive}) => `flex items-center gap-3 p-2.5 px-3.5 rounded-md text-[13px] transition-all duration-150 border ${isActive ? 'text-gold bg-[#1c1810] border-golddim' : 'text-muted border-transparent hover:text-text hover:bg-bg3'}`}>
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 8h12M4 12h12"/><path d="M4 6l3-3 3 3M16 14l-3 3-3-3"/></svg>
          Transactions
        </NavLink>
        
        <NavLink to="/stocks" className={({isActive}) => `mt-2 pt-3 border-t border-[#2a2720] rounded-none border-b-0 border-l-0 border-r-0 flex items-center gap-3 p-2.5 px-3.5 text-[13px] transition-all duration-150 ${isActive ? 'text-gold bg-[#1c1810]' : 'text-muted hover:text-text hover:bg-bg3'}`}>
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="2,14 7,8 11,11 18,4"/><polyline points="14,4 18,4 18,8"/></svg>
          Stocks
        </NavLink>
      </nav>
      
      <div className="p-4 px-3 border-t border-[#2a2720]">
        <button onClick={() => navigate('/login')} className="flex items-center gap-2.5 p-2 px-3.5 rounded-md text-muted text-[13px] transition-colors hover:text-text w-full text-left">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 3h4v4M14 9V5h-4M2 13v4h4M6 19H2v-4M9 2v18M2 9h18" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Logout
        </button>
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
