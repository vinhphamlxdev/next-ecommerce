package com.ecommerce.shopme.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.shopme.entity.Size;
import com.ecommerce.shopme.repository.SizeRepository;

@Service
public class SizeService {
    
    @Autowired
    SizeRepository sizeRepository;

    public List<Size> listAllSize(){
        return sizeRepository.findAll();
    }
    public List<Size> getSizeByProductId(Integer productId){
        return sizeRepository.findByProductId(productId);
    }
    
}
