package com.example.wealthwise.controller;

import com.example.wealthwise.model.*;
import com.example.wealthwise.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    @Autowired
    private PortfolioRepository portfolioRepository;
    
    @Autowired
    private HoldingRepository holdingRepository;
    
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private StockDataRepository stockDataRepository;

    @GetMapping("/{userId}")
    public Map<String, Object> getPortfolio(@PathVariable Long userId) {
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        if (portfolio == null) return Map.<String, Object>of("error", "Portfolio not found");
        
        List<Holding> holdings = holdingRepository.findByPortfolioId(portfolio.getId());
        
        Map<String, Object> response = new HashMap<>();
        response.put("cashBalance", portfolio.getCashBalance());
        response.put("holdings", holdings);
        
        // Calculate total value
        BigDecimal totalHoldingsValue = BigDecimal.ZERO;
        for (Holding h : holdings) {
            StockData sd = stockDataRepository.findById(h.getSymbol()).orElse(null);
            if (sd != null && sd.getPrice() != null) {
                totalHoldingsValue = totalHoldingsValue.add(sd.getPrice().multiply(new BigDecimal(h.getQuantity())));
            }
        }
        
        response.put("totalValue", portfolio.getCashBalance().add(totalHoldingsValue));
        return response;
    }

    @PostMapping("/{userId}/buy")
    public Map<String, Object> buyStock(@PathVariable Long userId, @RequestBody Map<String, Object> request) {
        String symbol = (String) request.get("symbol");
        Integer quantity = (Integer) request.get("quantity");
        
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        StockData stock = stockDataRepository.findById(symbol).orElse(null);
        
        if (portfolio == null || stock == null || stock.getPrice() == null) {
            return Map.<String, Object>of("success", false, "error", "Invalid portfolio or stock");
        }
        
        BigDecimal totalCost = stock.getPrice().multiply(new BigDecimal(quantity));
        if (portfolio.getCashBalance().compareTo(totalCost) < 0) {
            return Map.<String, Object>of("success", false, "error", "Insufficient funds");
        }
        
        // Deduct cash
        portfolio.setCashBalance(portfolio.getCashBalance().subtract(totalCost));
        portfolioRepository.save(portfolio);
        
        // Update holding
        Holding holding = holdingRepository.findByPortfolioIdAndSymbol(portfolio.getId(), symbol);
        if (holding == null) {
            holding = new Holding();
            holding.setPortfolioId(portfolio.getId());
            holding.setSymbol(symbol);
            holding.setQuantity(quantity);
            holding.setAvgBuyPrice(stock.getPrice());
        } else {
            // New average price
            BigDecimal totalValue = holding.getAvgBuyPrice().multiply(new BigDecimal(holding.getQuantity())).add(totalCost);
            holding.setQuantity(holding.getQuantity() + quantity);
            holding.setAvgBuyPrice(totalValue.divide(new BigDecimal(holding.getQuantity()), java.math.RoundingMode.HALF_UP));
        }
        holdingRepository.save(holding);
        
        // Record transaction
        Transaction tx = new Transaction();
        tx.setPortfolioId(portfolio.getId());
        tx.setSymbol(symbol);
        tx.setTransactionType("BUY");
        tx.setQuantity(quantity);
        tx.setPrice(stock.getPrice());
        tx.setTotalAmount(totalCost);
        tx.setTransactionDate(LocalDateTime.now());
        transactionRepository.save(tx);
        
        return Map.<String, Object>of("success", true, "message", "Stock bought successfully");
    }

    @PostMapping("/{userId}/sell")
    public Map<String, Object> sellStock(@PathVariable Long userId, @RequestBody Map<String, Object> request) {
        String symbol = (String) request.get("symbol");
        Integer quantity = (Integer) request.get("quantity");
        
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        StockData stock = stockDataRepository.findById(symbol).orElse(null);
        Holding holding = holdingRepository.findByPortfolioIdAndSymbol(portfolio.getId(), symbol);
        
        if (portfolio == null || stock == null || holding == null || holding.getQuantity() < quantity) {
            return Map.<String, Object>of("success", false, "error", "Invalid portfolio, stock or insufficient holdings");
        }
        
        BigDecimal totalValue = stock.getPrice().multiply(new BigDecimal(quantity));
        
        // Add cash
        portfolio.setCashBalance(portfolio.getCashBalance().add(totalValue));
        portfolioRepository.save(portfolio);
        
        // Update holding
        holding.setQuantity(holding.getQuantity() - quantity);
        if (holding.getQuantity() == 0) {
            holdingRepository.delete(holding);
        } else {
            holdingRepository.save(holding);
        }
        
        // Record transaction
        Transaction tx = new Transaction();
        tx.setPortfolioId(portfolio.getId());
        tx.setSymbol(symbol);
        tx.setTransactionType("SELL");
        tx.setQuantity(quantity);
        tx.setPrice(stock.getPrice());
        tx.setTotalAmount(totalValue);
        tx.setTransactionDate(LocalDateTime.now());
        transactionRepository.save(tx);
        
        return Map.<String, Object>of("success", true, "message", "Stock sold successfully");
    }
}
