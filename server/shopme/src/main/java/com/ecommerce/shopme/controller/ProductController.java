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

import com.ecommerce.shopme.DTO.CategorySummaryDTO;
import com.ecommerce.shopme.DTO.PageResponse;
import com.ecommerce.shopme.DTO.ProductDTO;
import com.ecommerce.shopme.DTO.ProductDetail;
import com.ecommerce.shopme.DTO.ProductDetail;
import com.ecommerce.shopme.Entity.Category;
import com.ecommerce.shopme.Entity.Image;
import com.ecommerce.shopme.Entity.Product;
import com.ecommerce.shopme.exception.ProductNotFoundException;
import com.ecommerce.shopme.service.CategoryService;
import com.ecommerce.shopme.service.FileUploadService;
import com.ecommerce.shopme.service.ProductSevice;
import com.ecommerce.shopme.utils.ProductListResponse;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;

@CrossOrigin(origins = "http://localhost:4000", maxAge = -1)
@RestController
@Validated
public class ProductController {
    @Autowired 
    ProductSevice productService;
    @Autowired
    FileUploadService fileUploadService;
    @Autowired
    CategoryService categoryService;
    //GET
  

    
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
                productDetail.setDescription(product.getDescription());
                productDetail.setPrice(product.getPrice());
                productDetail.setQuantity(product.getQuantity());
                productDetail.setInStock(product.getInStock());
                List<CategorySummaryDTO> categorySumarys = new ArrayList<>();
                for (Category category : product.getCategorys()) {
                    CategorySummaryDTO categorySummaryDTO = new CategorySummaryDTO();
                    categorySummaryDTO.setId(category.getId());
                    categorySummaryDTO.setName(category.getName());
                    categorySummaryDTO.setSlug(category.getSlug());
                    categorySumarys.add(categorySummaryDTO);
                }
                productDetail.setCategorys(categorySumarys);
                // Tạo CategoryproductDetail từ Category của sản phẩm
                
                //xử lý ảnh
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



    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") @Positive(message = "Id san pham toi thieu la 0") Integer id){
        Product productExist = productService.getProductById(id);
        if (productExist==null) {
            return ResponseEntity.notFound().build();
        }
            List<String> pathImgs = new ArrayList<>();
                      for (Image imageUrls : productExist.getImages()) {
                        pathImgs.add(imageUrls.getImageUrl());
                    }
            ProductDetail productDetail = new ProductDetail();
            productDetail.setId(productExist.getId());
            productDetail.setName(productExist.getName());
            productDetail.setDescription(productExist.getDescription());
            productDetail.setPrice(productExist.getPrice());
            productDetail.setQuantity(productExist.getQuantity());
            productDetail.setImageUrls(pathImgs);
            List<CategorySummaryDTO> categorySumarys = new ArrayList<>();
            for (Category category : productExist.getCategorys()) {
                CategorySummaryDTO categorySummaryDTO = new CategorySummaryDTO();
                categorySummaryDTO.setId(category.getId());
                categorySummaryDTO.setName(category.getName());
                categorySummaryDTO.setSlug(category.getSlug());
                categorySumarys.add(categorySummaryDTO);
            }
            productDetail.setCategorys(categorySumarys);
            Map<String,Object> response = new HashMap<>();
            response.put("product", productDetail);
            response.put("status", "success");
          
                return ResponseEntity.ok(response);
      
    }

    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@ModelAttribute ProductDTO productRequest,
     @RequestParam("categories") List<Integer> categoryIds){
        try {
            //lay danh muc tu co so du lieu
            List<Category> categorys = categoryService.getCategoriesByIds(categoryIds);
            if (categorys.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy danh mục");
            }
            // Lưu thông tin sản phẩm
            Product product = new Product();
            product.setName(productRequest.getName());
            product.setDescription(productRequest.getDescription());
            product.setPrice(productRequest.getPrice());
            product.setQuantity(productRequest.getQuantity());
             // Gán danh sách danh mục cho sản phẩm
              product.setCategorys(categorys);
            
              Product createdProduct = productService.saveProduct(product);
            // Lưu sản phẩm mới vào cơ sở dữ liệu
            // Lưu các file ảnh vào thư mục trên server và cập nhật đường dẫn vào cơ sở dữ liệu
            for (MultipartFile imageFile :productRequest.getImages()) {
                String  imageUrl = saveImageToFile(imageFile);
                productService.addImageToProduct(createdProduct.getId(), imageUrl);
            }
             return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
        } catch (Exception e) {
           e.printStackTrace();
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    private String saveImageToFile(MultipartFile image) throws IOException {
        String fileDirectory = "D:/uploads";
        String filename = "product_" + UUID.randomUUID().toString() + ".jpg";
        String filePath = fileDirectory + "/" + filename;
        image.transferTo(new File(filePath));
        return filePath;
    }
    //PUT
    @PutMapping("/products/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Integer productId, @ModelAttribute  ProductDTO productRequest,@RequestParam("categories") List<Integer> categoryIds){
        try {
            // Kiểm tra sản phẩm có tồn tại hay không
        Product existingProduct = productService.getProductById(productId);
        if (existingProduct == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm");
        }
        // Lấy danh sách danh mục từ danh sách mã danh mục
        List<Category> categories = categoryService.getCategoriesByIds(categoryIds);
        if (categories.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Khong tim thay danh muc");
        }
            
            // Cập nhật thông tin của sản phẩm dựa trên đối tượng updatedProduct
            existingProduct.setName(productRequest.getName());
            existingProduct.setPrice(productRequest.getPrice());
            existingProduct.setDescription(productRequest.getDescription());
            existingProduct.setQuantity(productRequest.getQuantity());
              // Cập nhật danh sách danh mục cho sản phẩm
              existingProduct.setCategorys(categories);
            //cập nhật sản phẩm
            Product updatedProduct = productService.saveProduct(existingProduct);
             // Xóa các ảnh hiện tại của sản phẩm
            existingProduct.getImages().clear();
         // Lưu các file ảnh vào thư mục trên server và cập nhật đường dẫn vào cơ sở dữ liệu
         for (MultipartFile imageFile :productRequest.getImages()) {
            String  imageUrl = saveImageToFile(imageFile);
            productService.addImageToProduct(updatedProduct.getId(), imageUrl);
         }
            
         return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
       
    }
  //DELETE
  @DeleteMapping("/products/{id}")
 public ResponseEntity<?> deleteProductById(@PathVariable @Positive Integer id){
    try {

        // Kiểm tra xem sản phẩm có tồn tại không
        if (!productService.existsProductById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm với id:" +id);
        }
        
         // Xóa các bản ghi liên quan trong bảng Image
         productService.deleteImageByProductId(id);
            // Xóa sản phẩm
            productService.deleteProductById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Xóa sản phẩm thành công");

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
 }

}