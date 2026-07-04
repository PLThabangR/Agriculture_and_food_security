package com.agrigrow.backend.service;

import com.agrigrow.backend.model.CropField;
import com.agrigrow.backend.model.MarketTrend;
import com.agrigrow.backend.model.ScanHistory;
import com.agrigrow.backend.model.User;
import com.agrigrow.backend.repository.CropFieldRepository;
import com.agrigrow.backend.repository.MarketTrendRepository;
import com.agrigrow.backend.repository.ScanHistoryRepository;
import com.agrigrow.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CropFieldRepository cropFieldRepository;
    private final ScanHistoryRepository scanHistoryRepository;
    private final MarketTrendRepository marketTrendRepository;

    public DataInitializer(UserRepository userRepository,
                           CropFieldRepository cropFieldRepository,
                           ScanHistoryRepository scanHistoryRepository,
                           MarketTrendRepository marketTrendRepository) {
        this.userRepository = userRepository;
        this.cropFieldRepository = cropFieldRepository;
        this.scanHistoryRepository = scanHistoryRepository;
        this.marketTrendRepository = marketTrendRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed default user if not exists
        if (userRepository.findByEmail("farmer@agrigrow.africa").isEmpty()) {
            User user = new User();
            user.setEmail("farmer@agrigrow.africa");
            // Simple plain text password for this demo/local setup. In a real app we'd BCrypt it.
            user.setPassword("password");
            user.setFirstName("Kwame");
            user.setLastName("Mensah");
            // Beautiful avatar
            user.setProfileImage("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face");
            userRepository.save(user);
        }

        // 2. Seed crop fields
        if (cropFieldRepository.count() == 0) {
            CropField corn = new CropField();
            corn.setName("Corn");
            corn.setHealthScore(85);
            corn.setStatus("ACTIVE");
            corn.setEstimatedYield(4.2);
            corn.setYieldUnit("Tons");
            corn.setSector("East Sector (Corn Field)");
            corn.setImageUrl("https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80");
            cropFieldRepository.save(corn);

            CropField cocoa = new CropField();
            cocoa.setName("Cocoa");
            cocoa.setHealthScore(92);
            cocoa.setStatus("ACTIVE");
            cocoa.setEstimatedYield(1.8);
            cocoa.setYieldUnit("Tons");
            cocoa.setSector("West Sector (Cocoa Plantation)");
            cocoa.setImageUrl("https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&auto=format&fit=crop&q=80");
            cropFieldRepository.save(cocoa);
        }

        // 3. Seed market trends (SAFEX South Africa, prices in Rand per metric ton)
        if (marketTrendRepository.count() == 0) {
            MarketTrend whiteMaize = new MarketTrend();
            whiteMaize.setCropName("White Maize");
            whiteMaize.setPrice(4320.00);
            whiteMaize.setChangePercentage(1.4);
            whiteMaize.setUp(true);
            whiteMaize.setCurrency("R");
            marketTrendRepository.save(whiteMaize);

            MarketTrend yellowMaize = new MarketTrend();
            yellowMaize.setCropName("Yellow Maize");
            yellowMaize.setPrice(4180.00);
            yellowMaize.setChangePercentage(0.2);
            yellowMaize.setUp(false);
            yellowMaize.setCurrency("R");
            marketTrendRepository.save(yellowMaize);

            MarketTrend sunflower = new MarketTrend();
            sunflower.setCropName("Sunflower Seeds");
            sunflower.setPrice(8950.00);
            sunflower.setChangePercentage(2.8);
            sunflower.setUp(true);
            sunflower.setCurrency("R");
            marketTrendRepository.save(sunflower);

            MarketTrend sorghum = new MarketTrend();
            sorghum.setCropName("Sorghum");
            sorghum.setPrice(3850.00);
            sorghum.setChangePercentage(0.0);
            sorghum.setUp(true);
            sorghum.setCurrency("R");
            marketTrendRepository.save(sorghum);
        }

        // 4. Seed scan history
        if (scanHistoryRepository.count() == 0) {
            ScanHistory scan1 = new ScanHistory();
            scan1.setCropName("Maize");
            scan1.setDiseaseName("Maize Rust");
            scan1.setConfidence(98.0);
            scan1.setSampleId("MZ-RUST-001");
            scan1.setStatus("TREATED");
            scan1.setImageUrl("https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400&fit=crop&q=60");
            scan1.setTimestamp(LocalDateTime.now().minusDays(1));
            scan1.setAdvice("Rust spots treated with organic neem oil spray. Keep monitoring soil moisture and ensure proper airflow between rows.");
            scanHistoryRepository.save(scan1);

            ScanHistory scan2 = new ScanHistory();
            scan2.setCropName("Sorghum");
            scan2.setDiseaseName("Healthy Sorghum");
            scan2.setConfidence(95.0);
            scan2.setSampleId("SG-HLTH-002");
            scan2.setStatus("STABLE");
            scan2.setImageUrl("https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&fit=crop&q=60");
            scan2.setTimestamp(LocalDateTime.now().minusDays(3));
            scan2.setAdvice("No pathogen detected. Plants display standard turgor and coloring. Normal maintenance recommended.");
            scanHistoryRepository.save(scan2);

            ScanHistory scan3 = new ScanHistory();
            scan3.setCropName("Potato");
            scan3.setDiseaseName("Potato Blight");
            scan3.setConfidence(91.0);
            scan3.setSampleId("PT-BLGT-003");
            scan3.setStatus("ACTION REQ");
            scan3.setImageUrl("https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&fit=crop&q=60");
            scan3.setTimestamp(LocalDateTime.now().minusDays(5));
            scan3.setAdvice("Early stage blight identified. Prune infected lower foliage immediately and apply copper-based organic spray. Avoid overhead watering.");
            scanHistoryRepository.save(scan3);

            ScanHistory scan4 = new ScanHistory();
            scan4.setCropName("Coffee");
            scan4.setDiseaseName("Arabica Coffee");
            scan4.setConfidence(99.0);
            scan4.setSampleId("CF-HLTH-004");
            scan4.setStatus("HEALTHY");
            scan4.setImageUrl("https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&fit=crop&q=60");
            scan4.setTimestamp(LocalDateTime.now().minusDays(7));
            scan4.setAdvice("Leaves show strong structural integrity. Photosynthetic index is optimal. Maintain shade tree coverage.");
            scanHistoryRepository.save(scan4);
        }
    }
}
