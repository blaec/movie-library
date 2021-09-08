package com.blaec.movielibrary.model.to;

import com.blaec.movielibrary.enums.Resolution;
import com.blaec.movielibrary.utils.FilesUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MovieFileTo {
    private final String name;
    private final int year;
    private final Resolution resolution;
    private final double size;
    private final String location;
    private final String fileName;
    private final String description;
    private final int frameRate;

    private static final Pattern FILE_NAME = Pattern.compile
        (
            "(?<order>\\d{3}. )?" +
            "(?<name>[ ,-.\\w'&ampéÆ!·³;]+?) " +
            "(\\[(?<description>.*)] )?" +
            "\\((?<year>\\d{4})\\) " +
            "\\[(?<resolution>\\d+p)]" +
            "( \\[(?<frameRate>\\d+)fps])?"
        );

    public static Optional<MovieFileTo> from(File file) {
        String fileName = file.getName();
        Matcher matcher = FILE_NAME.matcher(fileName);
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

        return Optional.ofNullable(movieFileObject);
    }

    private static int parseInt(Matcher matcher, String group) {
        String value = matcher.group(group);
        return value == null ? 0 : Integer.parseInt(value);
    }

    /**
     * Replace some symbols (that aren't allowed in file name) to new symbols as they are saved in db
     */
    public String getNameDbStyled() {
        return name.replace("..", ":")
                   .replace(",.","?");
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
