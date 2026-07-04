package com.agrigrow.backend.controller;

import com.agrigrow.backend.model.ScanHistory;
import com.agrigrow.backend.repository.ScanHistoryRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/scanner")
@CrossOrigin(origins = "*")
public class ScanController {

    private final ScanHistoryRepository scanHistoryRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Random random = new Random();

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public ScanController(ScanHistoryRepository scanHistoryRepository) {
        this.scanHistoryRepository = scanHistoryRepository;
    }

    @GetMapping("/history")
    public ResponseEntity<List<ScanHistory>> getScanHistory() {
        List<ScanHistory> history = scanHistoryRepository.findAllByOrderByTimestampDesc();
        return ResponseEntity.ok(history);
    }

    @PostMapping("/scan")
    public ResponseEntity<?> scanCrop(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "cropName", defaultValue = "Maize") String cropName) {
        
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "No image file provided"));
        }

        try {
            // Convert file to Base64
            String base64Image = Base64.getEncoder().encodeToString(file.getBytes());
            String mimeType = file.getContentType() != null ? file.getContentType() : "image/jpeg";

            // Prepare Gemini API Request
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + geminiApiKey;
            
            // Build the JSON body
            Map<String, Object> requestBody = new HashMap<>();
            
            Map<String, Object> textPart = new HashMap<>();
            textPart.put("text", "You are an expert plant pathologist. Analyze this image and identify the crop and any disease present. Provide the output strictly in JSON format with keys: cropName (string), diseaseName (string), confidence (number between 50 and 100), status (string, exactly one of: 'HEALTHY', 'TREATED', 'ACTION REQ', 'STABLE'), and advice (string). Do not include markdown formatting or backticks, just the raw JSON object.");
            
            Map<String, Object> inlineData = new HashMap<>();
            inlineData.put("mime_type", mimeType);
            inlineData.put("data", base64Image);
            
            Map<String, Object> imagePart = new HashMap<>();
            imagePart.put("inline_data", inlineData);
            
            Map<String, Object> partsObj = new HashMap<>();
            partsObj.put("parts", Arrays.asList(textPart, imagePart));
            
            requestBody.put("contents", Collections.singletonList(partsObj));
            
            Map<String, Object> genConfig = new HashMap<>();
            genConfig.put("responseMimeType", "application/json");
            requestBody.put("generationConfig", genConfig);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // Call Gemini API
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            
            // Parse response
            JsonNode root = objectMapper.readTree(response.getBody());
            String aiResponseText = root.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();
            
            // Clean up any potential markdown formatting from Gemini
            if (aiResponseText.startsWith("```json")) {
                aiResponseText = aiResponseText.replaceFirst("```json", "");
                if (aiResponseText.endsWith("```")) {
                    aiResponseText = aiResponseText.substring(0, aiResponseText.length() - 3);
                }
            } else if (aiResponseText.startsWith("```")) {
                aiResponseText = aiResponseText.replaceFirst("```", "");
                if (aiResponseText.endsWith("```")) {
                    aiResponseText = aiResponseText.substring(0, aiResponseText.length() - 3);
                }
            }
            aiResponseText = aiResponseText.trim();
            
            // Parse the AI's JSON output
            JsonNode resultJson = objectMapper.readTree(aiResponseText);
            
            String aiCropName = resultJson.has("cropName") ? resultJson.get("cropName").asText() : cropName;
            String diseaseName = resultJson.has("diseaseName") ? resultJson.get("diseaseName").asText() : "Unknown Condition";
            double confidence = resultJson.has("confidence") ? resultJson.get("confidence").asDouble() : (85.0 + random.nextDouble() * 10);
            String status = resultJson.has("status") ? resultJson.get("status").asText() : "ACTION REQ";
            String advice = resultJson.has("advice") ? resultJson.get("advice").asText() : "Consult an agronomist for detailed advice.";
            
            // Set up a placeholder imageUrl since we don't upload the file to a CDN
            String imageUrl = "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&auto=format&fit=crop&q=80";

            String sampleId = String.format("%s-%03d", aiCropName.substring(0, Math.min(2, aiCropName.length())).toUpperCase(), random.nextInt(1000));

            ScanHistory scan = new ScanHistory();
            scan.setCropName(aiCropName);
            scan.setDiseaseName(diseaseName);
            scan.setConfidence(Math.round(confidence * 10.0) / 10.0);
            scan.setSampleId(sampleId);
            scan.setStatus(status);
            scan.setImageUrl(imageUrl);
            scan.setTimestamp(LocalDateTime.now());
            scan.setAdvice(advice);

            ScanHistory savedScan = scanHistoryRepository.save(scan);
            return ResponseEntity.ok(savedScan);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "AI Analysis failed: " + e.getMessage()));
        }
    }
}
