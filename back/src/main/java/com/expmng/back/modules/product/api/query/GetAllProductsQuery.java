package com.expmng.back.modules.product.api.query;

import com.expmng.back.common.cqrs.query.Query;
import com.expmng.back.modules.product.dto.ProductDto;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
public class GetAllProductsQuery implements Query<List<ProductDto>> {
	// 파라미터가 필요 없는 쿼리
}