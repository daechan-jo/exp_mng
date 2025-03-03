package com.expmng.back.modules.product.api;

import com.expmng.back.modules.product.core.ProductService;
import com.expmng.back.modules.product.dto.ProductDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

	private final ProductService productService;

	@GetMapping
	public ResponseEntity<List<ProductDto.Response>> getAllProducts() {
		return ResponseEntity.ok(productService.getAllProducts());
	}

	@GetMapping("/in-stock")
	public ResponseEntity<List<ProductDto.Response>> getProductsInStock() {
		return ResponseEntity.ok(productService.getProductsInStock());
	}

	@GetMapping("/search")
	public ResponseEntity<List<ProductDto.Response>> searchProducts(@RequestParam String name) {
		return ResponseEntity.ok(productService.searchProductsByName(name));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ProductDto.Response> getProductById(@PathVariable Long id) {
		return ResponseEntity.ok(productService.getProductById(id));
	}

	@GetMapping("/code/{code}")
	public ResponseEntity<ProductDto.Response> getProductByCode(@PathVariable String code) {
		return ResponseEntity.ok(productService.getProductByCode(code));
	}

	@PostMapping
	public ResponseEntity<ProductDto.Response> createProduct(@Valid @RequestBody ProductDto.Request requestDto) {
		return new ResponseEntity<>(productService.createProduct(requestDto), HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ProductDto.Response> updateProduct(
		@PathVariable Long id,
		@Valid @RequestBody ProductDto.UpdateRequest updateDto) {
		return ResponseEntity.ok(productService.updateProduct(id, updateDto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
		productService.deleteProduct(id);
		return ResponseEntity.noContent().build();
	}
}