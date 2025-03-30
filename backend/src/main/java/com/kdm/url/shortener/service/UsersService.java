package com.kdm.url.shortener.service;

import com.kdm.url.shortener.config.SecurityConfig;
import com.kdm.url.shortener.dto.LoginDTO;
import com.kdm.url.shortener.dto.RegistrationDTO;
import com.kdm.url.shortener.dto.UserDTO;
import com.kdm.url.shortener.exception.UserAlreadyExistsException;
import com.kdm.url.shortener.exception.UserDoesNotExistException;
import com.kdm.url.shortener.mapper.UserMapper;
import com.kdm.url.shortener.model.User;
import com.kdm.url.shortener.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

//TODO: Add all endpoints here tomorrow(on Saturday)
// TODO: Later add some comments
// TODO: Add validation
@Service
public class UsersService {

    private final UsersRepository usersRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = new SecurityConfig().passwordEncoder();

    }

    public Optional<UserDTO> registerUser(RegistrationDTO registrationDetails) {

        UserDTO userDTO = new UserDTO();
        userDTO.setName(registrationDetails.getUsername());
        userDTO.setEmail(registrationDetails.getEmail());
        userDTO.setPassword(passwordEncoder.encode(registrationDetails.getPassword()));
        checkIfAccountAlreadyExists(userDTO);
        usersRepository.save(UserMapper.userDTOToUser(userDTO, new User()));
        return Optional.of(userDTO);
    }

    private void checkIfAccountAlreadyExists(UserDTO userDTO) {
        if (usersRepository.findUserByEmail(userDTO.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException(String.format("A user with the email %s already exists.", userDTO.getEmail()));
        }
    }

    public boolean loginUser(LoginDTO loginDetails) {
        String email = loginDetails.getEmail();
        String password = loginDetails.getPassword();
        Optional<User> userFromDb = usersRepository.findUserByEmail(email);
        if (userFromDb.isPresent()) {
            String passwordFromDb = userFromDb.get().getPassword();
            return passwordEncoder.matches(password, passwordFromDb);
        } else {
            throw new UserDoesNotExistException(String.format("A user with the following email %s does not exists. Please first create an account", loginDetails.getEmail()));
        }
    }

    public boolean deleteUserById(long id) {
        if (usersRepository.findById(id).isPresent()) {
            usersRepository.deleteById(id);
            return true;
        } else {
            throw new UserDoesNotExistException("This user does not exist");
        }
    }

    public void resetPassword() {
        // TODO: Implement later
    }


}
