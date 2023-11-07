package com.programming.userservice.domain.persistent.entity;

import com.main.progamming.common.model.BaseModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Table(
        name = "address"
)
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString(callSuper = true)
@SuperBuilder(toBuilder = true)
public class Address extends BaseModel {
    @Column(name = "address_line", length = 255)
    private String addressLine;
    @Column(name = "postal_code", length = 16)
    private String postalCode;
    @Column(name = "default_address", columnDefinition = "bit default 0 not null")
    private boolean defaultAddress;
}
