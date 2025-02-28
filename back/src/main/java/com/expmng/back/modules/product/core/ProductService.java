package com.expmng.back.modules.product.core;

import com.expmng.back.modules.product.dto.ProductDto;
import com.expmng.back.modules.product.infrastructure.entities.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
	ProductDto createProduct(Product product);

	Optional<ProductDto> getProductById(Long id);

	List<ProductDto> getAllProducts();
}