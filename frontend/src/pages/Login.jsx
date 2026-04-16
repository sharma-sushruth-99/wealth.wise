import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="flex-1 flex flex-col items-center justify-center p-16 md:px-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#2a2720_1px,transparent_1px)] bg-[length:32px_32px] opacity-35 pointer-events-none"></div>
        <div className="relative z-10 w-full max-w-[360px]">
          <div className="flex items-center gap-3.5 mb-12">
            <div className="w-12 h-12 rounded-full bg-[#1c1810] border border-golddim flex items-center justify-center font-serif text-[15px] text-gold italic">w.w</div>
            <div>
              <div className="font-serif text-[28px] font-light tracking-[0.01em]">wealth<span className="text-gold">.</span>wise</div>
            </div>
          </div>
          <p className="font-serif text-[13px] italic text-muted mb-10">your wealth is our priority.</p>
          <div className="bg-[#141410] border border-border2 rounded-2xl p-8 flex flex-col gap-3">
            <button className="btn-outline">
               <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
               Continue with Google
            </button>
            <div className="flex items-center gap-3 text-muted2 text-[12px] my-1 before:flex-1 before:h-[0.5px] before:bg-border after:flex-1 after:h-[0.5px] after:bg-border">or</div>
            <input className="w-full p-3 rounded-md bg-bg3 border border-border2 text-text font-sans text-[13px] outline-none transition-colors focus:border-golddim placeholder:text-muted2" type="email" placeholder="Enter your email"/>
            <button className="btn-primary">Continue with email</button>
            <button className="btn-mock" onClick={() => navigate('/dashboard')}>Start as a mock user</button>
          </div>
        </div>
      </div>
      <div className="w-[42%] bg-[#0e0d0a] border-l border-border flex flex-col items-center justify-center p-16 px-10 gap-6 relative overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full border border-golddim opacity-15 -top-[100px] -right-[100px]"></div>
        <div className="absolute w-[280px] h-[280px] rounded-full border border-golddim opacity-15 -bottom-[80px] -left-[80px]"></div>
        
        <div className="w-full max-w-[280px] bg-[#141410] border border-border2 rounded-[12px] p-5 px-5.5 relative z-10 -rotate-[1.5deg]">
          <div className="text-[11px] text-muted uppercase tracking-[0.08em] mb-2">Portfolio value</div>
          <div className="font-serif text-[28px] font-light text-gold2">₹ 18,42,500</div>
          <div className="text-[12px] text-green mt-1">▲ 12.4% this year</div>
        </div>
        <div className="w-full max-w-[280px] bg-[#141410] border border-border2 rounded-[12px] p-5 px-5.5 relative z-10 rotate-[1deg]">
          <div className="text-[11px] text-muted uppercase tracking-[0.08em] mb-2">Net worth</div>
          <div className="font-serif text-[28px] font-light text-gold2">₹ 24,60,000</div>
          <div className="text-[12px] text-green mt-1">▲ 8.1% this month</div>
        </div>
        <div className="w-full max-w-[280px] bg-[#141410] border border-border2 rounded-[12px] p-5 px-5.5 relative z-10 -rotate-[0.5deg]">
          <div className="text-[11px] text-muted uppercase tracking-[0.08em] mb-2">Top asset</div>
          <div className="font-serif text-[20px] font-light text-gold2 mt-1">TCS — ₹6,800</div>
          <div className="text-[12px] text-green mt-1">▲ 3.2% today</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
