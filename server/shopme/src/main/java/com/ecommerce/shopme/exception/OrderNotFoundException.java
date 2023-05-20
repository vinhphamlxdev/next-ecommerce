package com.ecommerce.shopme.exception;

public class OrderNotFoundException  extends Exception{
    public OrderNotFoundException(String message){
        super(message);
    }
}
