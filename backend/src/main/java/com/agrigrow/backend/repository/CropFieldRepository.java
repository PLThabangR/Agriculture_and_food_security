package com.agrigrow.backend.repository;

import com.agrigrow.backend.model.CropField;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropFieldRepository extends JpaRepository<CropField, Long> {
}
