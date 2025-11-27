package com.klef.fsd.sdp.hotelhub.model;

import jakarta.persistence.*;

@Entity
@Table(name = "room_table")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = false)
    private Manager manager;

    @Column(nullable = false)
    private String roomNumber;
    
    @Column(nullable = false)
    private String type; // e.g., Single, Double, Suite
    
    @Column(nullable = false)
    private double pricePerNight;

    // 👇 UPDATED: Explicit column name and Default value = true
    @Column(name = "is_available", nullable = false)
    private boolean available = true;

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public Manager getManager() { return manager; }
    public void setManager(Manager manager) { this.manager = manager; }
    
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public double getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(double pricePerNight) { this.pricePerNight = pricePerNight; }
    
    // Standard getter for boolean is 'isAvailable'
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}