package com.agriTech.Model;

/// Java import
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity                     // Makes this class a database table
@Table(name = "users")      // Table name in PostgreSQL
@Data                       // Lombok: Generates getters, setters, toString(), equals(), hashCode()
@NoArgsConstructor         // Creates an empty constructor
@AllArgsConstructor         // Creates a constructor with all fields
@Builder                    // Allows object creation using the Builder pattern
public class User {

    @Id // Primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotNull(message="First name is required")
    private String firstName;

    @Column(nullable = false)
    @NotNull(message="Last name is required")
    private String lastName;

    @Column(unique = true)
    @Email(message="Email must be valid")
    private String email;

    @NotNull(message="Password required")
    private String password;


}