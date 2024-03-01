package com.blaec.movielibrary.model;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.regex.Pattern;

@Slf4j
@Entity
@Getter
@Setter(AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "requests")
public class Request {

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private Integer id;

    @Column(nullable = false,
            length = 10)
    @NonNull
    private String method;

    @Column(nullable = false,
            length = 300)
    @NonNull
    private String url;

    @Column(nullable = false,
            length = 20)
    @NonNull
    private String ip;

    @Column(name="request_date",
            columnDefinition = "DATE DEFAULT (CURRENT_DATE)")
    @NonNull private LocalDateTime requestDate = LocalDateTime.now();

    @Column(name="is_bot")
    private boolean bot;

    private static final Pattern BOT_PATTERN = Pattern.compile("(?i).*\\b(bot|crawler|spider)\\b.*");


    public static Request from(HttpServletRequest req) {
        Request request = new Request();
        request.setIp(req.getRemoteAddr());
        request.setUrl(String.valueOf(req.getRequestURL()));
        request.setMethod(req.getMethod());
        request.setBot(request.hasDetectedBot(req));

        return request;
    }

    private boolean hasDetectedBot(HttpServletRequest req) {
        String userAgent = req.getHeader("User-Agent");

        return userAgent != null
                && BOT_PATTERN.matcher(userAgent).matches();
    }

    @Override
    public String toString() {
        return "From ip %s received %s request from bot %b to url: %s".formatted(ip, method, bot, url);
    }
}
