package com.agriTech.Repositories;

import com.agriTech.Model.PlantScan;
import com.agriTech.Enums.ScanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantScanRepository extends JpaRepository<PlantScan, Long> {
    // Find a user by their id
    List<PlantScan> findByUserId(Long userId);
    // Find a user with their id and user status
    List<PlantScan> findByUserIdAndScanStatus(Long userId, ScanStatus scanStatus);
    // Find user crop with their id
     List<PlantScan> findByCropId(Long cropId);
    // Find user farm with their id
    //List<PlantScan> findByFarmId(Long farmId);
}