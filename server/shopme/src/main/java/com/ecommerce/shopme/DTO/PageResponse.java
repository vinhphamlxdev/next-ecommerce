package com.ecommerce.shopme.DTO;

import lombok.*;

@Data
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
    
}
