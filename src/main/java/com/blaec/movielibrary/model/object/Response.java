package com.blaec.movielibrary.model.object;

import com.blaec.movielibrary.model.Movie;
import lombok.Getter;

import java.util.concurrent.Callable;

@Getter
public class Response {
    private final Integer id;
    private final String tmbdId;
    private final String title;
    // probably during serialization which is used by getters + setters + is-getters
    // field isSomething replaced to something
    private final boolean isSuccess;
    private final String message;
    private final boolean isValidTitle;

    private Response(Builder builder) {
        this.id = builder.id;
        this.tmbdId = builder.tmbdId;
        this.title = builder.title;
        this.isSuccess = builder.isSuccess;
        this.message = builder.message;
        this.isValidTitle = builder.isValidTitle;
    }

    public static class Builder {
        private Integer id;
        private String tmbdId;
        private String title;
        private boolean isSuccess = true;
        private String message;
        private boolean isValidTitle = true;

        private Builder() {
        }

        public static Builder create() {
            return new Builder();
        }

        public Builder setMovie(Movie movie) {
            this.id = movie.getId();
            this.tmbdId = movie.getTmdbId();
            this.title = movie.getTitle();
            return this;
        }

        public Builder setTmdbId(String tmbdId) {
            this.tmbdId = tmbdId;
            return this;
        }

        public Builder setFailMessage(String message) {
            this.isSuccess = false;
            this.message = message;
            return this;
        }

        public Builder validateSuccess(Callable<Boolean> isValid) throws Exception {
            this.isSuccess = isValid.call();
            return this;
        }

        public Builder setMessage(String message) {
            this.message = message;
            return this;
        }

        public Builder setIsValidTitle(boolean isValidTitle) {
            this.isValidTitle = isValidTitle;
            return this;
        }

        public Response build() {
            return new Response(this);
        }
    }
}
