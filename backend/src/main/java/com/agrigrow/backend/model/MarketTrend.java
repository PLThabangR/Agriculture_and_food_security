package com.agrigrow.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "market_trends")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarketTrend {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String cropName;
    
    private double price;
    
    private double changePercentage;
    
    private boolean isUp; // true = up, false = down
    
    private String currency; // default "GH₵"
}
