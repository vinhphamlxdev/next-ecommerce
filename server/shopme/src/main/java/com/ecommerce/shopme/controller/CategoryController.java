package com.ecommerce.shopme.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
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

import java.io.IOException;
import java.util.*;
import com.ecommerce.shopme.dto.CategoryDTO;
import com.ecommerce.shopme.dto.PageResponse;
import com.ecommerce.shopme.entity.Category;
import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.service.CategoryService;
import com.ecommerce.shopme.service.ProductSevice;
import com.ecommerce.shopme.utils.SlugUtils;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
@CrossOrigin(origins = "http://localhost:4000", maxAge = -1,allowedHeaders = "*")
@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @Autowired 
    ProductSevice productSevice;

        // @RolesAllowed({"ROLE_ADMIN","ROLE_CUSTOMER"})
        @GetMapping("/categorys")
        public ResponseEntity<?> getAllCategory( @RequestParam(defaultValue = "0") int pageNum,
        @RequestParam(defaultValue = "3") int itemsPerPage
       ){
            Page<Category> page = categoryService.listByPageCategory(pageNum,itemsPerPage);
            List<Category> listCategorys = page.getContent();
             Map<String,Object> response = new HashMap<>();
                response.put("status", "success");
                response.put("categorys", listCategorys);
             PageResponse paggination = new PageResponse<>();
                    paggination.setCurrent(page.getNumber());
                    paggination.setItemsPerPage(page.getSize());
                    paggination.setTotalItems(page.getTotalElements());
                    paggination.setTotalPages(page.getTotalPages());
                    response.put("page", paggination);
                      return ResponseEntity.ok(response);
        
        }
        // @RolesAllowed({"ROLE_ADMIN","ROLE_CUSTOMER"})
        @GetMapping("/categorys/{id}")
        public ResponseEntity<?> getCategoryById(@PathVariable("id") Integer id) {
            Category categoryExist = categoryService.getCategoryById(id);
            if (categoryExist != null) {
                CategoryDTO categoryDTO = new CategoryDTO();
                BeanUtils.copyProperties(categoryExist, categoryDTO);
                Map<String, Object> response = new HashMap<>();
                response.put("status", "success");
                response.put("category", categoryDTO);
                return ResponseEntity.ok(response);
            }
             else {
                Map<String, Object> response = new HashMap<>();
                CategoryDTO categoryDTO = new CategoryDTO();
                response.put("status", "error");
                response.put("category", categoryDTO);
                return ResponseEntity.ok(response);

            }
        }
    @RolesAllowed("ROLE_ADMIN")
        @PostMapping("/categorys")
        public ResponseEntity<Category> addCategory(@RequestBody @Valid CategoryDTO categoryDTO) {
                Category createdCategory = categoryService.saveCategory(categoryDTO);
                return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
        }
        
        //PUT
    @RolesAllowed("ROLE_ADMIN")
    @PutMapping("/categorys/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Integer id, @RequestBody CategoryDTO updateCategory){
        Category categoryExist = categoryService.getCategoryById(id);
       
        if (!categoryService.checkDuplicateUpdate(updateCategory.getName(), id)) {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tên danh mục đã tồn tại cho danh mục khác!");

        } 
            categoryExist.setName(updateCategory.getName());
            categoryExist.setDescription(updateCategory.getDescription());
            categoryExist.setSlug(SlugUtils.createSlug(updateCategory.getName()));
            Category updatatecCategory = categoryService.updateCategory(categoryExist);
            return ResponseEntity.ok(updatatecCategory);
    }
  //DELETE
         
       
    @RolesAllowed("ROLE_ADMIN")
  @DeleteMapping("/categorys/{id}")
 public ResponseEntity<?> deleteProductById(@PathVariable Integer id) throws IOException{
        // Kiểm tra xem danh muc có tồn tại không
        Category existingCategory = categoryService.getCategoryById(id);
        if (existingCategory==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy danh mục");
        }
            categoryService.deleteCategory(id);
            return ResponseEntity.ok("Đã xóa danh mục thành công");
 }

}
