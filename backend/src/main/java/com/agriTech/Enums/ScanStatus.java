package com.agriTech.Enums;

public enum ScanStatus {
    PENDING,      // Scan is waiting for AI
    PROCESSING,   // Scan AI is running
    COMPLETED,    // Scan result ready
    FAILED        // Scan has an error
}
