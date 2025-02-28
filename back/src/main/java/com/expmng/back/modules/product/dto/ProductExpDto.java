package com.expmng.back.modules.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductExpDto {
	private Long productId;
	private String name;
	private String code;
	private BigDecimal price;
	private Integer stock;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	private Long expId;
	private Integer amount;
	private Boolean status;
	private Long expCreatedAt;
	private Long expUpdatedAt;
}
