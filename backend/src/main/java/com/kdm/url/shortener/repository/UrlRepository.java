package com.kdm.url.shortener.repository;

import com.kdm.url.shortener.model.Url;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface UrlRepository extends JpaRepository<Url, Long> {

}
