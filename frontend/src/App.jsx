import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Stocks from './pages/Stocks';
import StockDetail from './pages/StockDetail';
import Portfolio from './pages/Portfolio';
import Transactions from './pages/Transactions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="stocks" element={<Stocks />} />
          <Route path="stocks/:symbol" element={<StockDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
