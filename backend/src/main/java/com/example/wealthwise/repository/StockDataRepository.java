package com.example.wealthwise.repository;

import com.example.wealthwise.model.StockData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface StockDataRepository extends JpaRepository<StockData, String> {
    
    @Query("SELECT s, c.name FROM StockData s JOIN Company c ON s.symbol = c.symbol")
    List<Object[]> findAllStocksWithCompanyName();
}
