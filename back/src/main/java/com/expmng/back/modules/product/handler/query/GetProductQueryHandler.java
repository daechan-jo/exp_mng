package com.expmng.back.modules.product.handler.query;

import com.expmng.back.common.cqrs.query.QueryHandler;
import com.expmng.back.modules.product.core.ProductService;
import com.expmng.back.modules.product.dto.ProductDto;
import com.expmng.back.modules.product.api.query.GetProductQuery;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class GetProductQueryHandler implements QueryHandler<GetProductQuery, ProductDto> {

	private final ProductService productService;

	@Autowired
	public GetProductQueryHandler(ProductService productService) {
		this.productService = productService;
	}

	@Override
	@Transactional(readOnly = true)
	public ProductDto handle(GetProductQuery query) {
		return productService.getProductById(query.getId())
			.orElseThrow(() -> new EntityNotFoundException("상품을 찾을 수 없습니다: " + query.getId()));
	}
}