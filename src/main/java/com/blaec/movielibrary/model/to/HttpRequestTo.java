package com.blaec.movielibrary.model.to;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;
import java.util.regex.Pattern;

@Slf4j
@Getter
@Setter(AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class HttpRequestTo {
    private String method;
    private String url;
    private String ip;
    private boolean bot;
    private static final Pattern BOT_PATTERN = Pattern.compile("(?i).*\\b(bot|crawler|spider)\\b.*");

    public static HttpRequestTo from(HttpServletRequest req) {
        HttpRequestTo request = new HttpRequestTo();
        request.setIp(req.getRemoteAddr());
        request.setUrl(String.valueOf(req.getRequestURL()));
        request.setMethod(req.getMethod());
        request.setBot(request.hasDetectedBot(req));

        return request;
    }

    private boolean hasDetectedBot(HttpServletRequest req) {
        String userAgent = req.getHeader("User-Agent");
        String acceptLanguage = req.getHeader("Accept-Language");
        String acceptEncoding = req.getHeader("Accept-Encoding");
        String referrer = req.getHeader("Referer");

        log.debug("User-Agent: {}", userAgent);
        log.debug("Accept-Language: {}", acceptLanguage);
        log.debug("Accept-Encoding: {}", acceptEncoding);
        log.debug("Referrer: {}", referrer);

        return (userAgent != null && BOT_PATTERN.matcher(userAgent).matches())
                || (acceptLanguage != null && BOT_PATTERN.matcher(acceptLanguage).matches())
                || (acceptEncoding != null && BOT_PATTERN.matcher(acceptEncoding).matches())
                || (referrer != null && BOT_PATTERN.matcher(referrer).matches());
    }

    @Override
    public String toString() {
        return "From ip %s received %s request from bot %b to url: %s".formatted(ip, method, bot, url);
    }
}
