package com.blaec.movielibrary.to;

import com.blaec.movielibrary.enums.Resolution;
import com.blaec.movielibrary.utils.FilesUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MovieFileTo {
    // mandatory properties
    private final String name;
    private final int year;
    private final Resolution resolution;
    private final double size;
    private final String location;
    private final String fileName;

    // optional properties
    private final String description;
    private final int frameRate;

    private static final Pattern MOVIE = Pattern.compile
        (
            "(?<order>\\d{3}. )?" +
            "(?<name>[ ,-.\\w'&ampéÆ!·³;]+?) " +
            "(\\[(?<description>.*)] )?" +
            "\\((?<year>\\d{4})\\) " +
            "\\[(?<resolution>\\d+p)]" +
            "( \\[(?<frameRate>\\d+)fps])?"
        );

    /**
     * Creates movie file object from movie file
     *
     * @param file movie file
     * @return MovieFileObject or null if match isn't found
     */
    public static MovieFileTo from(File file) {
        String fileName = file.getName();
        Matcher matcher = MOVIE.matcher(fileName);
        MovieFileTo movieFileObject = null;
        if (matcher.find()) {
            int frameRate = parseInt(matcher, "frameRate");
            movieFileObject = new MovieFileTo(
                matcher.group("name"),
                parseInt(matcher, "year"),
                Resolution.convertFrom(matcher.group("resolution")),
                FilesUtils.byteToGb(file.length()),
                file.getParent(),
                fileName,
                matcher.group("description"),
                frameRate == 0 ? 24 : frameRate
            );
        }
        return movieFileObject;
    }

    private static int parseInt(Matcher matcher, String group) {
        String value = matcher.group(group);
        return value == null ? 0 : Integer.parseInt(value);
    }

    /**
     * Replace some symbols (that aren't allowed in file name) to new symbols as they are saved in db
     *
     * @return file movie name converted for comparing with db movie name
     */
    public String getNameDbStyled() {
        return name.replace("..", ":")
                   .replace(",.","?");
    }

    /**
     * Replace some symbols in file name to new symbols allowed in url link
     *
     * @return file movie name converted to url file name
     */
    public String getNameUrlStyled() {
        return name.replace(" ", "+")
                   .replace("..", "%3A")
                   .replace(",.", "%3F")
                   .replace("'", "%27")
                   .replace("é", "%C3%A9")
                   .replace("&", "%26")
                   .replace("·", "%C2%B7")
                   .replace("³", "%C2%B3");
    }

    @Override
    public String toString() {
        return String.format("%s | %s%s (%d) [%s]%s | %.2f Gb",
                location,
                name,
                description == null ? "" : String.format(" [%s]", description),
                year,
                resolution == null ? "WRONG RESOLUTION" : resolution.getResolution(),
                frameRate == 0 ? "" : String.format(" [%dfps]", frameRate),
                size);
    }
}
