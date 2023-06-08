package com.ecommerce.shopme.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.Entity.Category;

@Repository
public interface CategoryRepository extends PagingAndSortingRepository<Category,Integer> {
    Category save(Category Category);
    Category  findById(Integer id);
    void deleteById(Integer categoryId);
    //kt ton tai
    public boolean existsById(Integer id);
    List<Category> findByIdIn(List<Integer> categoryIds);
}
