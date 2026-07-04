package com.agriTech.Repositories;
import com.agriTech.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


    /**
     * Handles all database operations for User.
     * Repository communicate directly with Postgres
     */
    public interface UserRepository extends JpaRepository<User, Long> {

        // Find a user using their email address
        User findByEmail(String email);

    }

