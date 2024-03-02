package com.blaec.movielibrary.model.to;

import com.blaec.movielibrary.configs.AccessControl;
import com.blaec.movielibrary.controllers.MonitorController;
import com.google.common.collect.ImmutableList;
import lombok.*;

import java.util.List;

@Getter
@Setter(AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class HttpRequestValidator {
    private boolean isIpAllowed;
    private boolean isWriteMethod;
    private AccessControl accessControl;

    private static final List<String> writeMethods = ImmutableList.of("POST", "DELETE", "PUT");
    private final List<String> allowedUrls = ImmutableList.of(MonitorController.URL);

    public static HttpRequestValidator of(HttpRequestTo httpRequest, AccessControl accessControl) {
        HttpRequestValidator httpRequestValidator = new HttpRequestValidator();
        httpRequestValidator.setAccessControl(accessControl);
        httpRequestValidator.setIpAllowed(httpRequestValidator.isIpAllowed(httpRequest));
        httpRequestValidator.setWriteMethod(writeMethods.contains(httpRequest.getMethod()));

        return httpRequestValidator;
    }

    private boolean isIpAllowed(HttpRequestTo httpRequest) {
        return httpRequest.isBot()
                || isLocal(httpRequest.getIp())
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

    public boolean isActionAllowed() {
        return isIpAllowed || !isWriteMethod;
    }
}
