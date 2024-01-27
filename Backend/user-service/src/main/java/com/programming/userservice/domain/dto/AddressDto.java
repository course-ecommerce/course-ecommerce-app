package com.programming.userservice.domain.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {

    private String addressLine;

    private String postalCode;

    private boolean defaultAddress;

    private String provinceName;

    private String provinceNameEn;

    private String districtName;

    private String districtNameEn;

    private String wardName;

    private String wardNameEn;
}
