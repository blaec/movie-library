package com.blaec.movielibrary.interceptors;

import com.blaec.movielibrary.configs.AccessControl;
import com.blaec.movielibrary.model.Request;
import com.blaec.movielibrary.model.to.HttpRequestTo;
import com.blaec.movielibrary.model.to.HttpRequestValidator;
import com.blaec.movielibrary.services.RequestService;
import com.blaec.movielibrary.utils.PermissionMonitor;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@AllArgsConstructor
@Component
public class RequestInterceptor implements HandlerInterceptor {
    private AccessControl accessControl;
    private RequestService requestService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        HttpRequestTo httpRequestTo = HttpRequestTo.from(request);
        HttpRequestValidator httpRequestValidator = HttpRequestValidator.of(httpRequestTo, accessControl);

        final boolean isIpAllowed = httpRequestValidator.isIpAllowed();
        PermissionMonitor.enqueue(isIpAllowed);
        boolean isActionAllowed = httpRequestValidator.isActionAllowed();
        if (!isIpAllowed || httpRequestValidator.isWriteMethod()) {
            log.debug("{} and action is {}",
                    httpRequestTo, isActionAllowed ? "allowed" : "denied");
            if (!isActionAllowed) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("Action forbidden");
            }
        }

        Request httpRequest = Request.of(httpRequestTo, httpRequestValidator);
        if (!requestService.save(httpRequest)) {
            log.warn("failed to save request {}", request);
        }

        return isActionAllowed;
    }
}
