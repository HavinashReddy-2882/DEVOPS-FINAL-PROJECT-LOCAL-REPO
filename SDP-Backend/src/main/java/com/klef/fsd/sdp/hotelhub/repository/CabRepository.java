package com.klef.fsd.sdp.hotelhub.repository;
import com.klef.fsd.sdp.hotelhub.model.Cab;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CabRepository extends JpaRepository<Cab, Integer> {
    List<Cab> findByManagerId(int managerId);
    List<Cab> findByAvailableTrue();
}