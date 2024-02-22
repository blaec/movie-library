package com.blaec.movielibrary.interceptors;

import com.google.common.collect.ImmutableList;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Slf4j
public class RequestInterceptor implements HandlerInterceptor {
    private final List<String> methodsToLog = ImmutableList.of("POST", "DELETE", "PUT");

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String httpMethod = request.getMethod();
        if (methodsToLog.contains(httpMethod)) {
            log.debug("From ip {} received {} request to url: {}",
                    request.getRemoteAddr(), httpMethod, request.getRequestURL());
        }

        return true;
    }
}
