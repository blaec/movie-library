package com.blaec.movielibrary.repository.implementations;

import com.blaec.movielibrary.model.Request;
import org.springframework.data.repository.CrudRepository;

public interface CrudRequestRepository extends CrudRepository<Request, Integer> {
}
