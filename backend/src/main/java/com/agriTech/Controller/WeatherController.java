package com.agriTech.Controller;

import com.agriTech.Service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/weather")
@RequiredArgsConstructor
public class WeatherController {
    private WeatherService weatherService;

    @GetMapping("/{farmId}")
    public ResponseEntity<String> getWeather(@PathVariable Long farmId) {

        String weather = weatherService.getWeatherByFarm(farmId);

        return ResponseEntity.ok(weather);
    }
}
