package com.example.wealthwise.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "companies")
public class Company {
    @Id
    private String symbol;
    private String name;
    private String sector;

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }
}
