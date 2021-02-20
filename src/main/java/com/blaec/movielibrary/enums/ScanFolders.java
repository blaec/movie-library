package com.blaec.movielibrary.enums;

import com.blaec.movielibrary.configs.UploadConfigs;

public enum ScanFolders {
    cartoons{
        @Override public String getLocation(UploadConfigs config) { return config.getCartoons(); }
    },
    movies{
        @Override public String getLocation(UploadConfigs config) { return config.getMovies(); }
    },
    serialMovies {
        @Override public String getLocation(UploadConfigs config) { return config.getSerialMovies(); }
    },
    music {
        @Override public String getLocation(UploadConfigs config) { return config.getMusic(); }
    },
    videos {
        @Override public String getLocation(UploadConfigs config) { return config.getVideos(); }
    };

    public abstract String getLocation(UploadConfigs config);
}
