package com.ecommerce.shopme.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.shopme.entity.Color;
import com.ecommerce.shopme.entity.Size;
import com.ecommerce.shopme.repository.ColorRepository;
import com.ecommerce.shopme.repository.SizeRepository;

@Service
public class ColorService {
    @Autowired
    ColorRepository colorRepository;

    public List<Color> listAllColor(){
        return colorRepository.findAll();
    }
    public List<Color> getColorByProductId(Integer productId){
        return colorRepository.findByProductId(productId);
    }
}
