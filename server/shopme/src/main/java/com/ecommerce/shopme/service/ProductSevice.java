package com.ecommerce.shopme.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.ecommerce.shopme.DTO.ProductDetail;
import com.ecommerce.shopme.Entity.Product;
import com.ecommerce.shopme.exception.ProductNotFoundException;
import com.ecommerce.shopme.repository.ProductRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class ProductSevice {
    @Autowired
    private ProductRepository productRepository;
    
    public Page<Product> listAll(Pageable pageable) {
      
        if (pageable.isPaged()) {
            return productRepository.findAll(pageable);
        } else {
            List<Product> allProducts = productRepository.findAll(Pageable.unpaged()).getContent();
            return new PageImpl<>(allProducts);
        }
    }
    //get product by id
    public Product getProductById(Integer id) {
        return productRepository.findById(id);
    }
    //save product
    public Product saveProduct(Product product){
       return productRepository.save(product);
    }
    //delete product by id
   public void deleteProductById(Integer id){
    productRepository.deleteById(id);
   }
//kiem tra ton tai
public boolean existsProductById(Integer id){
    return productRepository.existsById(id);
}

    
}
