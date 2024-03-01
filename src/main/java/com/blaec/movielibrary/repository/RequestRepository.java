package com.blaec.movielibrary.repository;

import com.blaec.movielibrary.model.Request;

import java.util.Optional;

public interface RequestRepository {
    Optional<Request> save(Request request);
}
