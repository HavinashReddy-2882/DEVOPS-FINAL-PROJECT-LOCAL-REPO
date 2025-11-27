package com.klef.fsd.sdp.hotelhub.repository;

import com.klef.fsd.sdp.hotelhub.model.Room;
import jakarta.transaction.Transactional; // 👈 Import Transactional
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying; // 👈 Import Modifying
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    @Query("SELECT r FROM Room r WHERE r.manager.id = ?1")
    List<Room> findByManagerId(int managerId);
    
    List<Room> findByAvailableTrue();

    // 👇 ADD THIS NEW METHOD
    @Modifying
    @Transactional
    @Query("UPDATE Room r SET r.available = ?1 WHERE r.id = ?2")
    void updateRoomAvailability(boolean available, int roomId);
}