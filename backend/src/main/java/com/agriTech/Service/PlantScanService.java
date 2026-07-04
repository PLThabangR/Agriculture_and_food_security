package com.agriTech.Service;

import com.agriTech.Dto.PlantScanRequestDTO;
import com.agriTech.Dto.PlantScanResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PlantScanService {
    // Submit scan with their request and id
    PlantScanResponseDTO submitScan(MultipartFile image, PlantScanRequestDTO request, Long userId);
    // Get scan results with their id
    PlantScanResponseDTO getScanResult(Long scanId);
    // Get user scans with user id
    List<PlantScanResponseDTO> getUserScans(Long userId);
    // Process scan with their scan id
    PlantScanResponseDTO processScan(Long scanId);
}
