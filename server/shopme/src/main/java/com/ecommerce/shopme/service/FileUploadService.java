package com.ecommerce.shopme.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUploadService {
    private final String uploadDir = "D:/uploads";

    public  String saveImage(MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageName = generateFileName(imageFile.getOriginalFilename());
            Path imagePath = Paths.get(uploadDir + imageName);
            Files.copy(imageFile.getInputStream(), imagePath);
            return imagePath.toString();
        }
        return null;
    }

    private String generateFileName(String fileName) {
        return UUID.randomUUID().toString() + "_" + fileName;
    }
}
