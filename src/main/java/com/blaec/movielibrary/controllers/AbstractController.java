package com.blaec.movielibrary.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
public abstract class AbstractController {
    protected static final String API_VERSION = "/api/v1";
}
