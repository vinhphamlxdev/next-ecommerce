package com.ecommerce.shopme.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Length;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, length = 255, nullable = false)
    @NotBlank(message = "Tên sản phẩm không được để trống")
    @Length(min = 1, message = "Tên sản phẩm ít nhất 1 kí tự")
    private String name;

    @Column(name = "short_description", length = 512, nullable = false)
    @NotBlank(message = "Mô tả sản phẩm không được để trống")
    private String shortDescription;

    
    // @Column(name = "long_description", length = 512, nullable = true)
    // private String longDescription;

    @Column(name = "price",nullable = false)
    @Min(value = 0,message = "Giá tối thiểu phải là 0")
    private float price;

    @Column(name = "quantity",nullable = false)
    @Min(value = 1,message = "số lượng tối thiểu phải là 1")
    private Integer quantity;

    @Column(name = "created_at",nullable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date createdAt;

   @Column(name = "updated_at",nullable = true)
  @Temporal(TemporalType.TIMESTAMP)
  private Date updatedAt;

    @Column(name = "isDelete")
    private boolean isDelete;
//Khi một đối tượng Product được lưu vào cơ sở dữ liệu, quan hệ "cascade" sẽ tự động 
//lưu các đối tượng Image liên quan mà không cần phải lưu chúng một cách rõ ràng. Điều này có nghĩa là khi bạn lưu một Product mới và thêm các Image vào danh sách images
//orphanRemoval = true trên một quan hệ một-nhiều, nó cho phép xóa tự động các đối tượng con khi 
//chúng không còn được liên kết với đối tượng cha.
    @Lob
    @Column(unique = true)
    private String slug;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images = new ArrayList<>();
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

      
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Color> colors = new ArrayList<>();

    
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Size> sizes = new ArrayList<>();

    // @ManyToMany(cascade = CascadeType.ALL)
    // @JoinTable(
    //     name = "product_discount",
    //     joinColumns = @JoinColumn(name="product_id"),
    //     inverseJoinColumns = @JoinColumn(name="discount_id")
    // )
    // private List<Discount> discounts;

    // @OneToOne(mappedBy = "product")
    // private Inventory inventory;
}

