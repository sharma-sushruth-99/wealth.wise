package com.example.wealthwise.model;

import jakarta.persistence.Entity;
import jakarta.persistence.IdClass;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.io.Serializable;

class HoldingId implements Serializable {
    private Long portfolioId;
    private String symbol;
    
    public HoldingId() {}
    public HoldingId(Long portfolioId, String symbol) { this.portfolioId = portfolioId; this.symbol = symbol; }

    public Long getPortfolioId() { return portfolioId; }
    public void setPortfolioId(Long portfolioId) { this.portfolioId = portfolioId; }

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }
}

@Entity
@Table(name = "holdings")
@IdClass(HoldingId.class)
public class Holding {
    @Id
    private Long portfolioId;
    @Id
    private String symbol;
    private Integer quantity;
    private BigDecimal avgBuyPrice;

    public Long getPortfolioId() { return portfolioId; }
    public void setPortfolioId(Long portfolioId) { this.portfolioId = portfolioId; }

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getAvgBuyPrice() { return avgBuyPrice; }
    public void setAvgBuyPrice(BigDecimal avgBuyPrice) { this.avgBuyPrice = avgBuyPrice; }
}
