package com.blaec.movielibrary.controllers;

import com.blaec.movielibrary.utils.PermissionMonitor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping(MonitorController.URL)
@RestController
public class MonitorController extends AbstractController {
    public static final String URL = API_VERSION + "/monitor";

    @GetMapping("/has-unauthorized-access")
    public ResponseEntity<Boolean> hasUnauthorizedAccess() {
        return ResponseEntity.ok(PermissionMonitor.isAlert());
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("ok");
    }
}
