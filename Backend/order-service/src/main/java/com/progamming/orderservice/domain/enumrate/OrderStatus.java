package com.progamming.orderservice.domain.enumrate;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderStatus {
    CANCELED("Canceled"),
    PAID("Paid"),
    UNPAID("Unpaid");
    private final String value;
}
