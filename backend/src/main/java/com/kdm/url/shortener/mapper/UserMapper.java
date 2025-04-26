package com.kdm.url.shortener.mapper;

import com.kdm.url.shortener.dto.UrlDTO;
import com.kdm.url.shortener.dto.UserDTO;
import com.kdm.url.shortener.model.Url;
import com.kdm.url.shortener.model.User;

public class UserMapper {

    public static UserDTO userToDTO(User user, UserDTO userDTO) {
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getName());
        userDTO.setPassword(user.getPassword());
        return userDTO;
    }

    public static User userDTOToUser(UserDTO userDTO, User user) {
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        user.setPassword(userDTO.getPassword());
        return user;
    }
}
