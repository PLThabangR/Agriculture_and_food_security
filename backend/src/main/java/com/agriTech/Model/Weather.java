package com.agriTech.Model;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Weather {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;

    private Double temperature;

    private Double humidity;

    private Double rainfall;

    private Double windSpeed;

    private String weatherCondition;

    @OneToMany(mappedBy = "weather")
    @JsonManagedReference
    private List<Crop> crops;
}