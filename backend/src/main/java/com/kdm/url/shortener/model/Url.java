package com.kdm.url.shortener.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import java.sql.Timestamp;

@Entity
@Table(name = "url")
@Data
@NoArgsConstructor
public class Url {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "short_url")
    private String shortUrl;

    @Column(name = "original_url")
    private String originalUrl;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "creation")
    private Timestamp creation;

    @Column(name = "expiration")
    private Timestamp expiration;

    @Column(name = "number_of_clicks")
    private int numberOfClicks;

    @Column(name = "qr_code")
    private String qrCode;


}
