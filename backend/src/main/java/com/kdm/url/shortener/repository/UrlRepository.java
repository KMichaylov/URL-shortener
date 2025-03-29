package com.kdm.url.shortener.repository;

import com.kdm.url.shortener.model.Url;
import org.hibernate.annotations.processing.SQL;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface UrlRepository extends JpaRepository<Url, Long> {

    @SQL("SELECT * FROM url WHERE shortURL = short_url")
    Optional<Url> findByShortendUrl(String shortUrl);
}
