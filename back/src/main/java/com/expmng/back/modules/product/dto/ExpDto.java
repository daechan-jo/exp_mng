package com.expmng.back.modules.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExpDto {
	private Long id;
	private Integer amount;
	private Boolean status;
	private Long createdAt;
	private Long updatedAt;
}
