package com.agriTech.Config;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import lombok.Getter;

@Getter
@Configuration
public class ApiConfig {

    @Value("${weather.api.key}")
    private String weatherApiKey;

    @Value("${weather.api.url}")
    private String weatherApiUrl;

//    @Value("${plantscan.api.key}")
//    private String plantScanApiKey;
//
//    @Value("${plantscan.api.url}")
//    private String plantScanApiUrl;
}