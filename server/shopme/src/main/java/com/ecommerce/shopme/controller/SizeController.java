package com.ecommerce.shopme.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.shopme.dto.SizeDTO;
import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.entity.Size;
import com.ecommerce.shopme.service.ProductSevice;
import com.ecommerce.shopme.service.SizeService;

@CrossOrigin(origins = "http://localhost:4000", maxAge = -1)
@RestController
public class SizeController {
//     @Autowired
//     SizeService sizeService;
//     @Autowired
//     ProductSevice productSevice;


    
//    @PostMapping("/{productId}/sizes")
//    public ResponseEntity<?> addSizeToProduct(@PathVariable Integer productId,@RequestBody List<SizeDTO> sizeDTOs ){
//        //kiemt tra san pham co ton tai khong
//        Product existProduct = productSevice.getProductById(productId);
//     if (existProduct==null) {
//          return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm với id"+productId);
//     }
//    List<Size> sizes = new ArrayList<>();
//    for (SizeDTO sizeRequesDt : sizeDTOs) {
//         Size size = new Size();
//         size.setName(sizeRequesDt.getName());
//         sizes.add(size);
//    }
//    //them danh sach size vao san pham
//    existProduct.setSizes(sizes);
//    productSevice.saveProduct(existProduct);
//    }
}
