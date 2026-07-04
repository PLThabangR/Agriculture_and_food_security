package com.agriTech.Controller;



import com.agriTech.Model.Farm;
import com.agriTech.Service.FarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farm")
@RequiredArgsConstructor
public class FarmController {

    // Inject the FarmService
    private final FarmService farmService;

    /**
     * Create a new farm
     * POST: /api/farms/user/{userId}
     */
    @PostMapping("/user/{userId}")
    public ResponseEntity<Farm> createFarm(
            @PathVariable Long userId,
            @RequestBody Farm farm) {

        Farm savedFarm = farmService.createFarm(userId, farm);

        return ResponseEntity.ok(savedFarm);
    }

    /**
     * Get all farms
     * GET: /api/farms
     */
    @GetMapping
    public ResponseEntity<List<Farm>> getAllFarms() {
        //Get all farms
        return ResponseEntity.ok(farmService.getAllFarms());
    }

    /**
     * Get a farm by its ID
     * GET: /api/farms/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Farm> getFarmById(@PathVariable Long id) {

        return ResponseEntity.ok(farmService.getFarmById(id));
    }

    /**
     * Update an existing farm
     * PUT: /api/farms/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Farm> updateFarm(
            @PathVariable Long id,
            @RequestBody Farm farm) {

        return ResponseEntity.ok(farmService.updateFarm(id, farm));
    }

    /**
     * Delete a farm
     * DELETE: /api/farms/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFarm(@PathVariable Long id) {

        farmService.deleteFarm(id);

        return ResponseEntity.ok("Farm deleted successfully.");
    }

}