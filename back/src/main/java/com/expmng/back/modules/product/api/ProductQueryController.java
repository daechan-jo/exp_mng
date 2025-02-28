package com.expmng.back.modules.product.api;

import com.expmng.back.common.cqrs.query.QueryBus;
import com.expmng.back.modules.product.dto.ProductDto;
import com.expmng.back.modules.product.api.query.GetProductQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/products/queries")
public class ProductQueryController {

	private final QueryBus queryBus;

	@Autowired
	public ProductQueryController(QueryBus queryBus) {
		this.queryBus = queryBus;
	}

	@GetMapping("/{id}")
	public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
		GetProductQuery query = new GetProductQuery(id);
		ProductDto productDto = queryBus.execute(query);
		return ResponseEntity.ok(productDto);
	}
}