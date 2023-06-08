package com.ecommerce.shopme.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import java.util.stream.Collectors;

import com.ecommerce.shopme.DTO.CategoryDTO;
import com.ecommerce.shopme.DTO.CategoryDetail;
import com.ecommerce.shopme.DTO.PageResponse;
import com.ecommerce.shopme.Entity.Category;
import com.ecommerce.shopme.Entity.Product;
import com.ecommerce.shopme.service.CategoryService;
import com.ecommerce.shopme.service.ProductSevice;
import com.ecommerce.shopme.utils.CustomResponse;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;

@CrossOrigin(origins = "http://localhost:4000", maxAge = -1)
@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @Autowired 
    ProductSevice productSevice;
        //GET
        @GetMapping("/categorys")
        public ResponseEntity<?> getAllCategory(@RequestParam(defaultValue = "0") int pageNum,
        @RequestParam(defaultValue = "4") int itemPerPage){
            Pageable pageable = PageRequest.of(pageNum, itemPerPage);
            Page<Category> categorys = categoryService.listAllCategory(pageable);
        
            // Tạo danh sách ProductResponse từ danh sách Product
            List<CategoryDetail> categoryRes = categorys.stream()
                .map(category -> {
                    CategoryDetail categoryDetail = new CategoryDetail();
                    categoryDetail.setId(category.getId());
                    categoryDetail.setName(category.getName());
                    categoryDetail.setDescription(category.getDescription());
                    categoryDetail.setSlug(category.getSlug());
                    return categoryDetail;
                })
                .collect(Collectors.toList());
                CustomResponse customResponse = new CustomResponse();
              
                customResponse.setStatus("success");
                customResponse.setCategorys(categoryRes);
                customResponse.setPage(new PageResponse<>(categorys.getNumber(), categorys.getSize(), categorys.getTotalElements(),categorys.getTotalPages()));
                return ResponseEntity.ok(customResponse);
          
        }
        
        @GetMapping("/categorys/{id}")
        public ResponseEntity<?> getCategoryById(@PathVariable("id") Integer id) {
            Category categoryExist = categoryService.getCategoryById(id);
            if (categoryExist != null) {
                CategoryDTO categoryDTO = new CategoryDTO();
                            categoryDTO.setId(categoryExist.getId());
                            categoryDTO.setName(categoryExist.getName());
                            categoryDTO.setDescription(categoryExist.getDescription());
                            categoryDTO.setSlug(categoryExist.getSlug());
                Map<String, Object> response = new HashMap<>();
                response.put("status", "success");
                response.put("category", categoryDTO);
    
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new HashMap<>();
                CategoryDTO categoryDTO = new CategoryDTO();
                response.put("status", "error");
                response.put("category", categoryDTO);
                return ResponseEntity.ok(response);

            }
        }
       
        @PostMapping("/categorys")
        public ResponseEntity<Category> addCategory(@RequestBody @Valid Category category) {
            try {
                Category createdCategory = categoryService.saveCategory(category);
     
                return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        
        //PUT
    @PutMapping("/categorys/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Integer id, @RequestBody Category updateCategory){
        Category categoryExist = categoryService.getCategoryById(id);

        if (categoryExist == null) {
            String message = "Danh mục có ID " + id + " không tồn tại";
        
            return ResponseEntity.ok(message);
        }
            updateCategory.setId(id);
            Category savedCategory = categoryService.saveCategory(updateCategory);
       
            return ResponseEntity.ok(savedCategory);
       
    }
  //DELETE
  @DeleteMapping("/categorys/{id}")
 public ResponseEntity<?> deleteProductById(@PathVariable @Positive Integer id){
    try {
        // Kiểm tra xem danh muc có tồn tại không
        Category existingCategory = categoryService.getCategoryById(id);

        if (existingCategory==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy danh mục");
        }
        //lấy danh sách sản phẩm liên quan đến danh mục
        List<Product> products = productSevice.getProductByCategoryId(id);
        for (Product product : products) {
            productSevice.deleteProductById(product.getId());
            
        }
            // Xóa danh muc
            categoryService.deleteCategory(id);
            return ResponseEntity.ok("Đã xóa danh mục thành công");

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
 }

}
