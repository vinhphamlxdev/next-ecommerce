package com.ecommerce.shopme.exception;

import java.util.Date;
import java.util.List;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.lang.Nullable;
import org.springframework.validation.FieldError;

import jakarta.servlet.http.HttpServletRequest;
//@ControllerAdvice là một annotation trong Spring Framework được sử dụng để xác định một bean có nhiệm vụ
// xử lý các ngoại lệ toàn cục (global exception handling) trong ứng dụng.
@ControllerAdvice
public class GlobalExceptionHandle extends ResponseEntityExceptionHandler{
    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandle.class); 
@ExceptionHandler(Exception.class)
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
@ResponseBody
public ErrorDTO handleGenericException(HttpServletRequest request, Exception ex){
    ErrorDTO error = new ErrorDTO();
    error.setTimestamp(new Date());
    error.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
    error.addError(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase());
    error.setPath(request.getServletPath());
    LOGGER.error(ex.getMessage(),ex);
    return error;
}
@Override
@Nullable
protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
        HttpStatusCode status, WebRequest request) {

            ErrorDTO error = new ErrorDTO();
            error.setTimestamp(new Date());
            error.setStatus(HttpStatus.BAD_REQUEST.value());
            error.setPath(((ServletWebRequest) request).getRequest().getServletPath());
            List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
            fieldErrors.forEach(fieldError->{
                error.addError(fieldError.getDefaultMessage());
            });
            return new ResponseEntity<>(error, headers, status);
  

}


}
