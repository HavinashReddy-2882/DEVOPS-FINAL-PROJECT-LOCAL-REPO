package com.klef.fsd.sdp.hotelhub.repository;
import com.klef.fsd.sdp.hotelhub.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FoodItemRepository extends JpaRepository<FoodItem, Integer> {
    List<FoodItem> findByManagerId(int managerId);
}