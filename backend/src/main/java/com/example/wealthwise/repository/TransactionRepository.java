package com.example.wealthwise.repository;

import com.example.wealthwise.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByPortfolioIdOrderByTransactionDateDesc(Long portfolioId);
}
