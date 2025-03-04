package com.expmng.back.modules.product.api;

import com.expmng.back.modules.product.core.ProductService;
import com.expmng.back.modules.product.dto.ProductDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Product")
public class ProductController {

	private final ProductService productService;

	@Operation(summary = "모든 제품 조회", description = "시스템에 등록된 모든 제품 목록을 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공",
			content = @Content(schema = @Schema(implementation = ProductDto.Response.class))),
		@ApiResponse(responseCode = "500", description = "서버 오류")
	})
	@GetMapping
	public ResponseEntity<List<ProductDto.Response>> getAllProducts() {
		return ResponseEntity.ok(productService.getAllProducts());
	}

	@Operation(summary = "재고가 있는 제품 조회", description = "재고가 있는 제품 목록만 조회합니다.")
	@GetMapping("/in-stock")
	public ResponseEntity<List<ProductDto.Response>> getProductsInStock() {
		return ResponseEntity.ok(productService.getProductsInStock());
	}

	@Operation(summary = "제품명으로 검색", description = "제품명에 특정 키워드가 포함된 제품을 검색합니다.")
	@GetMapping("/search")
	public ResponseEntity<List<ProductDto.Response>> searchProducts(@RequestParam String name) {
		return ResponseEntity.ok(productService.searchProductsByName(name));
	}

	@Operation(summary = "제품 상세 조회", description = "특정 ID의 제품 상세 정보를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공"),
		@ApiResponse(responseCode = "404", description = "제품을 찾을 수 없음")
	})
	@GetMapping("/{id}")
	public ResponseEntity<ProductDto.Response> getProductById(@PathVariable Long id) {
		return ResponseEntity.ok(productService.getProductById(id));
	}


	@Operation(summary = "제품 코드로 조회", description = "특정 코드의 제품을 조회합니다.")
	@GetMapping("/code/{code}")
	public ResponseEntity<ProductDto.Response> getProductByCode(@PathVariable String code) {
		return ResponseEntity.ok(productService.getProductByCode(code));
	}

	@Operation(summary = "제품 등록", description = "새로운 제품을 시스템에 등록합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "201", description = "제품 생성 성공"),
		@ApiResponse(responseCode = "400", description = "잘못된 요청")
	})
	@PostMapping
	public ResponseEntity<ProductDto.Response> createProduct(@Valid @RequestBody ProductDto.Request requestDto) {
		return new ResponseEntity<>(productService.createProduct(requestDto), HttpStatus.CREATED);
	}

	@Operation(summary = "제품 수정", description = "기존 제품 정보를 수정합니다.")
	@PutMapping("/{id}")
	public ResponseEntity<ProductDto.Response> updateProduct(
		@PathVariable Long id,
		@Valid @RequestBody ProductDto.UpdateRequest updateDto) {
		return ResponseEntity.ok(productService.updateProduct(id, updateDto));
	}

	@Operation(summary = "제품 삭제", description = "시스템에서 제품을 삭제합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "204", description = "삭제 성공"),
		@ApiResponse(responseCode = "404", description = "제품을 찾을 수 없음")
	})
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
		productService.deleteProduct(id);
		return ResponseEntity.noContent().build();
	}
}