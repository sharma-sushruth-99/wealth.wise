CREATE DATABASE IF NOT EXISTS wealth_wise;

USE wealth_wise;

-- Companies Table (NIFTY 50)
CREATE TABLE IF NOT EXISTS companies (
    symbol VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sector VARCHAR(100)
);

-- Real-time Stock Data Table
CREATE TABLE IF NOT EXISTS stock_data (
    symbol VARCHAR(20) PRIMARY KEY,
    price DECIMAL(15, 2),
    change_value DECIMAL(15, 2),
    change_percent DECIMAL(10, 4),
    volume BIGINT,
    market_cap VARCHAR(50),
    pe_ratio DECIMAL(10, 2),
    dividend_yield DECIMAL(10, 2),
    52_week_high DECIMAL(15, 2),
    52_week_low DECIMAL(15, 2),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (symbol) REFERENCES companies(symbol) ON DELETE CASCADE
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolios Table
CREATE TABLE IF NOT EXISTS portfolios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    cash_balance DECIMAL(15, 2) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Portfolio Holdings (What user owns)
CREATE TABLE IF NOT EXISTS holdings (
    portfolio_id BIGINT NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    quantity INT DEFAULT 0,
    avg_buy_price DECIMAL(15, 2),
    PRIMARY KEY (portfolio_id, symbol),
    FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE,
    FOREIGN KEY (symbol) REFERENCES companies(symbol) ON DELETE RESTRICT
);

-- Transactions History
CREATE TABLE IF NOT EXISTS transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    portfolio_id BIGINT NOT NULL,
    symbol VARCHAR(20),
    transaction_type ENUM('BUY', 'SELL', 'DEPOSIT', 'WITHDRAWAL') NOT NULL,
    quantity INT DEFAULT 0,
    price DECIMAL(15, 2) NOT NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
);

-- Mock Data Insertion
INSERT IGNORE INTO users (id, email, name) VALUES (1, 'mock@wealthwise.com', 'Mock User');
INSERT IGNORE INTO portfolios (id, user_id, cash_balance) VALUES (1, 1, 1500000.00);
