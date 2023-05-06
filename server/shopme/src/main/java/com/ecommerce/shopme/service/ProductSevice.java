package com.ecommerce.shopme.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.shopme.DTO.ProductDTO;
import com.ecommerce.shopme.Entity.Product;
import com.ecommerce.shopme.exception.ProductNotFoundException;
import com.ecommerce.shopme.repository.ProductRepository;


import jakarta.transaction.Transactional;
@Service
@Transactional
public class ProductSevice {
    @Autowired
    private ProductRepository productRepository;
    
    public List<Product> listAll(){
        return productRepository.findAll();
    }
    public Optional<Product> getProductById(Integer id){
        return productRepository.findById(id);
    }
    public Product saveProduct(Product product){
        return productRepository.save(product);
    }
   public void deleteProduct(Integer id){
    productRepository.deleteById(id);
   }
//    public List<ProductDTO> getAllProductDTOs() {
//     List<Product> products = productRepository.findAll();
//     List<ProductDTO> productDTOs = new ArrayList<>();
//     for (Product product : products) {
//         ProductDTO productDTO = new ProductDTO();
//         BeanUtils.copyProperties(product, productDTO);
//         List<String> imageUrls = product.getImages().stream()
//                 .map(FileUpload::getImageUrl)
//                 .collect(Collectors.toList());
//         productDTO.setImageUrls(imageUrls);
//         productDTO.setCategoryName(product.getCategory().getName());
//         productDTOs.add(productDTO);
//     }
//     return productDTOs;
// }


    
}
