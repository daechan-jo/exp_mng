package com.expmng.back.modules.product.core;

import com.expmng.back.modules.product.dto.ProductDto;
import com.expmng.back.modules.product.infrastructure.entities.Product;
import com.expmng.back.modules.product.infrastructure.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepository;

	@Autowired
	public ProductServiceImpl(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	@Override
	@Transactional
	public ProductDto createProduct(Product product) {
		Product savedProduct = productRepository.save(product);
		return mapToDto(savedProduct);
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<ProductDto> getProductById(Long id) {
		return productRepository.findById(id).map(this::mapToDto);
	}

	@Override
	@Transactional(readOnly = true)
	public List<ProductDto> getAllProducts() {
		return productRepository.findAll().stream()
			.map(this::mapToDto)
			.collect(Collectors.toList());
	}

	private ProductDto mapToDto(Product product) {
		return ProductDto.builder()
			.id(product.getId())
			.name(product.getName())
			.code(product.getCode())
			.price(product.getPrice())
			.stock(product.getStock())
			.createdAt(product.getCreatedAt())
			.updatedAt(product.getUpdatedAt())
			.build();
	}
}