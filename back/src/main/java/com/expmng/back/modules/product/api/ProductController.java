package com.expmng.back.modules.product.api;

import com.expmng.back.modules.product.core.ProductService;
import com.expmng.back.modules.product.dto.ExpDto;
import com.expmng.back.modules.product.dto.ProductDto;
import com.expmng.back.modules.product.dto.StatusDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
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
	public ResponseEntity<Page<ProductDto.Response>> getAllProducts(
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size) {

		Pageable pageable = PageRequest.of(page, size);
		return ResponseEntity.ok(productService.getAllProducts(pageable));
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

	@Operation(summary = "유통기한 오름차순 조회", description = "유통기한 임박기간 오름차순으로 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공"),
	})
	@GetMapping("/exp")
	public ResponseEntity<Page<ProductDto.ExpProductResponse>> getExpiringProducts(
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size,
		@RequestParam(defaultValue = "deadline") String sort,
		@RequestParam(defaultValue = "false") boolean status) {

		Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
		return ResponseEntity.ok(productService.getExpiringProducts(pageable, status));
	}

	@Operation(summary = "오늘 유통기한 카운트 조회", description = "금일 유통기한 만료 제품 카운트 조회")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공"),
	})
	@GetMapping("/exp/count")
	public ResponseEntity<StatusDto.Count> getExpiringTodayCount() {
		StatusDto.Count count = productService.getExpiringTodayCount();
		return ResponseEntity.ok(count);
	}

	@Operation(summary = "유통기한 토글", description = "유통기한 확인/미확인 토글")
	@PutMapping("/exp/{id}")
	public ResponseEntity<ExpDto.Response> updateExp(
		@PathVariable Long id,
		@Valid @RequestBody ExpDto.UpdateRequest updateDto) {
		return ResponseEntity.ok(productService.updateExp(id, updateDto));
	}

	@GetMapping("/search")
	public ResponseEntity<Page<ProductDto.Response>> searchProducts(
		@RequestParam String query,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size) {

		Pageable pageable = PageRequest.of(page, size);

		return ResponseEntity.ok(productService.searchProducts(query, pageable));
	}
}