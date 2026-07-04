package com.agriTech.Model;

import com.agriTech.Enums.PlantHealth;
import com.agriTech.Enums.ScanStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "plant_scans", indexes = {
    @Index(name = "idx_scan_user", columnList = "user_id"),
    @Index(name = "idx_scan_crop", columnList = "crop_id"),
    @Index(name = "idx_scan_date", columnList = "scan_date")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlantScan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;                 // S3 key or local path

    private String detectedDisease;
    private String detectedPest;

    @Column(precision = 5, scale = 4)
    private BigDecimal confidence;          // 0.0 – 1.0

    @Enumerated(EnumType.STRING)
    private ScanStatus scanStatus = ScanStatus.PENDING;

    @Enumerated(EnumType.STRING)
    private PlantHealth healthStatus;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> aiMetadata; // extra AI data

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id")
    private Crop crop;                      // optional

    // If you have a Farm entity, you can add:
    // @ManyToOne
    // @JoinColumn(name = "farm_id")
    // private Farm farm;

    private LocalDateTime scanDate = LocalDateTime.now();
    private LocalDateTime processedAt;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(columnDefinition = "TEXT")
    private String recommendations;

    private String processedBy;             // e.g., "OpenAI", "CustomModel"
}