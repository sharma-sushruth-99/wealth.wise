package com.example.wealthwise.repository;

import com.example.wealthwise.model.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    Portfolio findByUserId(Long userId);
}
