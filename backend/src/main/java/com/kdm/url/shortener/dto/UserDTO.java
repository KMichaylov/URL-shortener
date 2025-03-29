package com.kdm.url.shortener.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class UserDTO {
    private long id;
    private String name;
    private String email;
    private String password;
}
