package com.agriTech.Dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PlantScanRequestDTO {
    private Long cropId;            // optional
   // private Long farmId;
    private String notes;
}
