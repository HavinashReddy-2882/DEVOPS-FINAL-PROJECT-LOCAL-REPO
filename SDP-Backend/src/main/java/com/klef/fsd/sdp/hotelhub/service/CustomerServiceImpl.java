package com.klef.fsd.sdp.hotelhub.service;

import com.klef.fsd.sdp.hotelhub.model.*;
import com.klef.fsd.sdp.hotelhub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired private CustomerRepository customerRepository;
    @Autowired private BookingRepository bookingRepository;
    @Autowired private RoomRepository roomRepository;
    @Autowired private FoodItemRepository foodItemRepository;
    @Autowired private CabRepository cabRepository;
    @Autowired private CabBookingRepository cabBookingRepository; // 👈 New Repo

    // Auth
    @Override public Customer checkCustomerLogin(String u, String p) { return customerRepository.findByUsernameAndPassword(u, p); }
    @Override public Customer registerCustomer(Customer c) { return customerRepository.save(c); }
    
    // Room Booking
    @Override @Transactional public Booking bookRoom(Booking booking) {
        Booking saved = bookingRepository.save(booking);
        if(saved.getRoom() != null) roomRepository.updateRoomAvailability(false, saved.getRoom().getId());
        return saved;
    }
    @Override public Booking updateBooking(Booking booking) { return bookingRepository.save(booking); }
    @Override public List<Booking> viewMyBookings(int cid) { return bookingRepository.findByCustomerId(cid); }
    @Override public List<Room> viewAllAvailableRooms() { return roomRepository.findByAvailableTrue(); }
    
    // Profile
    @Override @Transactional public Customer updateProfile(Customer c) {
        Customer existing = customerRepository.findById(c.getId()).orElse(null);
        if (existing != null) {
            existing.setName(c.getName()); existing.setDob(c.getDob());
            existing.setAddress(c.getAddress()); existing.setContact(c.getContact());
            if (c.getPassword() != null && !c.getPassword().isEmpty()) existing.setPassword(c.getPassword());
            return customerRepository.save(existing);
        }
        return null;
    }

    // View Features
    public List<FoodItem> viewAllFoodItems() { return foodItemRepository.findAll(); }
    public List<Cab> viewAvailableCabs() { return cabRepository.findByAvailableTrue(); }

    // 👇 NEW: Cab Booking Logic
    public CabBooking bookCab(CabBooking booking) {
        booking.setBookingDate(java.time.LocalDate.now());
        booking.setStatus("PENDING");
        return cabBookingRepository.save(booking);
    }

    public List<CabBooking> viewMyCabBookings(int customerId) {
        return cabBookingRepository.findByCustomerId(customerId);
    }
}