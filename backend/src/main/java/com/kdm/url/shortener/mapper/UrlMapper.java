package com.kdm.url.shortener.mapper;

import com.kdm.url.shortener.dto.UrlDTO;
import com.kdm.url.shortener.model.Url;

public class UrlMapper {

    public static UrlDTO urlToDTO(Url url, UrlDTO urlDTO) {
        urlDTO.setOriginalUrl(url.getOriginalUrl());
        urlDTO.setShortUrl(url.getShortUrl());
        urlDTO.setCreation(url.getCreation());
        urlDTO.setExpiration(url.getExpiration());
        urlDTO.setNumberOfClicks(url.getNumberOfClicks());
        urlDTO.setQrCode(url.getQrCode());
        return urlDTO;
    }

    public static Url urlDTOToUrl(Url url, UrlDTO urlDTO) {
        url.setOriginalUrl(urlDTO.getOriginalUrl());
        url.setShortUrl(urlDTO.getShortUrl());
        url.setCreation(urlDTO.getCreation());
        url.setExpiration(urlDTO.getExpiration());
        url.setNumberOfClicks(urlDTO.getNumberOfClicks());
        url.setQrCode(urlDTO.getQrCode());
        return url;
    }
}
