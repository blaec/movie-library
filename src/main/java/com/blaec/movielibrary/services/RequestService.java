package com.blaec.movielibrary.services;

import com.blaec.movielibrary.model.Request;
import org.springframework.transaction.annotation.Transactional;

public interface RequestService {
    @Transactional
    boolean save(Request request);
}
