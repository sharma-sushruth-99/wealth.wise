package com.example.wealthwise.repository;

import com.example.wealthwise.model.Holding;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HoldingRepository extends JpaRepository<Holding, Void> {
    List<Holding> findByPortfolioId(Long portfolioId);
    Holding findByPortfolioIdAndSymbol(Long portfolioId, String symbol);
}
