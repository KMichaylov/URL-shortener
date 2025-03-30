package com.kdm.url.shortener.controller;

import com.kdm.url.shortener.dto.LoginDTO;
import com.kdm.url.shortener.dto.RegistrationDTO;
import com.kdm.url.shortener.dto.UserDTO;
import com.kdm.url.shortener.service.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UsersRestController {


    private final UsersService userService;

    public UsersRestController(UsersService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        boolean userIsFound = userService.loginUser(loginDTO);

        if (userIsFound) {
            return ResponseEntity.ok("Login is successful!");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login details are wrong! Try again");
    }

    @PostMapping("/registration")
    public ResponseEntity<String> register(@RequestBody RegistrationDTO registrationDTO) {
        Optional<UserDTO> registeredUser = userService.registerUser(registrationDTO);

        if (registeredUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body("User is registered successfully!");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("A problem occurred, please try again!");
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable long userId) {
        boolean isDeleted = userService.deleteUserById(userId);

        if (isDeleted) {
            return ResponseEntity.ok("User deleted successfully.");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
    }


}
