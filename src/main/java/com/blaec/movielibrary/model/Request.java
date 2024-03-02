package com.blaec.movielibrary.model;

import com.blaec.movielibrary.model.to.HttpRequestTo;
import com.blaec.movielibrary.model.to.HttpRequestValidator;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @Column(name="is_action_allowed")
    private boolean actionAllowed;

    public static Request of(HttpRequestTo to, HttpRequestValidator validator) {
        Request request = new Request();
        request.setIp(to.getIp());
        request.setUrl(to.getUrl());
        request.setMethod(to.getMethod());
        request.setBot(to.isBot());
        request.setActionAllowed(validator.isActionAllowed());

        return request;
    }
}
