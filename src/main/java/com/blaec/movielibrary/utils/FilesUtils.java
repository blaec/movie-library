package com.blaec.movielibrary.utils;


import com.blaec.movielibrary.model.to.MovieFileTo;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.FileFilter;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;
import java.util.function.Function;
import java.util.stream.Collectors;

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

    private static final FileFilter filter = pathname -> pathname.isDirectory()
                                                      || pathname.getName().endsWith("mkv")
                                                      || pathname.getName().endsWith("avi");


    private static Set<File> movies;

    public static List<MovieFileTo> getMoviesFromFolder(String dirPath) {
        movies = new TreeSet<>();
        getRecursivelyFilesFromFolder(dirPath);
        return movies.stream()
                .map(convertToOptionalMovieFileTo())
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
    }

    private static void getRecursivelyFilesFromFolder(String dirPath) {
        File[] files = (new File(dirPath)).listFiles(filter);
        if (files != null) {
            for (File file : files) {
                if (file.isFile()) {
                    movies.add(file);
                } else if (file.isDirectory()) {
                    getRecursivelyFilesFromFolder(file.getAbsolutePath());
                }
            }
        }
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
