package com.klef.fsd.sdp.hotelhub.repository;

import com.klef.fsd.sdp.hotelhub.model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Integer> {
    Manager findByUsernameAndPassword(String username, String password);
}