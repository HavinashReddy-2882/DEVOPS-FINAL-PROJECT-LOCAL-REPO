package com.klef.fsd.sdp.hotelhub.controller;

import com.klef.fsd.sdp.hotelhub.model.*;
import com.klef.fsd.sdp.hotelhub.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/admin") @CrossOrigin("*")
public class AdminController {
    @Autowired private AdminService adminService;
    @Autowired private ManagerService managerService;
    @Autowired private CustomerService customerService;

    // --- SMART LOGIN ENDPOINT ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin req) {
        String u = req.getUsername(); String p = req.getPassword();
        
        Admin a = adminService.checkAdminLogin(u, p);
        if(a!=null) return ResponseEntity.ok(new LoginResponse("ADMIN", a));
        
        Manager m = managerService.checkManagerLogin(u, p);
        if(m!=null) return ResponseEntity.ok(new LoginResponse("MANAGER", m));
        
        Customer c = customerService.checkCustomerLogin(u, p);
        if(c!=null) return ResponseEntity.ok(new LoginResponse("CUSTOMER", c));
        
        return ResponseEntity.status(401).body("Invalid Credentials");
    }

    @PostMapping("/addmanager") public Manager addManager(@RequestBody Manager m) { return adminService.addManager(m); }
    @GetMapping("/viewallmanagers") public List<Manager> viewManagers() { return adminService.viewAllManagers(); }
    @DeleteMapping("/deletemanager/{id}") public String deleteManager(@PathVariable int id) { return adminService.deleteManager(id); }
    @GetMapping("/viewallcustomers") public List<Customer> viewCustomers() { return adminService.viewAllCustomers(); }
    @DeleteMapping("/deletecustomer/{id}") public String deleteCustomer(@PathVariable int id) { return adminService.deleteCustomer(id); }
    @GetMapping("/managerscount") public long mCount() { return adminService.getManagersCount(); }
    @GetMapping("/customerscount") public long cCount() { return adminService.getCustomersCount(); }
}