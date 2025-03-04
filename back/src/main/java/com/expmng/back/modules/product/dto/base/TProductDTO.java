package com.expmng.back.modules.product.dto.base;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TProductDTO {
	private Long id;
	private String name;
	private String code;
	private Integer price;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}