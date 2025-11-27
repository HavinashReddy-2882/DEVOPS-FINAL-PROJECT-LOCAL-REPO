package com.klef.fsd.sdp.hotelhub.service;

import com.klef.fsd.sdp.hotelhub.model.*;
import com.klef.fsd.sdp.hotelhub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ManagerServiceImpl implements ManagerService {

    @Autowired private ManagerRepository managerRepository;
    @Autowired private RoomRepository roomRepository;
    @Autowired private BookingRepository bookingRepository;
    @Autowired private FoodItemRepository foodItemRepository;
    @Autowired private CabRepository cabRepository;
    @Autowired private CabBookingRepository cabBookingRepository;

    @Override public Manager checkManagerLogin(String u, String p) { return managerRepository.findByUsernameAndPassword(u, p); }

    // 👇 UPDATED: Safer Add Room Logic
    @Override 
    public String addRoom(Room room, int managerId) { 
        Manager m = managerRepository.findById(managerId).orElse(null);
        if (m != null) {
            room.setManager(m); // Set the fully loaded manager object
            roomRepository.save(room);
            return "Room added successfully.";
        }
        throw new RuntimeException("Manager not found");
    }

    @Override 
    public String updateRoom(Room room) { 
        // For update, we rely on the existing room ID, but we re-fetch manager to be safe
        if (room.getManager() != null) {
            Manager m = managerRepository.findById(room.getManager().getId()).orElse(null);
            if(m != null) {
                room.setManager(m);
                roomRepository.save(room);
                return "Updated.";
            }
        }
        return "Error updating.";
    }

    @Override public String deleteRoom(int id) { roomRepository.deleteById(id); return "Deleted."; }
    @Override public List<Room> viewAllRoomsByManager(int id) { return roomRepository.findByManagerId(id); }
    @Override public Room getRoomById(int id) { return roomRepository.findById(id).orElse(null); }
    @Override public List<Booking> viewBookingsForManager(int id) { return bookingRepository.findByManagerId(id); }

    // Food
    public FoodItem addFoodItem(FoodItem item) { return foodItemRepository.save(item); }
    public List<FoodItem> viewFoodMenu(int mid) { return foodItemRepository.findByManagerId(mid); }
    public void deleteFoodItem(int id) { foodItemRepository.deleteById(id); }

    // Cab
    public Cab addCab(Cab cab) { return cabRepository.save(cab); }
    public List<Cab> viewMyCabs(int mid) { return cabRepository.findByManagerId(mid); }
    public void deleteCab(int id) { cabRepository.deleteById(id); }

    // Cab Requests
    public List<CabBooking> viewCabRequests(int mid) { return cabBookingRepository.findByManagerId(mid); }
    public String updateCabStatus(int id, String status) {
        CabBooking cb = cabBookingRepository.findById(id).orElse(null);
        if(cb!=null) { cb.setStatus(status); cabBookingRepository.save(cb); return "Updated"; }
        return "Error";
    }
}