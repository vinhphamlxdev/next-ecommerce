package com.ecommerce.shopme.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
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

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ecommerce.shopme.dto.CategorySummaryDTO;
import com.ecommerce.shopme.dto.PageResponse;
import com.ecommerce.shopme.dto.ProductDTO;
import com.ecommerce.shopme.config.CloudinaryConfig;
import com.ecommerce.shopme.dto.ProductDetail;
import com.ecommerce.shopme.entity.Category;
import com.ecommerce.shopme.entity.Color;
import com.ecommerce.shopme.entity.Image;
import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.entity.Size;
import com.ecommerce.shopme.exception.ProductNotFoundException;
import com.ecommerce.shopme.service.CategoryService;
import com.ecommerce.shopme.service.ProductSevice;
import com.ecommerce.shopme.service.SizeService;
import com.ecommerce.shopme.utils.ProductListResponse;

import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;

@CrossOrigin(origins = "http://localhost:4000", maxAge = -1)
@RestController
@Validated
public class ProductController {
    @Autowired 
    ProductSevice productService;
    @Autowired
    CategoryService categoryService;
    //GET
    @Autowired 
    Cloudinary cloudinary;
    //  private final Cloudinary cloudinary;
  
    //  @RolesAllowed({"ROLE_ADMIN","ROLE_CUSTOMER"})
    @GetMapping("/products")
    public ResponseEntity<ProductListResponse> getAll(@RequestParam(defaultValue = "0") int pageNum,
    @RequestParam(defaultValue = "3") int itemsPerPage){
        Pageable pageable = PageRequest.of(pageNum, itemsPerPage);
        Page<Product> products = productService.listAll(pageable);
        // Tạo danh sách ProductResponse từ danh sách Product
        List<ProductDetail> productResponses = products.stream()
            .map(product -> {
                ProductDetail productDetail = new ProductDetail();
                productDetail.setId(product.getId());
                productDetail.setName(product.getName());
                productDetail.setShortDescription(product.getShortDescription());
                productDetail.setPrice(product.getPrice());
                productDetail.setQuantity(product.getQuantity());
                productDetail.setSlug(product.getSlug());
                productDetail.setCategory(product.getCategory());

                List<String> sizeNames = new ArrayList<>();
                for (Size sizeName : product.getSizes()) {
                    sizeNames.add(sizeName.getName());
                }
                productDetail.setSizes(sizeNames);
                   List<String> colorNames = new ArrayList<>();
                for (Color colorName : product.getColors()) {
                    colorNames.add(colorName.getColorName());
                }
                productDetail.setColors(colorNames);
                List<String> imageUrls = new ArrayList<>();
                for (Image image : product.getImages()) {
                    imageUrls.add(image.getImageUrl());
                }
                productDetail.setImageUrls(imageUrls);
                // productDetail.setCategory(category);
                return productDetail;
            })
            .collect(Collectors.toList());
            ProductListResponse productListResponse = new ProductListResponse();
            productListResponse.setStatus("success");
            productListResponse.setProducts(productResponses);
            productListResponse.setPage(new PageResponse<>(products.getNumber(),
             products.getSize(),
              products.getTotalElements(),
               products.getTotalPages()
               ));
  
     return ResponseEntity.ok(productListResponse);
    }
//     @RolesAllowed({"ROLE_ADMIN","ROLE_CUSTOMER"})
    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") @Positive(message = "Id san pham toi thieu la 0") Integer id){
        Product productExist = productService.getProductById(id);
        if (productExist==null) {
            return ResponseEntity.notFound().build();
        }
          
            ProductDetail productDetail = new ProductDetail();
            productDetail.setId(productExist.getId());
            productDetail.setName(productExist.getName());
            productDetail.setShortDescription(productExist.getShortDescription());
            productDetail.setPrice(productExist.getPrice());
            productDetail.setQuantity(productExist.getQuantity());
            productDetail.setStatus(true);
            productDetail.setCategory(productExist.getCategory());

              List<String> pathImgs = new ArrayList<>();
                      for (Image imageUrls : productExist.getImages()) {
                        pathImgs.add(imageUrls.getImageUrl());
                    }
                     productDetail.setImageUrls(pathImgs);
               List<String> sizeNames = new ArrayList<>();
                      for (Size sizeName : productExist.getSizes()) {
                        sizeNames.add(sizeName.getName());
                    }
            productDetail.setSizes(sizeNames);
                    
             List<String> colorNames = new ArrayList<>();
                      for (Color colorName : productExist.getColors()) {
                        colorNames.add(colorName.getColorName());
                    }
            productDetail.setColors(colorNames);
            Map<String,Object> response = new HashMap<>();
            response.put("product", productDetail);
            response.put("status", "success");
                return ResponseEntity.ok(response);
    }
//     @RolesAllowed("ROLE_ADMIN")
    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@ModelAttribute @Valid ProductDTO productRequest,
     @RequestParam("category") Integer categoryId
     ) throws io.jsonwebtoken.io.IOException, IOException {
            //lay danh muc tu co so du lieu
         Category category = categoryService.getCategoryById(categoryId);
            if (category==null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy danh mục voi id"+categoryId);
            }
            // Lưu thông tin sản phẩm
            Product product = new Product();
            // BeanUtils.copyProperties(productRequest, product);
            product.setName(productRequest.getName());
            product.setShortDescription(productRequest.getShortDescription());
            product.setPrice(productRequest.getPrice());
            product.setQuantity(productRequest.getQuantity());
            product.setSlug(product.getSlug());
            product.setStatus(true);
             // Gán danh sách danh mục cho sản phẩm
              product.setCategory(category);
              Product createdProduct = productService.saveProduct(product);
                        //save img file
                         List<String> imgUrls = productService.saveImagesToCloudinary(productRequest.getImages());
                            for (String imgUrl : imgUrls) {
                                productService.addImageToProduct(createdProduct.getId(), imgUrl);
                            }
  
                          //them mau cho san pham
                           List<String> colorNames = productRequest.getColors();
                            for (String colorName : colorNames) {
                                productService.addColorToProduct(createdProduct.getId(), colorName);
                            }
                           List<String> sizeNames = productRequest.getSizes();
                            for (String sizeName : sizeNames) {
                                productService.addSizeToProduct(createdProduct.getId(), sizeName);
                            }
               
  
                            //them size vao san pham
                            
             return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }
  
 
//     //PUT
//     @RolesAllowed("ROLE_ADMIN")
    @PutMapping("/products/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Integer productId ,
    @ModelAttribute @Valid ProductDTO productRequest,
     @RequestParam("category") Integer categoryId,
      @RequestParam("imgsDelete") List<String> imgsDelete,
      @RequestParam("sizesDelete") List<String> sizesDelete,
      @RequestParam("colorsDelete") List<String> colorDelete
     ) throws IOException{
            // Kiểm tra sản phẩm có tồn tại hay không
        Product existingProduct = productService.getProductById(productId);
        if (existingProduct == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm voi id:"+productId);
        }
        // Lấy danh sách danh mục từ danh sách mã danh mục
           Category category = categoryService.getCategoryById(categoryId);
              if (category==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Khong tim thay danh muc");
        }
       
          // Cập nhật thông tin của sản phẩm dựa trên đối tượng updatedProduct
            existingProduct.setName(productRequest.getName());
            existingProduct.setPrice(productRequest.getPrice());
            existingProduct.setShortDescription(productRequest.getShortDescription());
            existingProduct.setPrice(productRequest.getPrice());
            existingProduct.setStatus(true);
            existingProduct.setQuantity(productRequest.getQuantity());
              // Cập nhật  danh mục cho sản phẩm
              existingProduct.setCategory(category);
      List<MultipartFile> images = productRequest.getImages();
        if (!images.isEmpty()) {
            //luu vao cloudinary
        List<String> imgUrls = productService.saveImagesToCloudinary(images);

        for (String imgUrl : imgUrls) {
        productService.addImageToProduct(existingProduct.getId(), imgUrl);

        }
         }
           
            //xu ly luu size
                List<String> sizeNames = productRequest.getSizes();
                if (!sizeNames.isEmpty()) {
                    for (String sizeName : sizeNames) {
                        productService.addSizeToProduct(existingProduct.getId(), sizeName);
                    }
                }
                 List<String> colorNames = productRequest.getColors();
                if (!colorNames.isEmpty()) {
                    for (String colorName : colorNames) {
                        productService.addColorToProduct(existingProduct.getId(), colorName);
                    }
                }
                 //xử lý xóa danh sách ảnh
                productService.deleteImage(existingProduct.getId(),imgsDelete);
                productService.deleteSize(existingProduct.getId(), sizesDelete);
                productService.deleteColor(existingProduct.getId(), colorDelete);
        //cập nhật sản phẩm
            Product updatedProduct = productService.saveProduct(existingProduct);
            
         return ResponseEntity.ok(updatedProduct);
    }
//   //DELETE
  @DeleteMapping("/products/{id}")
 public ResponseEntity<?> deleteProductById(@PathVariable @Positive Integer id) throws IOException{
        // Kiểm tra xem sản phẩm có tồn tại không
        if (!productService.existsProductById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm với id:" +id);
        }
            // Xóa sản phẩm
            productService.deleteProductById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Xóa sản phẩm thành công");
 }

}