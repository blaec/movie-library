package com.blaec.movielibrary.repository.implementations;

import com.blaec.movielibrary.model.Request;
import com.blaec.movielibrary.repository.RequestRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Slf4j
@AllArgsConstructor
@Repository
public class RequestRepositoryImpl implements RequestRepository {
    private final CrudRequestRepository crudRequestRepository;
    @Override
    public Optional<Request> save(Request request) {
        return Optional.of(crudRequestRepository.save(request));
    }
}
