package com.blaec.movielibrary.interceptors;

import com.blaec.movielibrary.configs.AccessControl;
import com.google.common.collect.ImmutableList;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
@AllArgsConstructor
@Component
public class RequestInterceptor implements HandlerInterceptor {
    private AccessControl accessControl;
    private final List<String> methodsToLog = ImmutableList.of("POST", "DELETE", "PUT");

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        boolean isActionAllowed = true;
        String httpMethod = request.getMethod();
        String ip = request.getRemoteAddr();
        if (methodsToLog.contains(httpMethod)) {
            isActionAllowed = isLocal(ip) || isExternal(ip);
            log.debug("From ip {} received {} request to url: {} and action is {}",
                    ip, httpMethod, request.getRequestURL(), isActionAllowed ? "allowed" : "denied");
            if (!isActionAllowed) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("Action forbidden");
            }
        }

        return isActionAllowed;
    }

    private boolean isLocal(String ipAddress) {
        return ipAddress.startsWith(accessControl.getLocalSubnet());
    }

    private boolean isExternal(String ipAddress) {
        return accessControl.getExternalIps().contains(ipAddress);
    }
}
