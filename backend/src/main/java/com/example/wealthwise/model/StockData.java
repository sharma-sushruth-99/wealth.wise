package com.example.wealthwise.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_data")
public class StockData {
    @Id
    private String symbol;
    private BigDecimal price;
    
    @Column(name="change_value")
    private BigDecimal changeValue;
    
    @Column(name="change_percent")
    private BigDecimal changePercent;
    
    private Long volume;
    private String marketCap;
    private BigDecimal peRatio;
    private BigDecimal dividendYield;
    
    @Column(name="52_week_high")
    private BigDecimal weekHigh52;
    
    @Column(name="52_week_low")
    private BigDecimal weekLow52;
    
    @Column(name="last_updated")
    private LocalDateTime lastUpdated;

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public BigDecimal getChangeValue() { return changeValue; }
    public void setChangeValue(BigDecimal changeValue) { this.changeValue = changeValue; }

    public BigDecimal getChangePercent() { return changePercent; }
    public void setChangePercent(BigDecimal changePercent) { this.changePercent = changePercent; }

    public Long getVolume() { return volume; }
    public void setVolume(Long volume) { this.volume = volume; }

    public String getMarketCap() { return marketCap; }
    public void setMarketCap(String marketCap) { this.marketCap = marketCap; }

    public BigDecimal getPeRatio() { return peRatio; }
    public void setPeRatio(BigDecimal peRatio) { this.peRatio = peRatio; }

    public BigDecimal getDividendYield() { return dividendYield; }
    public void setDividendYield(BigDecimal dividendYield) { this.dividendYield = dividendYield; }

    public BigDecimal getWeekHigh52() { return weekHigh52; }
    public void setWeekHigh52(BigDecimal weekHigh52) { this.weekHigh52 = weekHigh52; }

    public BigDecimal getWeekLow52() { return weekLow52; }
    public void setWeekLow52(BigDecimal weekLow52) { this.weekLow52 = weekLow52; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }
}
