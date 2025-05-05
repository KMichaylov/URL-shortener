package com.kdm.url.shortener.controller;

import com.kdm.url.shortener.dto.LoginDTO;
import com.kdm.url.shortener.dto.RegistrationDTO;
import com.kdm.url.shortener.exception.UserDoesNotExistException;
import com.kdm.url.shortener.service.UrlService;
import com.kdm.url.shortener.utils.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.Objects;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/api/urls")
public class UrlRestController {

    private final UrlService urlService;
    private final JwtTokenUtil jwtTokenUtil;

    public UrlRestController(UrlService urlService, JwtTokenUtil jwtTokenUtil) {
        this.urlService = urlService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/short-url")
    public String shortenUrl(@RequestBody String url, HttpServletRequest request) throws NoSuchAlgorithmException {
        Long userId = jwtTokenUtil.extractUserIdFromRequest(request);
        if (userId == null)
            throw new UserDoesNotExistException("The user does not exist");
        return urlService.shortenUrl(url, userId);
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


    @GetMapping("/clicks")
    public int returnNumberOfClicks(@RequestBody String url) {
        return urlService.displayClickForUrl(url);
    }

//    @GetMapping("/qr-code")
//    public String generateQrCode(@RequestBody String url) {
////        TODO: Decide if you would do it in the backend or in the frontend
//        return "";
//    }

}
