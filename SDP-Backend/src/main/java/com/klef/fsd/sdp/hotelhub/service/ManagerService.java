package com.klef.fsd.sdp.hotelhub.service;

import com.klef.fsd.sdp.hotelhub.model.*;
import java.util.List;

public interface ManagerService {
    Manager checkManagerLogin(String username, String password);
    
    // 👇 UPDATED: Now accepts managerId separately
    String addRoom(Room room, int managerId);
    
    String updateRoom(Room room);
    String deleteRoom(int roomId);
    List<Room> viewAllRoomsByManager(int managerId);
    Room getRoomById(int roomId);
    
    List<Booking> viewBookingsForManager(int managerId);

    FoodItem addFoodItem(FoodItem foodItem);
    List<FoodItem> viewFoodMenu(int managerId);
    void deleteFoodItem(int id);

    Cab addCab(Cab cab);
    List<Cab> viewMyCabs(int managerId);
    void deleteCab(int id);
    
    List<CabBooking> viewCabRequests(int managerId);
    String updateCabStatus(int bookingId, String status);
}