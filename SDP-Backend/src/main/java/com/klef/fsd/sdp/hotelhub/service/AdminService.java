package com.klef.fsd.sdp.hotelhub.service;

import com.klef.fsd.sdp.hotelhub.model.Admin;
import com.klef.fsd.sdp.hotelhub.model.Customer;
import com.klef.fsd.sdp.hotelhub.model.Manager;
import java.util.List;

public interface AdminService {
    Admin checkAdminLogin(String username, String password);
    
    // 👇 CHANGE RETURN TYPE TO MANAGER
    Manager addManager(Manager manager);
    
    String deleteManager(int managerId);
    List<Manager> viewAllManagers();
    
    // Customer Management
    List<Customer> viewAllCustomers();
    String deleteCustomer(int customerId);
    
    // Counts
    long getManagersCount();
    long getCustomersCount();
}