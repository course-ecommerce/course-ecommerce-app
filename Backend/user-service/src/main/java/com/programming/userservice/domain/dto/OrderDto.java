package com.programming.userservice.domain.dto;

import com.programming.userservice.domain.persistent.enumrate.OrderStatus;
import com.programming.userservice.domain.persistent.enumrate.ShippingMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private String id;
    private Double totalPrice;
    private OrderStatus orderStatus;
    private ShippingMethod shippingMethod;
    List<OrderItemDto> orderItems;
    private UserDto user;
}
