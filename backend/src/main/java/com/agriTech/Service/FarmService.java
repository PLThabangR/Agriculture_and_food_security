package com.agriTech.Service;
//imports
import com.agriTech.Model.Farm;
import com.agriTech.Model.User;
import com.agriTech.Repositories.FarmRepository;
import com.agriTech.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FarmService {

    // Inject repositories
    private final FarmRepository farmRepository;
    private final UserRepository userRepository;

    /**
     * Create a new farm for a specific user
     */
    public Farm createFarm(Long userId, Farm farm) {

        // Find the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Associate the farm with the user
        farm.setUser(user);

        // Save the farm
        return farmRepository.save(farm);
    }

    /**
     * Get all farms
     */
    public List<Farm> getAllFarms() {
        return farmRepository.findAll();
    }

    /**
     * Get a farm by ID
     */
    public Farm getFarmById(Long id) {

        return farmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Farm not found"));
    }

    /**
     * Update a farm
     */
    public Farm updateFarm(Long id, Farm updatedFarm) {

        Farm farm = getFarmById(id);

        farm.setFarmName(updatedFarm.getFarmName());
        farm.setProvince(updatedFarm.getProvince());
        farm.setCity(updatedFarm.getCity());
        farm.setLatitude(updatedFarm.getLatitude());
        farm.setLongitude(updatedFarm.getLongitude());

        return farmRepository.save(farm);
    }

    /**
     * Delete a farm
     */
    public void deleteFarm(Long id) {
        //Get the farm by ID
        Farm farm = getFarmById(id);
        //Delete the farm
        farmRepository.delete(farm);
    }
}