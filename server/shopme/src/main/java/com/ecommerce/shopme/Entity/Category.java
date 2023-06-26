package com.ecommerce.shopme.entity;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.validator.constraints.Length;

import com.github.slugify.Slugify;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.*;


@Entity // Đánh dấu đây là table trong db
@Data // lombok giúp generate các hàm constructor, get, set v.v.
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "categories")
public class Category {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 128, nullable = false, unique = true)
    @NotBlank(message = "Tên danh mục không được để trống")
    @Length(min = 10,max = 70, message = "Tên danh mục tối thiểu 10 kí tự và tối đa là 70 kí tự")
    private String name;
    @NotBlank(message = "slug không được để trống")
    @Column(name = "slug",length = 64, nullable = false, unique = true)
    private String slug;
    @NotBlank(message = "Mô tả danh mục không được để trống")
    private String description;
    private boolean enable;
    //cascade = CascadeType.ALL: để đảm bảo rằng khi một bản ghi category bị xóa, tất cả các sản phẩm liên quan sẽ được xóa theo
    //orphanRemoval = true: để đảm bảo rằng khi một sản phẩm không còn được liên kết với bất kỳ danh mục nào, nó sẽ được xóa khỏi cơ sở dữ liệu
    @ManyToMany(mappedBy = "categories", fetch = FetchType.LAZY)
    private List<Product> products;
   
  

}
