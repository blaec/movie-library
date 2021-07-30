package com.blaec.movielibrary.enums;

import com.blaec.movielibrary.configs.TmdbApiConfig;

public enum Language {
    EN{
        @Override public String getLanguageCode(TmdbApiConfig config) {
            return config.getValue().getLanguage();
        }
    },
    RU{
        @Override public String getLanguageCode(TmdbApiConfig config) {
            return config.getValue().getLanguageRu();
        }
    };

    abstract public String getLanguageCode(TmdbApiConfig config);
}
