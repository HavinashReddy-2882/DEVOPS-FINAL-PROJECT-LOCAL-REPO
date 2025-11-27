package com.klef.fsd.sdp.hotelhub.service;

import com.klef.fsd.sdp.hotelhub.model.*;
import java.util.List;

public interface CustomerService {
    Customer checkCustomerLogin(String username, String password);
    Customer registerCustomer(Customer customer);
    
    // Booking
    Booking bookRoom(Booking booking);
    Booking updateBooking(Booking booking);
    List<Booking> viewMyBookings(int customerId);
    
    // Viewing
    List<Room> viewAllAvailableRooms();
    Customer updateProfile(Customer customer);
    
    // New Features
    List<FoodItem> viewAllFoodItems();
    List<Cab> viewAvailableCabs();
}