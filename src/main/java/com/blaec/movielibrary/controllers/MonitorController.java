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
    public static final String URL = API_VERSION + "/monitor";

    @GetMapping("/has-unauthorized-access")
    public boolean getConfigs() {
        return PermissionMonitor.isAlert();
    }
}
