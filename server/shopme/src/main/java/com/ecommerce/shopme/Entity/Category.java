package com.ecommerce.shopme.entity;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

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
    @Length(min = 5,max = 50, message = "Tên danh mục tối thiểu 5 kí  tự tối đa 40 kí tự")
    private String name;
    @NotBlank(message = "slug không được để trống")
    @Column(name = "slug",length = 64, nullable = false, unique = true)
    private String slug;
    @NotBlank(message = "Mô tả danh mục không được để trống")
    private String description;

     @Column(name = "is_delete")
    private boolean isDelete;
    //cascade = CascadeType.ALL: để đảm bảo rằng khi một bản ghi category bị xóa, tất cả các sản phẩm liên quan sẽ được xóa theo
    //orphanRemoval = true: để đảm bảo rằng khi một sản phẩm không còn được liên kết với bất kỳ danh mục nào, nó sẽ được xóa khỏi cơ sở dữ liệu
    //mappedBy trường được chỉ định là trọng tâm của quan hệ
   @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
      private List<Product> products;
  

}
