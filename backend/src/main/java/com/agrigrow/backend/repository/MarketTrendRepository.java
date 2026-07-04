package com.agrigrow.backend.repository;

import com.agrigrow.backend.model.MarketTrend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketTrendRepository extends JpaRepository<MarketTrend, Long> {
}
