package com.agrigrow.backend.controller;

import com.agrigrow.backend.model.MarketTrend;
import com.agrigrow.backend.repository.MarketTrendRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/market")
@CrossOrigin(origins = "*")
public class MarketController {

    private final MarketTrendRepository marketTrendRepository;

    public MarketController(MarketTrendRepository marketTrendRepository) {
        this.marketTrendRepository = marketTrendRepository;
    }

    @GetMapping("/trends")
    public ResponseEntity<List<MarketTrend>> getMarketTrends() {
        List<MarketTrend> trends = marketTrendRepository.findAll();
        return ResponseEntity.ok(trends);
    }
}
