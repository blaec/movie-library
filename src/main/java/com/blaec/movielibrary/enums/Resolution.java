package com.blaec.movielibrary.enums;

import java.util.Arrays;

// https://en.wikipedia.org/wiki/List_of_common_resolutions
// 2160p: 3840x2160
// 1440p: 2560x1440
// 1080p: 1920x1080
// 720p: 1280x720
// 480p: 854x480
// 360p: 640x360
// 240p: 426x240
public enum Resolution {
    VGA("480p"),
    HD("720p"),
    FullHD("1080p");

    private final String res;

    Resolution(String res) {
        this.res = res;
    }

    public String getResolution() {
        return res;
    }

    public static Resolution convertFrom(String res) {
        return Arrays.stream(Resolution.values())
                .filter(r -> r.getResolution().equals(res))
                .findFirst()
                .orElse(null);
    }
}
