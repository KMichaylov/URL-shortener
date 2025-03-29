package com.kdm.url.shortener.dto;

import lombok.Data;

@Data
public class RegistrationDTO {
    private String username;
    private String email;
    private String password;
}
