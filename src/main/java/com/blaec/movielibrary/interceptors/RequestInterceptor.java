package com.blaec.movielibrary.interceptors;

import com.blaec.movielibrary.configs.AccessControl;
import com.google.common.collect.ImmutableList;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Slf4j
@AllArgsConstructor
@Component
public class RequestInterceptor implements HandlerInterceptor {
    private AccessControl accessControl;
    private final List<String> methodsToLog = ImmutableList.of("POST", "DELETE", "PUT");

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String httpMethod = request.getMethod();
//        if (methodsToLog.contains(httpMethod)) {
        String ip = request.getRemoteAddr();
        log.debug("From ip {} received {} request to url: {}",
                ip, httpMethod, request.getRequestURL());
//        }

        if (isLocal(ip) || isExternal(ip)) {
            log.debug("Access allowed.");
        } else {
            log.debug("Access denied.");
        }

        return true;
    }

    private boolean isLocal(String ipAddress) {
        return ipAddress.startsWith(accessControl.getLocalSubnet());
    }

    private boolean isExternal(String ipAddress) {
        return accessControl.getExternalIps().contains(ipAddress);
    }
}
