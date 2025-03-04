package com.expmng.back.modules.product.dto;

import com.expmng.back.modules.product.infrastructure.entity.Product;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class ProductDto {

	@Schema(description = "제품 생성 요청 DTO")
	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Request {
		@Schema(description = "제품명", example = "농심)신라면")
		@NotBlank(message = "제품명은 필수입니다.")
		private String name;

		@Schema(description = "제품 코드", example = "PROD001")
		private String code;

		@Schema(description = "제품 가격", example = "1000000")
		@PositiveOrZero(message = "가격은 0 이상이어야 합니다.")
		private Integer price;

		// Entity 변환 메서드
		public Product toEntity() {
			return Product.builder()
				.name(name)
				.code(code)
				.price(price)
				.build();
		}
	}

	@Schema(description = "제품 응답 DTO")
	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Response {
		@Schema(description = "제품 ID", example = "1")
		private Long id;

		@Schema(description = "제품명", example = "스마트폰 XYZ")
		private String name;

		@Schema(description = "제품 코드", example = "PROD-001")
		private String code;

		@Schema(description = "제품 가격", example = "1000000")
		private Integer price;


		@Schema(description = "생성 시간")
		private LocalDateTime createdAt;

		@Schema(description = "최종 수정 시간")
		private LocalDateTime updatedAt;

		@Schema(description = "재고 이력 목록")
		@Builder.Default
		private List<ExpDto.Response> exps = new ArrayList<>();

		// Entity에서 DTO로 변환하는 생성자
		public static Response fromEntity(Product product) {
			ResponseBuilder builder = Response.builder()
				.id(product.getId())
				.name(product.getName())
				.code(product.getCode())
				.price(product.getPrice())
				.createdAt(product.getCreatedAt())
				.updatedAt(product.getUpdatedAt());

			if (product.getExps() != null) {
				builder.exps(
					product.getExps().stream()
						.map(ExpDto.Response::fromEntity)
						.collect(Collectors.toList())
				);
			}

			return builder.build();
		}
	}

	@Schema(description = "제품 수정 요청 DTO")
	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class UpdateRequest {
		@Schema(description = "제품명", example = "스마트폰 XYZ Pro")
		private String name;

		@Schema(description = "제품 코드", example = "PROD-002")
		private String code;

		@Schema(description = "제품 가격", example = "1200000")
		private Integer price;

		public void updateEntity(Product product) {
			if (name != null) product.setName(name);
			if (code != null) product.setCode(code);
			if (price != null) product.setPrice(price);
		}
	}

	@Schema(description = "유통기한 임박 상품 응답 DTO")
	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class ExpProductResponse {
		@Schema(description = "제품 ID", example = "1")
		private Long productId;

		@Schema(description = "제품명", example = "농심)신라면")
		private String productName;

		@Schema(description = "제품 코드", example = "PROD-001")
		private String productCode;

		@Schema(description = "제품 가격", example = "1000")
		private Integer price;

		@Schema(description = "재고 ID", example = "1")
		private Long expId;

		@Schema(description = "재고 수량", example = "10")
		private Integer stock;

		@Schema(description = "유통기한", example = "2023-12-31")
		private Date deadline;
	}
}