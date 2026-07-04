package com.agrigrow.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "scan_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScanHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String cropName;
    
    private String diseaseName;
    
    private double confidence;
    
    private String sampleId;
    
    private String status; // TREATED, STABLE, ACTION REQ, HEALTHY
    
    @Column(length = 2000)
    private String imageUrl;
    
    private LocalDateTime timestamp;
    
    @Column(length = 2000)
    private String advice;
}
