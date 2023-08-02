package com.ecommerce.shopme.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ecommerce.shopme.dto.CategorySummaryDTO;
import com.ecommerce.shopme.dto.PageResponse;
import com.ecommerce.shopme.dto.ProductDTO;
import com.ecommerce.shopme.config.CloudinaryConfig;
import com.ecommerce.shopme.dto.ProductDetail;
import com.ecommerce.shopme.entity.Category;
import com.ecommerce.shopme.entity.Color;
import com.ecommerce.shopme.entity.Discount;
import com.ecommerce.shopme.entity.Image;
import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.entity.Size;
import com.ecommerce.shopme.exception.ProductNotFoundException;
import com.ecommerce.shopme.repository.DiscountRepository;
import com.ecommerce.shopme.service.CategoryService;
import com.ecommerce.shopme.service.OrderDetailService;
import com.ecommerce.shopme.service.OrderService;
import com.ecommerce.shopme.service.ProductSevice;
import com.ecommerce.shopme.service.SizeService;
import com.ecommerce.shopme.utils.SlugUtils;

import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;

@CrossOrigin(origins = "http://localhost:4000", maxAge = -1,allowedHeaders = "*")
@RestController
@Validated
public class ProductController {
    @Autowired 
    ProductSevice productService;
    @Autowired
    CategoryService categoryService;
    @Autowired 
    OrderService orderService;
    @Autowired 
    OrderDetailService orderDetailService;
    //GET
    @Autowired 
    Cloudinary cloudinary;
 
    @Autowired 
    DiscountRepository discountRepository;
    @RolesAllowed({"ROLE_ADMIN","ROLE_CUSTOMER"})
    @GetMapping("/products")
    public ResponseEntity<?> getAllProduct(@RequestParam(defaultValue = "0") int pageNum,
    @RequestParam(defaultValue = "10") int itemsPerPage, @RequestParam(name = "category",
    required = false)  String categorySlug,@RequestParam(name = "sortfield",required = false) String sortField,
    @RequestParam(name = "sortdir",required = false) String sortDir
    
    ){
        Page<Product> page ; 
        if (categorySlug!=null && !categorySlug.isEmpty()) {
            page = productService.listByPageProductAndCategorySlug(pageNum, itemsPerPage,
             categorySlug,sortField,sortDir
          );
        }else{
         page =    productService.listByPageProduct(pageNum,itemsPerPage,sortField,sortDir);
        }
        List<Product> listProductsByPage = page.getContent();
        List<ProductDetail> listProducts = listProductsByPage.stream()
        .map(product -> {
                ProductDetail productDetail = new ProductDetail();
                productDetail.setId(product.getId());
                productDetail.setName(product.getName());
                productDetail.setShortDescription(product.getShortDescription());
                productDetail.setPrice(product.getPrice());
                productDetail.setQuantity(product.getQuantity());
                productDetail.setSlug(product.getSlug());
                productDetail.setDelete(product.isDelete());
                productDetail.setCategory(product.getCategory());
                productDetail.setDiscount(product.getDiscount());
                List<Size> sizes = new ArrayList<>();
                for (Size size : product.getSizes()) {
                    sizes.add(size);
                }
                productDetail.setSizes(sizes);
                   List<Color> colors = new ArrayList<>();
                for (Color color : product.getColors()) {
                    colors.add(color);
                }
                productDetail.setColors(colors);
                List<String> imageUrls = new ArrayList<>();
                for (Image image : product.getImages()) {
                    imageUrls.add(image.getImageUrl());
                }
                productDetail.setImageUrls(imageUrls);
                return productDetail;
            })
            .collect(Collectors.toList());
         Map<String,Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("products", listProducts);
         PageResponse paggination = new PageResponse<>();
                paggination.setCurrent(page.getNumber());
                paggination.setItemsPerPage(page.getSize());
                paggination.setTotalItems(page.getTotalElements());
                paggination.setTotalPages(page.getTotalPages());
                response.put("page", paggination);
                  return ResponseEntity.ok(response);
    
    }

    @RolesAllowed({"ROLE_ADMIN","ROLE_CUSTOMER"})
    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") @Positive(message = "Id san pham toi thieu la 0") Integer id){
        Product productExist = productService.getProductById(id);
        if (productExist==null) {
            return ResponseEntity.notFound().build();
        }
          
            ProductDetail productDetail = new ProductDetail();
            productDetail.setId(productExist.getId());
            productDetail.setName(productExist.getName());
            productDetail.setShortDescription(productExist.getShortDescription());
            productDetail.setPrice(productExist.getPrice());
            productDetail.setQuantity(productExist.getQuantity());
            productDetail.setDelete(productExist.isDelete());
            productDetail.setSlug(productExist.getSlug());
            productDetail.setCategory(productExist.getCategory());
             productDetail.setDiscount(productExist.getDiscount());
              List<String> pathImgs = new ArrayList<>();
                      for (Image imageUrls : productExist.getImages()) {
                        pathImgs.add(imageUrls.getImageUrl());
                    }
                     productDetail.setImageUrls(pathImgs);
               List<Size> sizes = new ArrayList<>();
                      for (Size size : productExist.getSizes()) {
                        sizes.add(size);
                    }
            productDetail.setSizes(sizes);
                    
             List<Color> colors = new ArrayList<>();
                      for (Color color : productExist.getColors()) {
                        colors.add(color);
                    }
            productDetail.setColors(colors);
            Map<String,Object> response = new HashMap<>();
            response.put("product", productDetail);
            response.put("status", "success");
                return ResponseEntity.ok(response);
    }
    @RolesAllowed({"ROLE_ADMIN","ROLE_CUSTOMER"})
    @GetMapping("/products/slug/{slug}")
    public ResponseEntity<?> getProductSlugName(@PathVariable("slug")  String slugName){
        Product productExist = productService.getProductBySlug(slugName);
        if (productExist==null) {
            return ResponseEntity.notFound().build();
        }
          
            ProductDetail productDetail = new ProductDetail();
            productDetail.setId(productExist.getId());
            productDetail.setName(productExist.getName());
            productDetail.setShortDescription(productExist.getShortDescription());
            productDetail.setPrice(productExist.getPrice());
            productDetail.setQuantity(productExist.getQuantity());
            productDetail.setDelete(productExist.isDelete());
            productDetail.setSlug(productExist.getSlug());
            productDetail.setCategory(productExist.getCategory());
             productDetail.setDiscount(productExist.getDiscount());
              List<String> pathImgs = new ArrayList<>();
                      for (Image imageUrls : productExist.getImages()) {
                        pathImgs.add(imageUrls.getImageUrl());
                    }
                     productDetail.setImageUrls(pathImgs);
               List<Size> sizes = new ArrayList<>();
                      for (Size size : productExist.getSizes()) {
                        sizes.add(size);
                    }
            productDetail.setSizes(sizes);
                    
             List<Color> colors = new ArrayList<>();
                      for (Color color : productExist.getColors()) {
                        colors.add(color);
                    }
            productDetail.setColors(colors);
            Map<String,Object> response = new HashMap<>();
            response.put("product", productDetail);
            response.put("status", "success");
                return ResponseEntity.ok(response);
    }

    @RolesAllowed("ROLE_ADMIN")
    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@ModelAttribute @Valid ProductDTO productRequest,
     @RequestParam("category") Integer categoryId
     ) throws io.jsonwebtoken.io.IOException, IOException {
            //lay danh muc tu co so du lieu
         Category category = categoryService.getCategoryById(categoryId);
            if (category==null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy danh mục voi id"+categoryId);
            }
            String productName = productRequest.getName();
            boolean isProductSameName = productService.checkDuplicate(productName);
            if (isProductSameName) {
                 return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tên sản phẩm đã tồn tại");
            }
            // Lưu thông tin sản phẩm
            Product product = new Product();
            // BeanUtils.copyProperties(productRequest, product);
            product.setName(productRequest.getName());
            product.setShortDescription(productRequest.getShortDescription());
            product.setPrice(productRequest.getPrice());
            product.setQuantity(productRequest.getQuantity());
            product.setSlug(product.getSlug());
            product.setDelete(false);
            product.setSlug(SlugUtils.createSlug(productRequest.getName()));
            product.setCreatedAt(new Date());
            Discount  discount = new Discount();
            float priceDiscount = productRequest.getDiscountPrice();
            discount.setDiscountPrice(priceDiscount);
            discount.setOriginalPrice(product.getPrice());
            discount.setProductName(product.getName());
            discount.setDiscountPercent(product.getPrice(), priceDiscount);
              product.setCategory(category);

              Product createdProduct = productService.saveProduct(product);
              discount.setProduct(createdProduct);
              discountRepository.save(discount);
            
            //save img file
            List<String> imgUrls = productService.saveImagesToCloudinary(productRequest.getImages());
             for (String imgUrl : imgUrls) {
             productService.addImageToProduct(createdProduct.getId(), imgUrl);
             }
  
                          //them mau cho san pham
                           List<String> colorNames = productRequest.getColors();
                            for (String colorName : colorNames) {
                                productService.addColorToProduct(createdProduct.getId(), colorName);
                            }
                           List<String> sizeNames = productRequest.getSizes();
                            for (String sizeName : sizeNames) {
                                productService.addSizeToProduct(createdProduct.getId(), sizeName);
                            }
                           
             return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }
  
 
//     //PUT
    @RolesAllowed("ROLE_ADMIN")
    @PutMapping("/products/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Integer productId ,
    @ModelAttribute @Valid ProductDTO productRequest,
     @RequestParam("category") Integer categoryId,
      @RequestParam("imgsDelete") List<String> imgsDelete,
      @RequestParam("sizesDelete") Set<Integer> sizesDelete,
      @RequestParam("colorsDelete") Set<Integer> colorDelete
     ) throws IOException{
            // Kiểm tra sản phẩm có tồn tại hay không
        Product existingProduct = productService.getProductById(productId);
        if (existingProduct == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm voi id:"+productId);
        }
        // Lấy danh sách danh mục từ danh sách mã danh mục
           Category category = categoryService.getCategoryById(categoryId);
              if (category==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Khong tim thay danh muc");
        }
       
          // Cập nhật thông tin của sản phẩm dựa trên đối tượng updatedProduct
            existingProduct.setName(productRequest.getName());
            existingProduct.setPrice(productRequest.getPrice());
            existingProduct.setShortDescription(productRequest.getShortDescription());
            existingProduct.setPrice(productRequest.getPrice());
            existingProduct.setDelete(false);
            existingProduct.setQuantity(productRequest.getQuantity());
            existingProduct.setSlug(SlugUtils.createSlug(productRequest.getName()));
            existingProduct.setUpdatedAt(new Date());
            Discount existdiscount = discountRepository.findByProductId(productId);
            if (existdiscount!= null) {
                existdiscount.setDiscountPrice(productRequest.getDiscountPrice());
                existdiscount.setProductName(productRequest.getName());
                existdiscount.setOriginalPrice(productRequest.getPrice());
                existdiscount.setDiscountPercent(existingProduct.getPrice(), productRequest.getDiscountPrice());
                discountRepository.save(existdiscount);
            }
              // Cập nhật  danh mục cho sản phẩm
              existingProduct.setCategory(category);
      List<MultipartFile> images = productRequest.getImages();
        if (!images.isEmpty()) {
            //luu vao cloudinary
        List<String> imgUrls = productService.saveImagesToCloudinary(images);

        for (String imgUrl : imgUrls) {
        productService.addImageToProduct(existingProduct.getId(), imgUrl);

        }
         }
           
            //xu ly luu size
                Set<String> sizeNames = new HashSet<>(productRequest.getSizes());
                if (!sizeNames.isEmpty()) {
                    for (String sizeName : sizeNames) {
                        productService.addSizeToProduct(existingProduct.getId(), sizeName);
                    }
                }
                 Set<String> colorNames = new HashSet<>(productRequest.getColors());
                if (!colorNames.isEmpty()) {
                    for (String colorName : colorNames) {
                        productService.addColorToProduct(existingProduct.getId(), colorName);
                    }
                }
                 //xử lý xóa danh sách ảnh
                productService.deleteImage(existingProduct.getId(),imgsDelete);
                productService.deleteSize(existingProduct.getId(), sizesDelete,sizeNames);
                productService.deleteColor(existingProduct.getId(), colorDelete,colorNames);
        //cập nhật sản phẩm
            Product updatedProduct = productService.saveProduct(existingProduct);
                
         return ResponseEntity.ok(updatedProduct);
    }
   @RolesAllowed({"ROLE_ADMIN","ROLE_CUSTOMER"})
    @GetMapping("/products/search")
    public ResponseEntity<?> listProductByKeyword(@RequestParam(name = "keyword") String keyword){
        List<Product> products = productService.getByKeyword(keyword);
        if (products.isEmpty()) {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm với tên:"+keyword);

        }
        List<ProductDetail> listProducts = products.stream()
        .map(product -> {
                ProductDetail productDetail = new ProductDetail();
                productDetail.setId(product.getId());
                productDetail.setName(product.getName());
                productDetail.setShortDescription(product.getShortDescription());
                productDetail.setPrice(product.getPrice());
                productDetail.setQuantity(product.getQuantity());
                productDetail.setSlug(product.getSlug());
                productDetail.setDelete(product.isDelete());
                productDetail.setCategory(product.getCategory());
                List<Size> sizes = new ArrayList<>();
                for (Size size : product.getSizes()) {
                    sizes.add(size);
                }
                productDetail.setSizes(sizes);
                   List<Color> colors = new ArrayList<>();
                for (Color color : product.getColors()) {
                    colors.add(color);
                }
                productDetail.setColors(colors);
                List<String> imageUrls = new ArrayList<>();
                for (Image image : product.getImages()) {
                    imageUrls.add(image.getImageUrl());
                }
                productDetail.setImageUrls(imageUrls);
                return productDetail;
            })
            .collect(Collectors.toList());
           Map<String,Object> response = new HashMap<>();
            response.put("products", listProducts);
            response.put("status", "success");
                return ResponseEntity.ok(response);
        
    }
//   //DELETE
  @DeleteMapping("/products/{id}")
 public ResponseEntity<?> deleteProductById(@PathVariable @Positive Integer id) throws IOException{
    Product  existProduct = productService.getProductById(id);
        boolean checkHasOrder = orderDetailService.checkExistProductHasOrder(id);
        Map<String, Object> response = new HashMap<>();
        if (checkHasOrder) {
            if (existProduct!=null) {
                existProduct.setDelete(true);
                productService.saveProduct(existProduct);
                  return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sản phẩm đã được đặt hàng không thể xóa!");
            }
        }
            // Xóa sản phẩm
            productService.deleteProductById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Xóa sản phẩm thành công");
 }

}