package com.ecommerce.shopme.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecommerce.shopme.Entity.Category;
import com.ecommerce.shopme.repository.CategoryRepository;

@Service
public class CategoryService {
    
@Autowired
private CategoryRepository categoryRepository;
    
public Page<Category> listAllCategory(Pageable pageable) {
    if (pageable.isPaged()) {
        return categoryRepository.findAll(pageable);
    } else {
        List<Category> allCategorys = categoryRepository.findAll(Pageable.unpaged()).getContent();
        return new PageImpl<>(allCategorys);
    }
}
//get Category by id
public Category getCategoryById(int id) {
    return categoryRepository.findById(id);
}
public Category saveCategory(Category category){
   return categoryRepository.save(category);
}
public void deleteCategory(Integer id){
categoryRepository.deleteById(id);
}

}
