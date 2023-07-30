package com.ecommerce.shopme.dto;

import lombok.*;

@NoArgsConstructor
public class PageResponse <T> {
    private T current;
    private T itemsPerPage;
    private T totalItems;
    private T totalPages;
    // private boolean lastPage;
    public PageResponse(T current, T itemsPerPage, T totalItems, T totalPages) {
        this.current = current;//  trang hiện tại
        this.itemsPerPage = itemsPerPage;// Số mục trên mỗi trang
        this.totalItems = totalItems;// Tổng số mục
        this.totalPages = totalPages;// Tổng số trang
        // this.lastPage = lastPage;//trang cuoi
    }
    public T getCurrent() {
        return current;
    }
    public void setCurrent(T current) {
        this.current = current;
    }
    public T getItemsPerPage() {
        return itemsPerPage;
    }
    public void setItemsPerPage(T itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
    }
    public T getTotalItems() {
        return totalItems;
    }
    public void setTotalItems(T totalItems) {
        this.totalItems = totalItems;
    }
    public T getTotalPages() {
        return totalPages;
    }
    public void setTotalPages(T totalPages) {
        this.totalPages = totalPages;
    }
    
}
