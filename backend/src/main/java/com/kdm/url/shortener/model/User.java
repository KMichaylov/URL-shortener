package com.kdm.url.shortener.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @NotBlank(message = "Name is mandatory")
    @Pattern(regexp = "^[A-Za-z' ]+$", message = "Username must contain only letters and apostrophes.")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    @Column(name = "user_name")
    private String name;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Invalid email format")
    @Column(name = "user_email", unique = true)
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Url> urls;

    @NotBlank(message = "Password is mandatory")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d!@#$%^&*()_+~\\-={}\\[\\]:;\"'<>,.?/]{10,}$",
            message = "Password must be at least 10 characters, include uppercase, lowercase, and a number."
    )
    @Column(name = "user_password")
    private String password;
}
