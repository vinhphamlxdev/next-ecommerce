package com.ecommerce.shopme.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
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
import com.ecommerce.shopme.Entity.Product;
import com.ecommerce.shopme.exception.ProductNotFoundException;
import com.ecommerce.shopme.service.FileUploadService;
import com.ecommerce.shopme.service.ProductSevice;

import jakarta.validation.Valid;

@RestController
public class ProductController {
    @Autowired 
    ProductSevice productSevice;
    @Autowired
    FileUploadService fileUploadService;
    //GET
    @GetMapping("/products")
    public List<ProductDTO> listAllProduct(){
        List<Product> products = productSevice.listAll();
        List<ProductDTO> productDTOs = new ArrayList<>();
    
        for (Product product : products) {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(product.getId());
            productDTO.setName(product.getName());
            productDTO.setDescription(product.getDescription());
            productDTO.setPrice(product.getPrice());
            productDTO.setQuantity(product.getQuantity());
            productDTO.setInStock(product.isInStock());
            productDTO.setDeleted(product.isDeleted());
            productDTO.setImageUrls(product.getImageUrls());
            productDTO.setCategory(product.getCategory());
            productDTOs.add(productDTO);
        }
        return productDTOs;
    }
    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Integer id){
        Optional<Product> optionalProduct = productSevice.getProductById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            ProductDTO productDTO = new ProductDTO();
            BeanUtils.copyProperties(product, productDTO);
            return ResponseEntity.ok(productDTO);

        }else{
            return ResponseEntity.notFound().build();
        }
    }
    //POST
    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@Valid @RequestPart("productDTO") ProductDTO productDTO,
    @RequestParam(value = "file", required = false) MultipartFile[] files){
        try {
            Product product = new Product();
            product.setName(productDTO.getName());
            product.setSlug(productDTO.getSlug());
            product.setDescription(productDTO.getDescription());
            product.setPrice(productDTO.getPrice());
            product.setQuantity(productDTO.getQuantity());
            product.setInStock(productDTO.isInStock());
            product.setDeleted(productDTO.isDeleted());
            product.setCategory(product.getCategory());
            //save photos and get url list of saved photos
            List<String> imageUrls = new ArrayList<>();
            if (productDTO.getImages()!=null && productDTO.getImages().size()>0) {
                for (MultipartFile  image : productDTO.getImages()) {
                    String imageUrl = fileUploadService.saveImage(image);
                    if (imageUrl!=null) {
                        imageUrls.add(imageUrl);
                    }
                }
            }
            product.setImageUrls(imageUrls);
            productSevice.saveProduct(product);
            return new ResponseEntity<>("Product created successfully", HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create product", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //PUT
    @PutMapping("/product/{id}")
    public  ResponseEntity<?> updateProduct(@PathVariable Integer id, 
   @RequestBody ProductDTO productDTO, BindingResult result){

//validate input
if (result.hasErrors()) {
    return ResponseEntity.badRequest().body("Invalid input parameters");
}
//find product by id
    Optional<Product> optionalProduct = productSevice.getProductById(id);
    //optional.isPresent check product have exsist
    if (!optionalProduct.isPresent()) {
        return ResponseEntity.notFound().build();
    }
    //update product with new information
    Product existProduct = optionalProduct.get();
    existProduct.setName(productDTO.getName());
    existProduct.setSlug(productDTO.getSlug());
    existProduct.setDescription(productDTO.getDescription());
    existProduct.setPrice(productDTO.getPrice());
    existProduct.setQuantity(productDTO.getQuantity());
    existProduct.setInStock(productDTO.isInStock());
    existProduct.setDeleted(productDTO.isDeleted());
    existProduct.setImageUrls(productDTO.getImageUrls());
    existProduct.setCategory(productDTO.getCategory());
    //save the updated product
    productSevice.saveProduct(existProduct);
    return ResponseEntity.ok(existProduct);

 }
  

}
