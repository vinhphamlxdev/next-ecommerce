package com.ecommerce.shopme.product;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.repository.ColorRepository;
import com.ecommerce.shopme.repository.ProductRepository;

@SpringBootTest
public class ProductRepositoryTest {
     @Autowired
    private ProductRepository productRepository;
    @Autowired
    ColorRepository colorRepository;


   
    @Test
    public void testFindProductsByColorName() {
        String colorName = "blue";
        Page<Product> productPage = colorRepository.findProductsByColorName(colorName, PageRequest.of(0, 10));
        
        // Assertions
        assertEquals(10, productPage.getSize()); // Check page size
        assertEquals(colorName, productPage.getContent().get(0).getColors().get(0).getColorName()); // Check color name
        
        // ... Other assertions or tests
    }
}
