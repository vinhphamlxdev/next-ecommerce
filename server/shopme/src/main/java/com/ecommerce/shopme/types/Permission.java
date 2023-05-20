package com.ecommerce.shopme.types;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public enum Permission {
    ADMIN("ADMIN");

    @Getter
    private final String permission;
}
