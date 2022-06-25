package com.blaec.movielibrary.utils;


import com.blaec.movielibrary.model.to.MovieFileTo;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@UtilityClass
public class FilesUtils {
    private static final long ONE_KB = 1024;
    private static final long ONE_MB = ONE_KB * ONE_KB;
    private static final long ONE_GB = ONE_KB * ONE_MB;
    private static final long ONE_TB = ONE_KB * ONE_GB;

    private static final BigDecimal ONE_KB_BD = BigDecimal.valueOf(ONE_KB);
    private static final BigDecimal ONE_MB_BD = BigDecimal.valueOf(ONE_MB);
    private static final BigDecimal ONE_GB_BD = BigDecimal.valueOf(ONE_GB);
    private static final BigDecimal ONE_TB_BD = BigDecimal.valueOf(ONE_TB);

    private static final String[] movieExtensions = {"mkv", "avi"};


    public static List<MovieFileTo> getMoviesFromFolder(String dirPath) {
        return getFiles(dirPath).stream()
                .map(convertToOptionalMovieFileTo())
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
    }

    private static Set<File> getFiles(String dirPath) {
        try (Stream<Path> entries = Files.walk(Path.of(dirPath)))
        {
            return entries
                    .filter(Files::isRegularFile)
                    .map(Path::toFile)
                    .filter(f -> hasExtension(f.getName(), movieExtensions))
                    .collect(Collectors.toSet());
        } catch (IOException e) {
            log.error("Failed getting files from " + dirPath, e);
            return Collections.emptySet();
        }
    }

    private static boolean hasExtension(String s, String... ext) {
        return Arrays.stream(ext).anyMatch(s::endsWith);
    }

    private static Function<File, Optional<MovieFileTo>> convertToOptionalMovieFileTo() {
        return movieFile -> {
            Optional<MovieFileTo> movieFileTo = MovieFileTo.from(movieFile);
            if (movieFileTo.isEmpty()) {
                logParsingFailure(movieFile);
            }
            return movieFileTo;
        };
    }

    private static void logParsingFailure(File movieFile) {
        String fullPath = String.format("%s%s%s", movieFile.getParent(), File.separator, movieFile.getName());
        log.error("Failed to parse movie {}", fullPath);
    }

    public static double byteToGb(long size) {
        return BigDecimal.valueOf(size)
                .divide(ONE_GB_BD, 2, RoundingMode.DOWN)
                .doubleValue();
    }
}
