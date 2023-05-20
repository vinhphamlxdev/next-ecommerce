package com.ecommerce.shopme.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.Entity.Category;

@Repository
public interface CategoryRepository extends PagingAndSortingRepository<Category,Integer> {
    Category save(Category Category);
    Category  findById(Integer id);
    Category deleteById(Integer id);
}
