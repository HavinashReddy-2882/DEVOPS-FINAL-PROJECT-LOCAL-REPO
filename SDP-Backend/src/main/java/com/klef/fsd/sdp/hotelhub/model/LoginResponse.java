package com.klef.fsd.sdp.hotelhub.model;

public class LoginResponse {
    private String role;      // "ADMIN", "MANAGER", "CUSTOMER"
    private Object userData;  // The user object

    public LoginResponse(String role, Object userData) {
        this.role = role;
        this.userData = userData;
    }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Object getUserData() { return userData; }
    public void setUserData(Object userData) { this.userData = userData; }
}