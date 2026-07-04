package com.agriTech.Service;

import com.agriTech.Config.ApiConfig;

import com.agriTech.Model.Farm;
import com.agriTech.Repositories.FarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class WeatherService {

    private final FarmRepository farmRepository;
    private final RestClient restClient;
    private final ApiConfig apiConfig;

    public String getWeatherByFarm(Long farmId) {

        // Find the farm in the database
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new RuntimeException("Farm not found"));

        // Build the API URL using the farm's coordinates
        String url = apiConfig.getWeatherApiUrl()
                + "?lat=" + farm.getLatitude()
                + "&lon=" + farm.getLongitude()
                + "&appid=" + apiConfig.getWeatherApiKey()
                + "&units=metric";

        // Call the Weather API
        return restClient
                .get()
                .uri(url)
                .retrieve()
                .body(String.class);
    }
}