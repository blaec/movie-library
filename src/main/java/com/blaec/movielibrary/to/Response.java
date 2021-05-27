package com.blaec.movielibrary.to;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Response {
    // TODO for some reason React replaces isSomething to something
    private final boolean isSuccess;
    private final String message;

    public static Response create(boolean isSuccess, String message) {
        return new Response(isSuccess, message);
    }
}
