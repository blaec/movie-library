package com.blaec.movielibrary.interceptors;

import com.blaec.movielibrary.configs.AccessControl;
import com.blaec.movielibrary.controllers.MonitorController;
import com.blaec.movielibrary.model.Request;
import com.blaec.movielibrary.services.RequestService;
import com.blaec.movielibrary.utils.PermissionMonitor;
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
    private RequestService requestService;
    private final List<String> writeMethods = ImmutableList.of("POST", "DELETE", "PUT");
    private final List<String> allowedUrls = ImmutableList.of(MonitorController.URL, "/favicon.ico", "/error");

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        Request httpRequest = Request.from(request);
        if (!requestService.save(httpRequest)) {
            log.warn("failed to save request {}", request);
        }
        final boolean isIpAllowed = isIpAllowed(httpRequest);
        PermissionMonitor.enqueue(isIpAllowed);
        final boolean isWriteMethod = writeMethods.contains(httpRequest.getMethod());
        boolean isActionAllowed = isIpAllowed || !isWriteMethod;
        if (!isIpAllowed || isWriteMethod) {
            log.debug("From ip {} received {} request to url: {} and action is {}",
                    httpRequest.getId(), httpRequest.getMethod(), httpRequest.getUrl(), isActionAllowed ? "allowed" : "denied");
            if (!isActionAllowed) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("Action forbidden");
            }
        }

        return isActionAllowed;
    }

    private boolean isIpAllowed(Request httpRequest) {
        return isLocal(httpRequest.getIp())
                || isExternal(httpRequest.getIp())
                || isMonitor(httpRequest.getUrl());
    }

    private boolean isLocal(String ipAddress) {
        return ipAddress.startsWith(accessControl.getLocalSubnet());
    }

    private boolean isExternal(String ipAddress) {
        return accessControl.getExternalIps().contains(ipAddress);
    }

    private boolean isMonitor(String url) {
        return allowedUrls.stream().anyMatch(url::contains);
    }
}
