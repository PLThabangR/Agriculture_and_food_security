package com.agrigrow.backend.repository;

import com.agrigrow.backend.model.ScanHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScanHistoryRepository extends JpaRepository<ScanHistory, Long> {
    List<ScanHistory> findAllByOrderByTimestampDesc();
}
