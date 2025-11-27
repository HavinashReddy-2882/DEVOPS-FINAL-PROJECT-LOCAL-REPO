package com.klef.fsd.sdp.hotelhub.repository;

import com.klef.fsd.sdp.hotelhub.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Customer findByUsernameAndPassword(String username, String password);
}