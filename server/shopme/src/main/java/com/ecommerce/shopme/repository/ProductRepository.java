package com.ecommerce.shopme.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Order;
import com.ecommerce.shopme.entity.OrderDetail;
import com.ecommerce.shopme.entity.Product;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product,Integer> {
    Product save(Product product);
    Optional<Product> findById(Integer id);
    @Modifying
    @Query("DELETE  from Product p WHERE p.id = :productId")
    void deleteById(Integer productId);
    boolean existsById(Integer id);
   // Trong ProductRepository
@Query("SELECT p FROM Product p  WHERE p.category.id = :categoryId")
List<Product> findByCategoryId(@Param("categoryId") Integer categoryId);
void delete(Product product);

@Query("SELECT p FROM Product p  WHERE p.name = :name")
Product findByName(String name);
Set<Product> findByOrder(Order order);

Page<Product> findByIsDeleteAndCategorySlug(boolean isDelete,String categorySlug, Pageable pageable);

Product findBySlug(String slug);


@Query("SELECT p FROM Product p  WHERE p.isDelete = 0")
Page<Product> findAllProducts(Pageable pageable);
//Tim kiem sp chứa 1 chuỗi cụ thể
//  List<Product> findByNameContaining(String searchString);
//Tìm kiếm sản phẩm bắt đầu bằng một chuỗi cụ thể
//List<Product> findByNameStartingWith(String searchString);
//Tìm kiếm sản phẩm kết thúc bằng một chuỗi cụ thể
//List<Product> findByNameEndingWith(String searchString);
//Tìm kiếm sản phẩm có một ký tự bất kì ở bất kỳ vị trí nào
//List<Product> findByNameLike(String searchString);
@Query("SELECT p FROM Product p WHERE CONCAT(p.name, p.slug) LIKE %?1% AND p.isDelete = 0" )  
            Page<Product> searchProduct(String keyword,Pageable pageable);

@Query("SELECT p FROM Product p WHERE p.discount.discountPrice > 0 AND p.isDelete=0")
public List<Product> findDiscountedProducts();



 
   
}
   
