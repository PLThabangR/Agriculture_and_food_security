package com.agriTech.Controller;

import com.agriTech.Model.Crop;
import com.agriTech.Service.CropService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@RequestMapping("/api/crop")
@RequiredArgsConstructor
public class CropController {

    // Inject the CropService
    private final CropService cropService;
    /*
    * Create a new crop for a specific farm
    * POST: /api/crop/user/{userId}
    */
    @PostMapping("/user/{userId}")
    public Crop createCrop(@RequestBody Crop crop,
                           @PathVariable Long userId) {

        return cropService.createCrop(crop, userId);
    }

    /*
     * Get all crops for a specific farm
     * GET: /api/crop/farm/{farmId}
     */
    @GetMapping("/farm/{farmId}")
    public List<Crop> getCropsByFarm(@PathVariable Long farmId) {

        return cropService.getCropsByFarm(farmId);
    }
}
