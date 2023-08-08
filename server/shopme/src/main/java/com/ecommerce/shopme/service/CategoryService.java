package com.ecommerce.shopme.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecommerce.shopme.dto.CategoryDTO;
import com.ecommerce.shopme.entity.Category;
import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.repository.CategoryRepository;
import com.ecommerce.shopme.utils.SlugUtils;

@Service
public class CategoryService {
    
@Autowired
private CategoryRepository categoryRepository;
@Autowired ProductSevice productSevice;
    
public Page<Category> listByPageCategory(Integer pageNumber, Integer itemsPerpage) {
    Pageable pageable = PageRequest.of(pageNumber, itemsPerpage);
    return categoryRepository.findByIsDeleteFalse( pageable);
}

// //get Category by id
public Category getCategoryById(int id) {
    return categoryRepository.findById(id);
}
public Category saveCategory(CategoryDTO categoryDTO){
    Category newCategory = new Category();
    newCategory.setName(categoryDTO.getName());
    newCategory.setDescription(categoryDTO.getDescription());
    newCategory.setSlug(SlugUtils.createSlug(categoryDTO.getName()));
   return categoryRepository.save(newCategory);
}

public Category updateCategory(Category updateCategory){
  
   return categoryRepository.save(updateCategory);
}

public void deleteCategory(Integer categoryId){
    List<Product> products = productSevice.getProductByCategoryId(categoryId);
    Category existCategory =categoryRepository.findById(categoryId);
    if (existCategory!=null ) {
        if (products.isEmpty()) {
            categoryRepository.deleteById(categoryId);
        }else{
          existCategory.setDelete(true);
        categoryRepository.save(existCategory);
        }
    }
  
}
//kiem tra ton tai
public boolean existsCategoryById(Integer id){
    return categoryRepository.existsById(id);
}
//get danh muc dua tren danh sach id
public List<Category> getCategoriesByIds(List<Integer> categoryIds) {
    return categoryRepository.findByIdIn(categoryIds);
}


}
