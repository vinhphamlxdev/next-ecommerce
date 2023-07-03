package com.ecommerce.shopme.dto;

import org.hibernate.validator.constraints.Length;

import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
public class SizeDTO {
    @Length(min = 1,max = 3, message = "Tên size tối thiểu 1 kí tự và tối đa là 3 kí tự")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
}
