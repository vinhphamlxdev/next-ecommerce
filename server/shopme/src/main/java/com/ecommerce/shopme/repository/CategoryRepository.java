package com.ecommerce.shopme.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Category;
import com.ecommerce.shopme.entity.Product;

@Repository
public interface CategoryRepository extends PagingAndSortingRepository<Category,Integer> {
    Category save(Category Category);
    @Query("SELECT c FROM Category c WHERE c.id = :id")
    Category  findById(Integer id);
    void deleteById(Integer categoryId);
    //kt ton tai
    public boolean existsById(Integer id);
    List<Category> findByIdIn(List<Integer> categoryIds);

    @Query("SELECT c FROM Category c WHERE c.isDelete = false")
    Page<Category> findByIsDeleteFalse(Pageable pageable);

    @Query("SELECT c FROM Category c  WHERE c.name = :name")
    Category findByName(String name);
   
}
