package com.agriTech.Service.Imp;

import com.agriTech.Dto.PlantScanRequestDTO;
import com.agriTech.Dto.PlantScanResponseDTO;
import com.agriTech.Model.Crop;
import com.agriTech.Model.PlantScan;
import com.agriTech.Model.User;
import com.agriTech.Repositories.CropRepository;
import com.agriTech.Repositories.PlantScanRepository;
import com.agriTech.Repositories.UserRepository;
import com.agriTech.Enums.PlantHealth;
import com.agriTech.Enums.ScanStatus;
import com.agriTech.Service.PlantScanService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlantScanServiceImpl implements PlantScanService {

    private final PlantScanRepository scanRepository;
    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final ModelMapper modelMapper;

    // local storage folder (you can later switch to S3)
    private final String UPLOAD_DIR = "uploads/scans/";

    @Override
    @Transactional
    public PlantScanResponseDTO submitScan(MultipartFile image, PlantScanRequestDTO request, Long userId) {
        // Fetch user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Save image locally
        String imageUrl = saveImage(image);

        // Build entity
        PlantScan scan = PlantScan.builder()
                .imageUrl(imageUrl)
                .user(user)
                .notes(request.getNotes())
                .scanDate(LocalDateTime.now())
                .scanStatus(ScanStatus.PENDING)
                .build();

        // Attach crop if provided
        if (request.getCropId() != null) {
            Crop crop = cropRepository.findById(request.getCropId())
                    .orElseThrow(() -> new RuntimeException("Crop not found"));
            scan.setCrop(crop);
        }

        PlantScan saved = scanRepository.save(scan);

        return convertToDto(saved);
    }

    @Override
    public PlantScanResponseDTO getScanResult(Long scanId) {
        PlantScan scan = scanRepository.findById(scanId)
                .orElseThrow(() -> new RuntimeException("Scan not found"));
        return convertToDto(scan);
    }

    @Override
    public List<PlantScanResponseDTO> getUserScans(Long userId) {
        return scanRepository.findByUserId(userId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PlantScanResponseDTO processScan(Long scanId) {
        PlantScan scan = scanRepository.findById(scanId)
                .orElseThrow(() -> new RuntimeException("Scan not found"));

        // Simulate AI call – replace with actual OpenAI / custom model
        scan.setScanStatus(ScanStatus.PROCESSING);
        scanRepository.save(scan);

        // Mock detection
        String[] diseases = {"Late Blight", "Powdery Mildew", "Rust", "Healthy"};
        String[] pests = {"Aphids", "Whitefly", "Bollworm", "None"};

        java.util.Random r = new java.util.Random();
        scan.setDetectedDisease(diseases[r.nextInt(diseases.length)]);
        scan.setDetectedPest(pests[r.nextInt(pests.length)]);
        scan.setConfidence(java.math.BigDecimal.valueOf(0.7 + r.nextDouble() * 0.25));
        scan.setHealthStatus(PlantHealth.DISEASED);
        scan.setRecommendations("Apply organic pesticide and monitor daily.");
        scan.setProcessedBy("MockAI");
        scan.setScanStatus(ScanStatus.COMPLETED);
        scan.setProcessedAt(LocalDateTime.now());

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("model", "MockAI-v1");
        metadata.put("processingTimeMs", 250);
        metadata.put("detectionMethod", "simulated");
        metadata.put("rawConfidence", scan.getConfidence());
        scan.setAiMetadata(metadata);

        scanRepository.save(scan);
        return convertToDto(scan);
    }

    //==== Helpers ===

    private String saveImage(MultipartFile file) {
        try {
            // Create directory if not exists
            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.write(filePath, file.getBytes());
            return filePath.toString(); // or return relative path for web access
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image", e);
        }
    }

    private PlantScanResponseDTO convertToDto(PlantScan scan) {
        return modelMapper.map(scan, PlantScanResponseDTO.class);
    }
}