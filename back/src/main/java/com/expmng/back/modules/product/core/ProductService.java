package com.expmng.back.modules.product.core;

import com.expmng.back.modules.product.dto.ProductDto;
import com.expmng.back.modules.product.infrastructure.entity.Product;
import com.expmng.back.modules.product.infrastructure.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

	private final ProductRepository productRepository;

	@Transactional(readOnly = true)
	public List<ProductDto.Response> getAllProducts() {
		return productRepository.findAll().stream()
			.map(ProductDto.Response::fromEntity)
			.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public ProductDto.Response getProductById(Long id) {
		Product product = productRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
		return ProductDto.Response.fromEntity(product);
	}

	@Transactional(readOnly = true)
	public ProductDto.Response getProductByCode(String code) {
		Product product = productRepository.findByCode(code)
			.orElseThrow(() -> new ResourceNotFoundException("Product not found with code: " + code));
		return ProductDto.Response.fromEntity(product);
	}

	@Transactional
	public ProductDto.Response createProduct(ProductDto.Request requestDto) {
		Product product = requestDto.toEntity();
		Product savedProduct = productRepository.save(product);
		return ProductDto.Response.fromEntity(savedProduct);
	}

	@Transactional
	public ProductDto.Response updateProduct(Long id, ProductDto.UpdateRequest updateDto) {
		Product product = productRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

		updateDto.updateEntity(product);
		Product updatedProduct = productRepository.save(product);
		return ProductDto.Response.fromEntity(updatedProduct);
	}

	@Transactional
	public void deleteProduct(Long id) {
		if (!productRepository.existsById(id)) {
			throw new ResourceNotFoundException("Product not found with id: " + id);
		}
		productRepository.deleteById(id);
	}

	@Transactional(readOnly = true)
	public List<ProductDto.Response> searchProductsByName(String name) {
		return productRepository.findByNameContaining(name).stream()
			.map(ProductDto.Response::fromEntity)
			.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public List<ProductDto.Response> getProductsInStock() {
		return productRepository.findAllInStock().stream()
			.map(ProductDto.Response::fromEntity)
			.collect(Collectors.toList());
	}
}