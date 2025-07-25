package com.kdm.url.shortener.controller;

import com.kdm.url.shortener.service.UrlService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;

@RestController
public class RedirectController {
    private final UrlService urlService;
    private final String ADDRESS_CONSTANT = "http://localhost:5173/r/";

    public RedirectController(UrlService urlService) {
        this.urlService = urlService;
    }

    @GetMapping("/r/{shortUrl}")
    public ResponseEntity<Void> redirectToUrl(@PathVariable String shortUrl) throws NoSuchAlgorithmException {
        String fullUrl = ADDRESS_CONSTANT + shortUrl;
        urlService.increaseClicksForOriginalUrl(fullUrl);
        String originalUrl = urlService.getOriginalUrl(fullUrl);
        System.out.println(originalUrl);

        if (originalUrl != null && !originalUrl.isBlank()) {
            return ResponseEntity.status(HttpStatus.FOUND)
                    .header(HttpHeaders.LOCATION, originalUrl)
                    .build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
