package com.klef.fsd.sdp.hotelhub.repository;

import com.klef.fsd.sdp.hotelhub.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    @Query("SELECT b FROM Booking b WHERE b.customer.id = ?1")
    List<Booking> findByCustomerId(int customerId);
    
    @Query("SELECT b FROM Booking b WHERE b.room.manager.id = ?1")
    List<Booking> findByManagerId(int managerId);
}