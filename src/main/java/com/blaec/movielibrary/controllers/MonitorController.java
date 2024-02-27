package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.utils.PermissionMonitor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping(MonitorController.URL)
@RestController
public class MonitorController extends AbstractController {
    static final String URL = API_VERSION + "/monitor";
    public static final String HAS_UNAUTHORIZED_ACCESS = "/has-unauthorized-access";

    @GetMapping(HAS_UNAUTHORIZED_ACCESS)
    public boolean getConfigs() {
        return PermissionMonitor.isAlert();
    }
}
