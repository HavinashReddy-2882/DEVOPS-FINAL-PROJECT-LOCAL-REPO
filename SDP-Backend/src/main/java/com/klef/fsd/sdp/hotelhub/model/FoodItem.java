package com.klef.fsd.sdp.hotelhub.model;

import jakarta.persistence.*;

@Entity
@Table(name = "food_item_table")
public class FoodItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String category;
    private double price;
    private String type; // Veg/Non-Veg
    
    @ManyToOne @JoinColumn(name = "manager_id")
    private Manager manager;

    // Getters and Setters
    public int getId() { return id; } public void setId(int id) { this.id = id; }
    public String getName() { return name; } public void setName(String name) { this.name = name; }
    public String getCategory() { return category; } public void setCategory(String category) { this.category = category; }
    public double getPrice() { return price; } public void setPrice(double price) { this.price = price; }
    public String getType() { return type; } public void setType(String type) { this.type = type; }
    public Manager getManager() { return manager; } public void setManager(Manager manager) { this.manager = manager; }
}