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
    private final String tmbdId;
    private final String title;
    private final boolean isSuccess;
    private final String message;

    public static class Builder{
        private Integer id;
        private String tmbdId;
        private String title;
        private boolean isSuccess = true;
        private String message;

        private Builder(){
        }

        private Builder(String message){
            this.message = message;
        }

        public static Builder create() {
            return new Builder();
        }

        public static Builder create(String message) {
            return new Builder(message);
        }

        public Builder setMovie(Movie movie) {
            this.id = movie.getId();
            this.tmbdId = movie.getTmdbId();
            this.title = movie.getTitle();
            return this;
        }

        public Builder setId(Integer id) {
            this.id = id;
            return this;
        }

        public Builder setFail() {
            this.isSuccess = false;
            return this;
        }

        public Builder setMessage(String message) {
            this.message = message;
            return this;
        }

        public Response build() {
            return new Response(id, tmbdId, title, isSuccess, message);
        }
    }
}
