package com.agriTech.Service;

import com.agriTech.Model.Crop;
import com.agriTech.Model.Farm;
import com.agriTech.Model.User;
import com.agriTech.Model.Weather;
import com.agriTech.Repositories.CropRepository;
import com.agriTech.Repositories.FarmRepository;
import com.agriTech.Repositories.UserRepository;
import com.agriTech.Repositories.WeatherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CropService {
    //Constructor injection
    private final CropRepository cropRepository;
    private final FarmRepository farmRepository;
    private final UserRepository userRepository;
    private final WeatherRepository weatherRepository;

    public Crop createCrop(Crop crop, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Farm> farms = farmRepository.findByUser_Id(userId);

        if (farms.isEmpty()) {
            throw new RuntimeException("Farm not found");
        }

        // Get the user's first farm
        Farm farm = farms.get(0);

        // Associate the crop with the farm
        crop.setFarm(farm);

        // Associate existing weather if provided
        if (crop.getWeather() != null) {

            // Get the new weather from the request
            Weather weather = crop.getWeather();

            // Save it first
            weather = weatherRepository.save(weather);

            // Associate it with the crop
            crop.setWeather(weather);
        }

        return cropRepository.save(crop);
    }

    public Crop getCropById(Long cropId){
        return cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop not found"));
    }

    public List<Crop> getCropsByFarm(Long farmId) {
        return cropRepository.findByFarmId(farmId);
    }

    public Crop updateCrop(Long id, Crop updated) {

        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Crop not found"));

        crop.setCropName(updated.getCropName());
        crop.setStatus(updated.getStatus());

        return cropRepository.save(crop);
    }

    public void deleteCrop(Long id) {
        cropRepository.deleteById(id);
    }
}
