package com.blaec.movielibrary.to;

import com.blaec.movielibrary.model.Movie;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Response {
    // TODO for some reason React replaces isSomething to something
    private final Integer id;
    private final String title;
    private final boolean isSuccess;
    private final String message;

    public static Response create(Integer id, String title, boolean isSuccess, String message) {
        return new Response(id, title, isSuccess, message);
    }

    public static Response create(boolean isSuccess, String message) {
        return new Response(null, null, isSuccess, message);
    }

    public static Response create(String title, boolean isSuccess, String message) {
        return new Response(null, title, isSuccess, message);
    }

    public static Response create(Movie movie, boolean isSuccess, String message) {
        return new Response(movie.getId(), movie.getTitle(), isSuccess, message);
    }

    public static class Builder{
        private Integer id;
        private String title;
        private boolean isSuccess;
        private String message;

        private Builder(){
            this.isSuccess = true;
        }

        public static Builder create() {
            return new Builder();
        }

        public Builder setFail() {
            this.isSuccess = false;
            return this;
        }

        public Builder setMessage(String message) {
            this.message = message;
            return this;
        }

        public Builder setMovie(Movie movie) {
            this.id = movie.getId();
            this.title = movie.getTitle();
            return this;
        }

        public Response build() {
            return new Response(id, title, isSuccess, message);
        }
    }
}
