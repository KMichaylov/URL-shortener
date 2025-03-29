package com.kdm.url.shortener.repository;

import com.kdm.url.shortener.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String email);
}
