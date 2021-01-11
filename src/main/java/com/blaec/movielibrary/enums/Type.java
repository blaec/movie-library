package com.blaec.movielibrary.enums;

import java.util.Arrays;

public enum Type {
    movie("movie"),
    wish_list("wish_list");

    private final String type;

    Type(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public static Type convertFrom(String type) {
        return Arrays.stream(Type.values())
                .filter(t -> t.getType().equals(type))
                .findFirst()
                .orElse(null);
    }
}
