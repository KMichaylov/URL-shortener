package com.kdm.url.shortener.controller;

import com.kdm.url.shortener.dto.LoginDTO;
import com.kdm.url.shortener.dto.RegistrationDTO;
import com.kdm.url.shortener.dto.UserDTO;
import com.kdm.url.shortener.service.UsersService;
import com.kdm.url.shortener.utils.JwtTokenUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/api/users")
public class UsersRestController {

    private final UsersService userService;
    private final JwtTokenUtil jwtTokenUtil;

    public UsersRestController(UsersService userService, JwtTokenUtil jwtTokenUtil) {
        this.userService = userService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        Optional<UserDTO> userOpt = userService.loginUser(loginDTO);

        if (userOpt.isPresent()) {
            UserDTO user = userOpt.get();
            if (user.getUserId() == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User ID is missing.");
            }

            String token = jwtTokenUtil.generateToken(user.getUserId(), user.getName());
            return ResponseEntity.ok("Bearer " + token);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login credentials.");
    }

    @PostMapping("/registration")
    public ResponseEntity<String> register(@RequestBody RegistrationDTO registrationDTO) {
        Optional<UserDTO> registeredUser = userService.registerUser(registrationDTO);

        if (registeredUser.isPresent()) {
            UserDTO userDTO = registeredUser.get();
            String token = jwtTokenUtil.generateToken(userDTO.getUserId(), userDTO.getName());
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully! Token: " + token);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed.");
    }

}
