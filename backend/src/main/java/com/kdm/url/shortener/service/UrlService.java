package com.kdm.url.shortener.service;

import com.kdm.url.shortener.exception.UserDoesNotExistException;
import com.kdm.url.shortener.model.Url;
import com.kdm.url.shortener.model.User;
import com.kdm.url.shortener.repository.UrlRepository;
import com.kdm.url.shortener.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.util.Base64;
import java.util.Optional;

@Service
public class UrlService {

    public static final int SHORT_CODE_LENGTH = 10;
    private static final SecureRandom random = new SecureRandom();
    private final UrlRepository urlRepository;
    private final UsersRepository usersRepository;

    @Autowired
    public UrlService(UrlRepository urlRepository, UsersRepository usersRepository) {
        this.urlRepository = urlRepository;
        this.usersRepository = usersRepository;
    }

    public String shortenUrl(String url, long userId) throws NoSuchAlgorithmException {
        StringBuilder baseUrl = new StringBuilder("https://shorturl/");
        StringBuilder shortCode = generateShortCode();
        String shortUrl = baseUrl.append(shortCode).toString();


        Optional<User> userOptional = usersRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new UserDoesNotExistException("This user does not exist, please enter your account");
        }

        User user = userOptional.get();
        Url urlModel = new Url();
        Timestamp creationTime = new Timestamp(System.currentTimeMillis());
        Timestamp expirationTime = new Timestamp(System.currentTimeMillis() + (31L * 24 * 60 * 60 * 1000));

        urlModel.setOriginalUrl(url);
        urlModel.setShortUrl(shortUrl);
        urlModel.setCreation(creationTime);
        urlModel.setExpiration(expirationTime);
        urlModel.setNumberOfClicks(0);
        urlModel.setUser(user);

        urlRepository.save(urlModel);
        return shortUrl;
    }

    private StringBuilder generateShortCode() {
        byte[] randomBytes = new byte[SHORT_CODE_LENGTH];
        random.nextBytes(randomBytes);
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-512");
            byte[] hashBytes = digest.digest(randomBytes);

            String hashedInput = Base64.getEncoder().withoutPadding().encodeToString(hashBytes);

            return new StringBuilder(hashedInput.substring(0, SHORT_CODE_LENGTH));
        } catch (NoSuchAlgorithmException ex) {
            throw new RuntimeException("SHA-512 algorithm not found", ex);
        }

    }

    public int displayClickForUrl(String url) {
        Optional<Url> urlOptional = urlRepository.findByOriginalUrl(url);
        return urlOptional.map(Url::getNumberOfClicks).orElse(0);
    }

    public void increaseClicksForOriginalUrl(String url) {
        Optional<Url> urlOptional = urlRepository.findByOriginalUrl(url);
        urlOptional.ifPresent(u -> {
            String originalUrl = u.getOriginalUrl();
            Optional<Url> originalUrlOptional = urlRepository.findByOriginalUrl(originalUrl);
            originalUrlOptional.ifPresent(originalUrlEntry -> {
                originalUrlEntry.setNumberOfClicks(originalUrlEntry.getNumberOfClicks() + 1);
                urlRepository.save(originalUrlEntry);
            });
        });
    }

    public String getOriginalUrl(String shortUrl) {

        Optional<Url> url = urlRepository.findByShortUrl(shortUrl);

        if (url.isPresent())
            return url.get().getOriginalUrl();
        return "";
    }
}
