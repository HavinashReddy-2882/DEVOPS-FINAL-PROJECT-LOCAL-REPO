package com.klef.fsd.sdp.hotelhub.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "cab_booking_table")
public class CabBooking {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne @JoinColumn(name = "cab_id")
    private Cab cab;

    private LocalDate bookingDate;
    private String status; // "PENDING", "ON_THE_WAY", "COMPLETED"

    // Getters and Setters
    public int getId() { return id; } public void setId(int id) { this.id = id; }
    public Customer getCustomer() { return customer; } public void setCustomer(Customer customer) { this.customer = customer; }
    public Cab getCab() { return cab; } public void setCab(Cab cab) { this.cab = cab; }
    public LocalDate getBookingDate() { return bookingDate; } public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }
    public String getStatus() { return status; } public void setStatus(String status) { this.status = status; }
}