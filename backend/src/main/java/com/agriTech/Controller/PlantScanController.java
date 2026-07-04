package com.agriTech.Controller;

import com.agriTech.Dto.PlantScanRequestDTO;
import com.agriTech.Dto.PlantScanResponseDTO;
import com.agriTech.Response.ApiResponse;
import com.agriTech.Service.PlantScanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/plant-scan")
@RequiredArgsConstructor
public class PlantScanController {

    private final PlantScanService scanService;

    // =========================
    // Submit scan
    // =========================
    @PostMapping(value = "/submit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<PlantScanResponseDTO> submitScan(
            @RequestPart("image") MultipartFile image,
            @ModelAttribute PlantScanRequestDTO request
    ) {
        Long userId = 1L;
        PlantScanResponseDTO response = scanService.submitScan(image, request, userId);
        return ApiResponse.success(response, "Scan submitted");
    }
    // =========================
    // Get single scan
    // =========================
    @GetMapping("/{scanId}")
    public ApiResponse<PlantScanResponseDTO> getScan(
            @PathVariable Long scanId
    ) {
        PlantScanResponseDTO response = scanService.getScanResult(scanId);

        return ApiResponse.success(response, "Scan result");
    }

    // =========================
    // Get user scans
    // =========================
    @GetMapping("/user")
    public ApiResponse<List<PlantScanResponseDTO>> getUserScans(
            @RequestParam Long userId) {

        List<PlantScanResponseDTO> scans = scanService.getUserScans(userId);

        return ApiResponse.success(scans, "Your scans");
    }

    // =========================
    // Process scan
    // =========================
    @PostMapping("/{scanId}/process")
    public ApiResponse<PlantScanResponseDTO> processScan(
            @PathVariable Long scanId
    ) {
        PlantScanResponseDTO response = scanService.processScan(scanId);

        return ApiResponse.success(response, "Scan processed");
    }
}