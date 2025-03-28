package com.kdm.url.shortener.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class UrlDTO {
    private String shortUrl;
    private String originalUrl;
    private Timestamp creation;
    private Timestamp expiration;
    private int numberOfClicks;
    private String qrCode;
}
