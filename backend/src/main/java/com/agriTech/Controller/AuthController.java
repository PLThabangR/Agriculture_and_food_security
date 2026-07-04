package com.agriTech.Controller;


//local imports
import com.agriTech.Dto.LoginRequest;
import com.agriTech.Model.User;
import com.agriTech.Service.AuthService;

//Dependency imports
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AUTH CONTROLLER
 * Handles registration and login requests
 * Public endpoints (no JWT required)
 */

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    // Constructor injection
    private final AuthService authService;

    /**
     * REGISTER USER
     * Endpoint: POST /api/auth/register
     */
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        // Calls service layer to handle logic

        return authService.register(user);
    }

    /**
     * LOGIN USER
     * Endpoint: POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest request) {
        //Calls service layer to handle logic
        User user = authService.login(request.getEmail().trim(), request.getPassword().trim());

        return ResponseEntity.ok(user);
    }
}

