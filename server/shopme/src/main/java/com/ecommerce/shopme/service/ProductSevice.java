package com.ecommerce.shopme.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.ecommerce.shopme.DTO.ProductDetail;
import com.ecommerce.shopme.Entity.Image;
import com.ecommerce.shopme.Entity.Product;
import com.ecommerce.shopme.exception.ProductNotFoundException;
import com.ecommerce.shopme.repository.ImageRepository;
import com.ecommerce.shopme.repository.ProductRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class ProductSevice {
    @Autowired
    private ProductRepository productRepository;
    @Autowired 
    private ImageRepository imageRepository;
    public Page<Product> listAll(Pageable pageable) {
      
        if (pageable.isPaged()) {
            return productRepository.findAll(pageable);
        } else {
            List<Product> allProducts = productRepository.findAll(Pageable.unpaged()).getContent();
            return new PageImpl<>(allProducts);
        }
    }
    //get product by id
    public Product getProductById(Integer id) {
        
        return productRepository.findById(id).get();
    }
    //save product
    public Product saveProduct(Product product){
       return productRepository.save(product);
    }
    //delete product by id
   public void deleteProductById(Integer id){
    //lay san pham can xoa

    Optional<Product> productOptional    =    productRepository.findById(id);
    Product product = productOptional.orElse(null);
  if (product!=null) {
     // Xóa các ảnh liên quan
     List<Image> images = product.getImages();
        imageRepository.deleteAll(images);
        productRepository.delete(product);
  }
}
//kiem tra ton tai
public boolean existsProductById(Integer id){
    return productRepository.existsById(id);
}
public void addImageToProduct(Integer productId, String imageUrl) {
    Optional<Product> optionalProduct = productRepository.findById(productId);
    //isPresent() kiem tra mot duoi tuong optional co rỗng hay không
    if (optionalProduct.isPresent()) {
        Product product = optionalProduct.get();
        if (product.getImages()==null) {
            product.setImages(new ArrayList<>());
        }
        // Tạo đối tượng Image mới
        Image image = new Image();
        image.setImageUrl(imageUrl);
        image.setProduct(product);

        // Thêm image vào danh sách images của product
        product.getImages().add(image);

        // Lưu product để cập nhật quan hệ với image
        productRepository.save(product);
    } else {
        // Xử lý khi không tìm thấy sản phẩm với id tương ứng
    }
}
public void deleteImageByProductId(Integer productId){
    // Lấy danh sách các bản ghi Image dựa trên productId
    List<Image> images = imageRepository.findByProductId(productId);
    for (Image image : images) {
        imageRepository.delete(image);
    }
}
public List<Product> getProductByCategoryId(Integer id){
    return productRepository.findByCategoryId(id);
}
}
