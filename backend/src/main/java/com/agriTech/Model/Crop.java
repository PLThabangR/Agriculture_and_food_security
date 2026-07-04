package com.agriTech.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;

import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cropName;

    private String cropType;

    private String plantingDate;

    private String harvestingDate;

    private String status;

    @ManyToOne
    @JoinColumn(name = "farm_id")
    @JsonBackReference
    private Farm farm;

    @ManyToOne
    @JoinColumn(name = "weather_id")
    @JsonBackReference
    private Weather weather;
}