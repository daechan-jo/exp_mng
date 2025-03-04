package com.expmng.back.modules.product.dto.base;

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
public class ProductExpDTO {
	private Long productId;
	private String name;
	private String code;
	private BigDecimal price;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	private Long expId;
	private Integer stock;
	private Boolean status;
	private Long expCreatedAt;
	private Long expUpdatedAt;
}
