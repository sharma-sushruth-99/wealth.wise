package com.example.wealthwise.controller;

import com.example.wealthwise.model.StockData;
import com.example.wealthwise.repository.StockDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    @Autowired
    private StockDataRepository stockDataRepository;

    @GetMapping
    public List<Map<String, Object>> getAllStocks() {
        return stockDataRepository.findAllStocksWithCompanyName().stream()
            .map(obj -> {
                StockData stock = (StockData) obj[0];
                String companyName = (String) obj[1];
                return Map.<String, Object>of(
                    "symbol", stock.getSymbol(),
                    "name", companyName,
                    "price", stock.getPrice() != null ? stock.getPrice() : 0,
                    "change", stock.getChangeValue() != null ? stock.getChangeValue() : 0,
                    "changePercent", stock.getChangePercent() != null ? stock.getChangePercent() : 0,
                    "marketCap", stock.getMarketCap() != null ? stock.getMarketCap() : "N/A"
                );
            }).collect(Collectors.toList());
    }
    
    @GetMapping("/{symbol}")
    public StockData getStock(@PathVariable String symbol) {
        return stockDataRepository.findById(symbol).orElse(null);
    }
}
