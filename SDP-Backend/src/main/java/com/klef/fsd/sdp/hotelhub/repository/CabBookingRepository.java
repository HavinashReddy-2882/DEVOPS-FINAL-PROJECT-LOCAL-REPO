package com.klef.fsd.sdp.hotelhub.repository;

import com.klef.fsd.sdp.hotelhub.model.CabBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface CabBookingRepository extends JpaRepository<CabBooking, Integer> {
    List<CabBooking> findByCustomerId(int customerId);
    
    // Find booking requests for a specific manager's cabs
    @Query("SELECT cb FROM CabBooking cb WHERE cb.cab.manager.id = ?1")
    List<CabBooking> findByManagerId(int managerId);
}