package com.ecommerce.shopme.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ecommerce.shopme.entity.Image;
import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.exception.ProductNotFoundException;
import com.ecommerce.shopme.repository.ImageRepository;
import com.ecommerce.shopme.repository.ProductRepository;

import io.jsonwebtoken.io.IOException;
import jakarta.transaction.Transactional;
@Service
@Transactional
public class ProductSevice {
    @Autowired
    private ProductRepository productRepository;
    @Autowired 
    private ImageRepository imageRepository;
    @Autowired 
    private Cloudinary cloudinary;

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
    public String getPublicIdImage(String imageUrl){
    //https://res.cloudinary.com/dbjupz16h/image/upload/v1687628874/wchjtzrxbn0m2uuseg2w.jpg
    //Tăng giá trị của chỉ số cuối cùng của dấu gạch chéo lên 1 để bỏ qua dấu gạch chéo và chỉ trỏ tới phần bắt đầu của tên tệp.
    int startIndex = imageUrl.lastIndexOf("/") + 1;
    int endIndex = imageUrl.lastIndexOf(".");
    if (startIndex != -1 && endIndex != -1) {
        return imageUrl.substring(startIndex, endIndex);
    }
    return null;

}
    //delete product by id
   public void deleteProductById(Integer id) throws java.io.IOException{
    //lay san pham can xoa
    Optional<Product> productOptional    =    productRepository.findById(id);
    //neu khong có sẽ gán gt cho Product la null
    Product product = productOptional.orElse(null);
  if (product!=null) {
     // Xóa các ảnh liên quan
     List<Image> images = product.getImages();
       for (Image image : images) {

            cloudinary.uploader().destroy(getPublicIdImage(image.getImageUrl()), ObjectUtils.emptyMap());
        }
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
//Khi đã tìm thấy hình ảnh có URL trùng khớp với URL cần xóa,
// chúng ta không cần duyệt qua các hình ảnh còn lại trong danh sách images. 
//Việc tiếp tục duyệt qua các hình ảnh không cần thiết sẽ tăng độ phức tạp của thuật toán và làm mất thời gian thực hiện.
public void deleteImage(Integer productId,List<String> imgsUrlDelete) throws java.io.IOException {
    List<Image> images = imageRepository.findByProductId(productId);
    for (String imgUrl : imgsUrlDelete) {
        for (Image image : images) {
            if (image.getImageUrl().equals(imgUrl)) {
                imageRepository.delete(image);
                cloudinary.uploader().destroy(getPublicIdImage(image.getImageUrl()), ObjectUtils.emptyMap());
                break;
            }
        }
    }
}
public List<Product> getProductByCategoryId(Integer id){
    return productRepository.findByCategoryId(id);
}
    //nhận vào là fie ảnh trả ra danh sách path ảnh để lưu vào db
     public List<String> saveImagesToCloudinary(List<MultipartFile> images) throws IOException, java.io.IOException {
     
        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile image : images) {
            Map<?,?> uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
            //get url image
            String imageUrl = (String) uploadResult.get("secure_url");
            System.out.println("key ảnh:"+uploadResult);
            imageUrls.add(imageUrl);
        }
        return imageUrls;
    }

}
