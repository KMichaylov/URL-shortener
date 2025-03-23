package com.kdm.url.shortener.repository;

import com.kdm.url.shortener.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<User, Long> {
}
