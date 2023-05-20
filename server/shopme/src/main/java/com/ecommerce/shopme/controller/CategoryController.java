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

import com.ecommerce.shopme.Entity.Category;
import com.ecommerce.shopme.service.CategoryService;

@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
        //GET
        @GetMapping("/categorys")
        public ResponseEntity<Page<Category>> getAllCategory(@RequestParam(defaultValue = "0") int pageNum,
        @RequestParam(defaultValue = "3") int pageSize){
            Pageable pageable = PageRequest.of(pageNum, pageSize);
            Page<Category> Categorys = categoryService.listAllCategory(pageable);
            return ResponseEntity.ok(Categorys);
        }
        
        @GetMapping("/categorys/{id}")
        public ResponseEntity<Category> getById(@PathVariable int id){
            Category Category = categoryService.getCategoryById(id);
            if (Category!=null) {
                return ResponseEntity.ok(Category);
            }else{
                return ResponseEntity.notFound().build();
            }
        }
        //POST
        @PostMapping("/categorys")
        public ResponseEntity<?> addCategory(@RequestBody Category category){
            Category createCategory = categoryService.saveCategory(category);
            return ResponseEntity.status(HttpStatus.CREATED).body(createCategory);
        }
        //PUT
    @PutMapping("/categorys/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable int id, @RequestBody Category updateCategory){
        Category category = categoryService.getCategoryById(id);
        if (category!=null) {
            //update info Category
            category.setName(updateCategory.getName());
            category.setDescription(updateCategory.getDescription());
            //save Category
            categoryService.saveCategory(category);
            return ResponseEntity.ok(category);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
  //DELETE
  @DeleteMapping("/categorys/{id}")
    public void deleteCategory(@PathVariable Integer id){
        categoryService.deleteCategory(id);
    }

}
