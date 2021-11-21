package com.blaec.movielibrary.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class TestUtils {

    public static boolean isJUnitTest() {
        for (StackTraceElement element : Thread.currentThread().getStackTrace()) {
            if (element.getClassName().startsWith("org.junit.")) {
                return true;
            }
        }
        return false;
    }
}
