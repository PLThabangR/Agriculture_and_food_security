package com.agrigrow.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "crop_fields")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CropField {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    private int healthScore;
    
    private String status; // e.g. ACTIVE
    
    private double estimatedYield;
    
    private String yieldUnit; // e.g. Tons
    
    private String imageUrl;
    
    private String sector; // e.g. East Sector (Corn Field)
}
