package com.expmng.back.modules.product.api.query;

import com.expmng.back.common.cqrs.query.Query;
import com.expmng.back.modules.product.dto.ProductDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetProductQuery implements Query<ProductDto> {
	private Long id;
}