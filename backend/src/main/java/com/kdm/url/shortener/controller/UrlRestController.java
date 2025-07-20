package com.kdm.url.shortener.controller;

import com.kdm.url.shortener.dto.LoginDTO;
import com.kdm.url.shortener.dto.RegistrationDTO;
import com.kdm.url.shortener.dto.UrlRequest;
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
@RequestMapping("/api/urls")
public class UrlRestController {

    private final UrlService urlService;
    private final JwtTokenUtil jwtTokenUtil;

    public UrlRestController(UrlService urlService, JwtTokenUtil jwtTokenUtil) {
        this.urlService = urlService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/short-url")
    public String shortenUrl(@RequestBody UrlRequest urlRequest, HttpServletRequest request) throws NoSuchAlgorithmException {
        Long userId = jwtTokenUtil.extractUserIdFromRequest(request);
        if (userId == null)
            throw new UserDoesNotExistException("The user does not exist");
        String url = urlRequest.getOriginalUrl();
        return urlService.shortenUrl(url, userId);
    }

    @GetMapping("/clicks")
    public int returnNumberOfClicks(@RequestParam String url) {
        return urlService.displayClickForUrl(url);
    }

}
