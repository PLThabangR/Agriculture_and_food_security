package com.agriTech.Repositories;
import com.agriTech.Model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Handles all database operations for User.
 * Repository communicate directly with Postgres
 */
@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {

    // Find crops by user through farm relationship
    List<Crop> findByFarmId(Long farmId);

}

