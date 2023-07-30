package com.ecommerce.shopme.request;

public class OrderRequest {
    private Integer productId;
    private Integer colorId;
    private Integer sizeId;
    private int amount;

    public OrderRequest() {
    }
    

    public OrderRequest(Integer productId, Integer colorId, Integer sizeId, int amount) {
        this.productId = productId;
        this.colorId = colorId;
        this.sizeId = sizeId;
        this.amount = amount;
    }


    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getColorId() {
        return colorId;
    }

    public void setColorId(Integer colorId) {
        this.colorId = colorId;
    }

    public Integer getSizeId() {
        return sizeId;
    }

    public void setSizeId(Integer sizeId) {
        this.sizeId = sizeId;
    }

    public int getamount() {
        return amount;
    }

    public void setamount(int amount) {
        this.amount = amount;
    }

    
}
