package com.agriTech.Repositories;

import com.agriTech.Model.Crop;
import com.agriTech.Model.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmRepository extends JpaRepository<Farm, Long> {
    // Find farms by user
    List<Farm> findByUser_Id(Long userId);
    Farm findFarmById(Long farmId);


}
