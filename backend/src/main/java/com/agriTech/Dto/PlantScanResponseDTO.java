package com.agriTech.Dto;

import com.agriTech.Enums.PlantHealth;
import com.agriTech.Enums.ScanStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@Data
public class PlantScanResponseDTO {
    private Long id;
    private String imageUrl;
    private String detectedDisease;
    private String detectedPest;
    private BigDecimal confidence;
    private ScanStatus scanStatus;
    private PlantHealth healthStatus;
    private String recommendations;
    private LocalDateTime scanDate;
    private LocalDateTime processedAt;
    private String notes;
    private Map<String, Object> aiMetadata;
}