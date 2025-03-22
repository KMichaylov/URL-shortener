package com.kdm.url.shortener.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_email")
    private String email;


    @Column(name = "user_password")
    private String password;

}
