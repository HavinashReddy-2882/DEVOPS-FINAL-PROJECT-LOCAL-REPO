package com.klef.fsd.sdp.hotelhub.controller;

import com.klef.fsd.sdp.hotelhub.model.*;
import com.klef.fsd.sdp.hotelhub.service.CustomerServiceImpl; // Import IMPL to access new methods
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/customer") @CrossOrigin("*")
public class CustomerController {
    @Autowired private CustomerServiceImpl customerService; // Change type to Impl to avoid casting

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Customer c) {
        try { customerService.registerCustomer(c); return ResponseEntity.ok("Registered!"); }
        catch (Exception e) { return ResponseEntity.status(HttpStatus.CONFLICT).body("Error registering."); }
    }
    
    // Auth & Profile
    @PostMapping("/checkcustomerlogin") public ResponseEntity<?> checkLogin(@RequestBody Customer c) {
        Customer res = customerService.checkCustomerLogin(c.getUsername(), c.getPassword());
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.status(401).body("Invalid");
    }
    @PostMapping("/profile/update") public ResponseEntity<Customer> updateProfile(@RequestBody Customer c) {
        return ResponseEntity.ok(customerService.updateProfile(c));
    }

    // Room Booking
    @PostMapping("/bookroom") public Booking bookRoom(@RequestBody Booking b) { return customerService.bookRoom(b); }
    @PostMapping("/updatebooking") public Booking updateBooking(@RequestBody Booking b) { return customerService.updateBooking(b); }
    @GetMapping("/viewmybookings/{id}") public List<Booking> viewBookings(@PathVariable int id) { return customerService.viewMyBookings(id); }
    @GetMapping("/rooms") public List<Room> viewRooms() { return customerService.viewAllAvailableRooms(); }

    // Viewing Features
    @GetMapping("/viewfoodmenu") public List<FoodItem> viewFood() { return customerService.viewAllFoodItems(); }
    @GetMapping("/viewcabs") public List<Cab> viewCabs() { return customerService.viewAvailableCabs(); }

    // 👇 NEW: Cab Booking Endpoints
    @PostMapping("/bookcab")
    public CabBooking bookCab(@RequestBody CabBooking booking) {
        return customerService.bookCab(booking);
    }

    @GetMapping("/mycabbookings/{id}")
    public List<CabBooking> myCabs(@PathVariable int id) {
        return customerService.viewMyCabBookings(id);
    }
}