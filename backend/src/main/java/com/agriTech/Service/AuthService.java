package com.agriTech.Service;


//local import
import com.agriTech.Model.User;
import com.agriTech.Repositories.UserRepository;

// dependecy import
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * AUTH SERVICE
 * Handles:
 * - User registration
 * - Login authentication
 * - JWT generation
 */

@Service
@RequiredArgsConstructor
public class AuthService {
    //Constructor injection
    private final UserRepository userRepository;

    /**
     * Register new user
     */
    public User register(User user) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        // Hash the password
        user.setPassword(encoder.encode(user.getPassword()));

        return  userRepository.save(user);
    }

    /**
     * Login existing user
     */
    public User login(String email, String password) {

        User user = userRepository.findByEmail(email.trim());

        if (user == null) {
            throw new RuntimeException("User not found");
        }
        // Password encoder
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
       //confirm user password
        if (!encoder.matches(password, user.getPassword().trim())) {
            throw new RuntimeException("Invalid password");
        }

        // Return a user
        return user;
    }
}