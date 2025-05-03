package com.kdm.url.shortener.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.Cascade;

import java.sql.Timestamp;

@Entity
@Table(name = "url")
@Data
@NoArgsConstructor
public class Url {

    @Id
    @NotBlank(message = "Short URL cannot be blank")
    @Column(name = "short_url")
    private String shortUrl;

    @NotBlank(message = "Original URL cannot be blank")
    @Column(name = "original_url")
    private String originalUrl;

    @NotNull(message = "User must not be null")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull(message = "Creation timestamp cannot be null")
    @Column(name = "creation")
    private Timestamp creation;

    @NotNull(message = "Expiration timestamp cannot be null")
    @Column(name = "expiration")
    private Timestamp expiration;

    @Column(name = "number_of_clicks")
    private int numberOfClicks;
}
