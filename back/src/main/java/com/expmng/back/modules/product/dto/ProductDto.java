package com.expmng.back.modules.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
	private Long id;
	private String name;
	private String code;
	private Integer price;
	private Integer stock;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}