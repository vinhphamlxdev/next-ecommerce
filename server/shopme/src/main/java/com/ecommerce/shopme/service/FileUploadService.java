package com.ecommerce.shopme.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.shopme.exception.FileStorageException;

import org.springframework.util.StringUtils;

@Service
public class FileUploadService {

  @Value("${file.upload-dir}")
  private String uploadDir;

  public String saveFile(MultipartFile file) {
    try {
      // Lấy tên tệp
      String fileName = StringUtils.cleanPath(file.getOriginalFilename());

      // Tạo đường dẫn đầy đủ đến thư mục lưu trữ
      Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();

      // Tạo thư mục lưu trữ nếu nó chưa tồn tại
      if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
      }

      // Tạo đường dẫn đầy đủ đến tệp ảnh
      Path filePath = uploadPath.resolve(fileName).normalize();

      // Lưu tệp ảnh vào thư mục lưu trữ
      Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

      // Trả về đường dẫn đầy đủ đến tệp ảnh
      return filePath.toString();

    } catch (IOException ex) {
      throw new FileStorageException("Could not store file " + file.getOriginalFilename() + ". Please try again!", ex);
    }
  }
}
