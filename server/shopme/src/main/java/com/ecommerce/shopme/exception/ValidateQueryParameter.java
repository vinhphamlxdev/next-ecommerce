package com.ecommerce.shopme.exception;

import java.util.*;
 
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
 
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
 
@ControllerAdvice
public class ValidateQueryParameter {
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Object handleRequestValidationException(Exception ex, HttpServletRequest request) {
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("timestamp", new Date());
        responseBody.put("status", HttpStatus.BAD_REQUEST.value());
        responseBody.put("error", ex.getMessage());
        responseBody.put("path", request.getServletPath());
         
        return responseBody;
    }
 
}