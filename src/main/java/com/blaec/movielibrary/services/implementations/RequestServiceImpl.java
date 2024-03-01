package com.blaec.movielibrary.services.implementations;

import com.blaec.movielibrary.model.Request;
import com.blaec.movielibrary.repository.RequestRepository;
import com.blaec.movielibrary.services.RequestService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@AllArgsConstructor
@Service
public class RequestServiceImpl implements RequestService {
    private final RequestRepository requestRepository;
    @Override
    public boolean save(Request request) {
        return requestRepository.save(request).isPresent();
    }
}
