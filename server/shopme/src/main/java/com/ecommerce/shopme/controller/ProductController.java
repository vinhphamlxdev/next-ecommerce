package com.ecommerce.shopme.controller;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
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

import com.ecommerce.shopme.DTO.PageResponse;
import com.ecommerce.shopme.DTO.ProductDetail;
import com.ecommerce.shopme.Entity.Category;
import com.ecommerce.shopme.Entity.Product;
import com.ecommerce.shopme.exception.ProductNotFoundException;
import com.ecommerce.shopme.service.FileUploadService;
import com.ecommerce.shopme.service.ProductSevice;
import com.ecommerce.shopme.utils.ProductListResponse;

import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;


@RestController
@Validated
public class ProductController {
    @Autowired 
    ProductSevice productService;
    @Autowired
    FileUploadService fileUploadService;
    //GET
  
    @GetMapping("/products")
    // @RolesAllowed({"ROLE_CUSTOMER", "ROLE_EDITOR"}) 
    public ResponseEntity<ProductListResponse> getAll(@RequestParam(defaultValue = "0") int pageNum,
    @RequestParam(defaultValue = "2") int itemPerPage){
        Pageable pageable = PageRequest.of(pageNum, itemPerPage);
        Page<Product> products = productService.listAll(pageable);
    
        // Tạo danh sách ProductResponse từ danh sách Product
        List<ProductDetail> productResponses = products.stream()
            .map(product -> {
                ProductDetail productDetail = new ProductDetail();
                productDetail.setId(product.getId());
                productDetail.setName(product.getName());
                productDetail.setDescription(product.getDescription());
                productDetail.setPrice(product.getPrice());
                productDetail.setQuantity(product.getQuantity());
                productDetail.setInStock(product.isInStock());
                productDetail.setImageUrls(product.getImageUrls());
    
                // Tạo CategoryproductDetail từ Category của sản phẩm
                Category category = new Category(product.getCategory().getId(),
                 product.getCategory().getName(),
                  product.getCategory().getSlug(),
                   product.getCategory().getDescription(),
                    product.getCategory().isEnable(),
                     new ArrayList<>());
              
                productDetail.setCategory(category);
                return productDetail;
            })
            .collect(Collectors.toList());
            ProductListResponse productListResponse = new ProductListResponse();
            productListResponse.setStatus("Success");
            productListResponse.setProducts(productResponses);
            productListResponse.setPage(new PageResponse<>(products.getNumber()+1,
             products.getSize(),
              products.getTotalElements(),
               products.getTotalPages()
               ));
  

     return ResponseEntity.ok(productListResponse);
    }


    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") @Positive(message = "Id san pham toi thieu la 0") Integer id){
        Product productExist = productService.getProductById(id);
        if (productExist==null) {
            return ResponseEntity.notFound().build();
        }
        Category category  = new Category(productExist.getCategory().getId(),
         productExist.getCategory().getName(), 
         productExist.getCategory().getSlug(),
          productExist.getCategory().getDescription(),
           productExist.getCategory().isEnable(),
            new ArrayList<>());

            ProductDetail productDetail = new ProductDetail(
                        productExist.getId(),
                        productExist.getName(),
                        productExist.getPrice(),
                        productExist.getImageUrls(),
                        productExist.isDeleted(),
                        productExist.getDescription(),
                        productExist.isInStock(),
                        // productExist.getCategory()
                        category
                );
                return ResponseEntity.ok(productDetail);
      
    }
    // POST
    @PostMapping("/products")
    // @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<?> addProduct(@RequestBody @Valid  Product product) {
        try {
             // Lưu thư mục lưu trữ file trên server
             String fileDirectory = "D:/uploads";
             // Lưu hình ảnh vào thư mục trên server và cập nhật đường dẫn vào list imageUrls
             for (int i = 0; i < product.getImageUrls().size(); i++) {
              String imgUrl = product.getImageUrls().get(i);
              String filename = "product_" + UUID.randomUUID().toString() + "_" + i + ".jpg";
              // Lưu file vào thư mục trên server
              saveImageToFile(imgUrl, fileDirectory + "/" + filename);
                // Cập nhật đường dẫn file vào list imageUrls
                product.getImageUrls().set(i,  fileDirectory + "/" + filename);
              
             }
             Product createdProduct = productService.saveProduct(product);
             return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
        } catch (Exception e) {
            e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
              
    }
    private void saveImageToFile(String imageUrl, String filePath) {
        try {
            URL url = new URL(imageUrl);
            InputStream inputStream = url.openStream();
            Path path = Path.of(filePath);
            Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    //PUT
    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Integer id, @RequestBody  Product product){
        try {
            // Kiểm tra sự tồn tại của sản phẩm dựa trên ID
            Product existingProduct = productService.getProductById(id);
            if (existingProduct == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            
            // Cập nhật thông tin của sản phẩm dựa trên đối tượng updatedProduct
            existingProduct.setName(product.getName());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setQuantity(product.getQuantity());
            existingProduct.setImageUrls(product.getImageUrls());
            existingProduct.setDeleted(product.isDeleted());
            existingProduct.setSlug(product.getSlug());
            Category categoryUpdate = new Category(product.getCategory().getId(),
             null, null, null, false, null);
             existingProduct.setCategory(categoryUpdate);
            existingProduct.setCategory(product.getCategory());

            // ... Cập nhật các trường dữ liệu khác cần thiết
            
            // Lưu sản phẩm đã cập nhật vào cơ sở dữ liệu
            Product updatedProduct = productService.saveProduct(existingProduct);
            
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
       
    }
  //DELETE
  @DeleteMapping("/products/{id}")
 public ResponseEntity<?> deleteProductById(@PathVariable @Positive Integer id){
    try {
        // Kiểm tra xem sản phẩm có tồn tại không
        if (!productService.existsProductById(id)) {
            return ResponseEntity.notFound().build();
        }
        
            // Xóa sản phẩm
            productService.deleteProductById(id);
            return ResponseEntity.noContent().build();

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
 }

}
