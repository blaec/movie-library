package com.blaec.movielibrary.enums;

public enum FailType {
    PARSE("parsing error"),
    DB_SAVE("db save error"),
    IN_GALLERY("is in gallery"),
    IN_WISHLIST("is in wishlist");

    private final String description;

    FailType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
