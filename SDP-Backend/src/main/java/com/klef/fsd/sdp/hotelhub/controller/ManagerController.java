package com.klef.fsd.sdp.hotelhub.controller;

import com.klef.fsd.sdp.hotelhub.model.*;
import com.klef.fsd.sdp.hotelhub.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/manager") @CrossOrigin("*")
public class ManagerController {
    @Autowired private ManagerService managerService;

    @PostMapping("/checkmanagerlogin") public ResponseEntity<?> login(@RequestBody Manager m) {
        Manager res = managerService.checkManagerLogin(m.getUsername(), m.getPassword());
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.status(401).body("Invalid");
    }

    // 👇 UPDATED ENDPOINT: Accepts Manager ID in URL
    @PostMapping("/addroom/{managerId}") 
    public String addRoom(@RequestBody Room r, @PathVariable int managerId) { 
        return managerService.addRoom(r, managerId); 
    }

    @PostMapping("/updateroom") public String updateRoom(@RequestBody Room r) { return managerService.updateRoom(r); }
    @DeleteMapping("/deleteroom/{id}") public String deleteRoom(@PathVariable int id) { return managerService.deleteRoom(id); }
    @GetMapping("/viewmyrooms/{id}") public List<Room> viewRooms(@PathVariable int id) { return managerService.viewAllRoomsByManager(id); }
    @GetMapping("/viewbookings/{id}") public List<Booking> viewBookings(@PathVariable int id) { return managerService.viewBookingsForManager(id); }

    // Food
    @PostMapping("/addfood") public String addFood(@RequestBody FoodItem f) { managerService.addFoodItem(f); return "Added"; }
    @GetMapping("/viewfood/{id}") public List<FoodItem> viewFood(@PathVariable int id) { return managerService.viewFoodMenu(id); }
    @DeleteMapping("/deletefood/{id}") public String deleteFood(@PathVariable int id) { managerService.deleteFoodItem(id); return "Deleted"; }

    // Cabs
    @PostMapping("/addcab") public String addCab(@RequestBody Cab c) { managerService.addCab(c); return "Added"; }
    @GetMapping("/viewcabs/{id}") public List<Cab> viewCabs(@PathVariable int id) { return managerService.viewMyCabs(id); }
    @DeleteMapping("/deletecab/{id}") public String deleteCab(@PathVariable int id) { managerService.deleteCab(id); return "Deleted"; }

    @GetMapping("/cabrequests/{id}") public List<CabBooking> reqs(@PathVariable int id) { return managerService.viewCabRequests(id); }
    @GetMapping("/updatecabstatus/{id}/{status}") public String upC(@PathVariable int id, @PathVariable String status) { return managerService.updateCabStatus(id, status); }
}