package com.expmng.back.modules.product.core;

import com.expmng.back.modules.product.dto.ExpDto;
import com.expmng.back.modules.product.dto.ProductDto;
import com.expmng.back.modules.product.dto.StatusDto;
import com.expmng.back.modules.product.infrastructure.entity.Exp;
import com.expmng.back.modules.product.infrastructure.entity.Product;
import com.expmng.back.modules.product.infrastructure.repository.ExpRepository;
import com.expmng.back.modules.product.infrastructure.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

	private final ProductRepository productRepository;
	private final ExpRepository expRepository;

	@Transactional(readOnly = true)
	public Page<ProductDto.Response> getAllProducts(Pageable pageable) {
		Page<Product> productPage = productRepository.findAll(pageable);
		return productPage.map(ProductDto.Response::fromEntity);
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

	/**
	 * 유통기한 임박 상품 조회 (status=false, 유통기한 오름차순)
	 *
	 * @param pageable 페이징 정보
	 * @return 유통기한 임박 상품 목록
	 */
	@Transactional()
	public Page<ProductDto.ExpProductResponse> getExpiringProducts(Pageable pageable, boolean status) {
		Page<Exp> expiringExps;
		if (status) {
			expiringExps = expRepository.findByStatusTrueOrderByDeadlineDesc(pageable);
		} else {
			expiringExps = expRepository.findByStatusFalseOrderByDeadlineAsc(pageable);
		}

		return expiringExps.map(exp -> {
			Product product = exp.getProduct();
			return ProductDto.ExpProductResponse.builder()
				.productId(product.getId())
				.productName(product.getName())
				.productCode(product.getCode())
				.price(product.getPrice())
				.standard(product.getStandard())
				.expId(exp.getId())
				.stock(exp.getStock())
				.deadline(exp.getDeadline())
				.status(exp.getStatus())
				.build();
		});
	}

	/**
	 * 금일 유통기한 만료 상품 카운트 조회
	 *
	 * @return Number
	 */
	@Transactional(readOnly = true)  // 읽기 전용 트랜잭션으로 성능 최적화
	public StatusDto.Count getExpiringTodayCount() {
		LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
		LocalDateTime endOfDay = LocalDate.now().atTime(23, 59, 59, 999999999);
		Long falseCount = expRepository.countByDeadlineBetweenAndStatusFalse(startOfDay, endOfDay);
		Long trueCount = expRepository.countByDeadlineBetweenAndStatusTrue(startOfDay, endOfDay);
		return new StatusDto.Count(falseCount, trueCount);
	}

	@Transactional
	public ExpDto.Response updateExp(Long id, ExpDto.UpdateRequest updateDto) {
		Exp exp = expRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

		updateDto.updateEntity(exp);
		Exp updatedExp = expRepository.save(exp);
		return ExpDto.Response.fromEntity(updatedExp);
	}

	public Page<ProductDto.Response> searchProducts(String query, Pageable pageable) {
		// PostgreSQL의 유사도 검색 활용
		Page<Product> productPage = productRepository.searchByNameOrCode(
			query, pageable
		);

		return productPage.map(ProductDto.Response::fromEntity);
	}
}