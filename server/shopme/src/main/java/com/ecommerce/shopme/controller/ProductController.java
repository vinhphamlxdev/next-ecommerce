package com.ecommerce.shopme.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.shopme.DTO.ProductDTO;
import com.ecommerce.shopme.Entity.Category;
import com.ecommerce.shopme.Entity.Product;
import com.ecommerce.shopme.exception.ProductNotFoundException;
import com.ecommerce.shopme.service.FileUploadService;
import com.ecommerce.shopme.service.ProductSevice;


@RestController
public class ProductController {
    @Autowired 
    ProductSevice productSevice;
    @Autowired
    FileUploadService fileUploadService;
    //GET
  
    @GetMapping("/products")
    public ResponseEntity<Page<Product>> getAll(@RequestParam(defaultValue = "0") int pageNum,
    @RequestParam(defaultValue = "3") int pageSize){
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        Page<Product> products = productSevice.listAll(pageable);
        return ResponseEntity.ok(products);

    }


    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id){
        Product product = productSevice.getProductById(id);
        if (product!=null) {
            return ResponseEntity.ok(product);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    // POST
    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        Product createdProduct = productSevice.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    //PUT
    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product updateProduct){
        Product product = productSevice.getProductById(id);
        if (product!=null) {
            //update info product
            product.setName(updateProduct.getName());
            product.setPrice(updateProduct.getPrice());
            //save product
            productSevice.saveProduct(product);
            return ResponseEntity.ok(product);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
  //DELETE
  @DeleteMapping("/products/{id}")
  public void deleteProduct(@PathVariable Integer id){
    productSevice.deleteProduct(id);
  }

}
