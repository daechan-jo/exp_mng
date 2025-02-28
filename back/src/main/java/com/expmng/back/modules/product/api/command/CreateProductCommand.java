package com.expmng.back.modules.product.api.command;

import com.expmng.back.common.cqrs.command.Command;
import com.expmng.back.modules.product.dto.ProductDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductCommand implements Command<ProductDto> {
	@NotBlank(message = "상품명은 필수입니다")
	@Size(max = 255, message = "상품명은 255자를 초과할 수 없습니다")
	private String name;

	@Size(max = 1000, message = "설명은 1000자를 초과할 수 없습니다")
	private String code;

	@NotNull(message = "가격은 필수입니다")
	@Positive(message = "가격은 양수여야 합니다")
	private Integer price;

	@Positive(message = "재고는 양수여야 합니다")
	private Integer stock;
}