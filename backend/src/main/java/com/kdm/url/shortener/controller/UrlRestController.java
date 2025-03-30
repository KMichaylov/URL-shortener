package com.kdm.url.shortener.controller;

import com.kdm.url.shortener.dto.LoginDTO;
import com.kdm.url.shortener.dto.RegistrationDTO;
import com.kdm.url.shortener.service.UrlService;
import lombok.Getter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/urls")
public class UrlRestController {

    private final UrlService urlService;

    public UrlRestController(UrlService urlService) {
        this.urlService = urlService;
    }

    @PostMapping("/short-url")
    public String shortenUrl(@RequestBody String url) throws NoSuchAlgorithmException {

//        TODO: Obtain userID from JWT
        return urlService.shortenUrl(url, 0);
    }

    @GetMapping("/short-url")
    public ResponseEntity<Void> returnShortUrl(@RequestBody String shortUrl) throws NoSuchAlgorithmException {
        urlService.increaseClicksForUrl(shortUrl);

        String originalUrl = urlService.getOriginalUrl(shortUrl);
        if (!Objects.equals(originalUrl, "")) {
            return ResponseEntity.status(HttpStatus.FOUND).header(HttpHeaders.LOCATION, originalUrl).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }


    @PostMapping("/clicks")
    public int returnNumberOfClicks(@RequestBody String url) {
        return urlService.displayClickForUrl(url);
    }

    @GetMapping("/qr-code")
    public String generateQrCode(@RequestBody String url) {
//        TODO: Decide if you would do it in the backend or in the frontend
        return "";
    }

}
