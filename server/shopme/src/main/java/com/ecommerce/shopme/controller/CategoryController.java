package com.ecommerce.shopme.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.ecommerce.shopme.DTO.CategoryDetail;
import com.ecommerce.shopme.DTO.PageResponse;
import com.ecommerce.shopme.Entity.Category;
import com.ecommerce.shopme.service.CategoryService;
import com.ecommerce.shopme.utils.CustomResponse;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;

@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
        //GET
        @GetMapping("/categorys")
        public ResponseEntity<?> getAllCategory(@RequestParam(defaultValue = "0") int pageNum,
        @RequestParam(defaultValue = "2") int itemPerPage){
            Pageable pageable = PageRequest.of(pageNum, itemPerPage);
            Page<Category> categorys = categoryService.listAllCategory(pageable);
        
            // Tạo danh sách ProductResponse từ danh sách Product
            List<CategoryDetail> categoryRes = categorys.stream()
                .map(category -> {
                    CategoryDetail categoryDetail = new CategoryDetail();
                    categoryDetail.setId(category.getId());
                    categoryDetail.setName(category.getName());
                    categoryDetail.setDescription(category.getDescription());
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
        public ResponseEntity<?> getById(@PathVariable  Integer id){
            try {
                Category categoryExist = categoryService.getCategoryById(id);
                if (categoryExist!=null) {
                    CategoryDetail categoryDetail = new CategoryDetail(
                        categoryExist.getId(), categoryExist.getName(),
                         categoryExist.getSlug(), 
                         categoryExist.getDescription());
                        return ResponseEntity.ok(categoryDetail);
                }
                else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Khong tim thay danh muc voi id" +id);
                }
              } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Da xay ra loi");
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
        Category updatedCategory = categoryService.saveCategory(updateCategory);
        return ResponseEntity.ok(updatedCategory);
    }
  //DELETE
  @DeleteMapping("/categorys/{id}")
 public ResponseEntity<?> deleteProductById(@PathVariable @Positive Integer id){
    try {
        // Kiểm tra xem sản phẩm có tồn tại không
        if (!categoryService.existsCategoryById(id)) {
             // Sản phẩm không tồn tại
             String message = "Danh mục có ID " + id + " không tồn tại";
             return ResponseEntity.ok(message);
        }
        
            // Xóa sản phẩm
            categoryService.deleteCategory(id);
            return ResponseEntity.ok("Đã xóa danh mục thành công");

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
 }

}
