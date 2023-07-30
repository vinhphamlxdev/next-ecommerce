package com.ecommerce.shopme.utils;

import org.apache.commons.lang3.StringUtils;

public class SlugUtils {
    public static String createSlug(String input) {
        if (input == null || input.isEmpty()) {
            return "";
        }
        // Xóa các ký tự đặc biệt, thay thế khoảng trắng bằng dấu gạch ngang
        String slug = StringUtils.stripAccents(input)
                .replaceAll("[^\\p{Alnum}]+", "-")
                .toLowerCase();
        // Xóa các dấu gạch ngang kép
        slug = slug.replaceAll("-{2,}", "-");
        // Xóa dấu gạch ngang ở đầu và cuối chuỗi
        slug = StringUtils.strip(slug, "-");
        return slug;
    }
}
