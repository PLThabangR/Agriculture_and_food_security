package com.agrigrow.backend.controller;

import com.agrigrow.backend.model.CropField;
import com.agrigrow.backend.model.MarketTrend;
import com.agrigrow.backend.repository.CropFieldRepository;
import com.agrigrow.backend.repository.MarketTrendRepository;
import com.agrigrow.backend.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final CropFieldRepository cropFieldRepository;
    private final MarketTrendRepository marketTrendRepository;
    private final WeatherService weatherService;

    public DashboardController(CropFieldRepository cropFieldRepository,
                               MarketTrendRepository marketTrendRepository,
                               WeatherService weatherService) {
        this.cropFieldRepository = cropFieldRepository;
        this.marketTrendRepository = marketTrendRepository;
        this.weatherService = weatherService;
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getDashboardSummary(
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lon
    ) {
        double latitude = (lat != null) ? lat : -26.2041;
        double longitude = (lon != null) ? lon : 28.0473;

        List<CropField> crops = cropFieldRepository.findAll();
        List<MarketTrend> marketTrends = marketTrendRepository.findAll();

        // Get Weather Metrics dynamically based on lat/lon
        Map<String, Object> weatherMetrics = weatherService.getAgriculturalWeatherMetrics(latitude, longitude);

        Map<String, Object> weather = Map.of(
            "location", weatherMetrics.getOrDefault("location", "Johannesburg"),
            "temperature", weatherMetrics.getOrDefault("temperature", 28),
            "condition", weatherMetrics.getOrDefault("condition", "Sunny"),
            "recommendation", weatherMetrics.getOrDefault("recommendation", "Perfect conditions for harvesting Maize.")
        );

        // Calculate alert dynamically based on soil moisture
        Map<String, Object> urgentAlert = null;
        String alertMsg = (String) weatherMetrics.get("alert");
        if (alertMsg != null) {
            urgentAlert = Map.of(
                "type", "URGENT ALERT",
                "message", alertMsg
            );
        }

        // Overall summary response
        Map<String, Object> summary = Map.of(
            "weather", weather,
            "urgentAlert", urgentAlert != null ? urgentAlert : Map.of("type", "STABLE", "message", "All systems normal. Soil moisture levels are optimal."),
            "crops", crops,
            "marketTrends", marketTrends
        );

        return ResponseEntity.ok(summary);
    }
}
