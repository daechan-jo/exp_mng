package com.expmng.back.modules.product.dto;

import com.expmng.back.modules.product.infrastructure.entity.Product;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProductDto {

	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Request {
		@NotBlank(message = "제품명은 필수입니다.")
		private String name;

		private String code;

		@PositiveOrZero(message = "가격은 0 이상이어야 합니다.")
		private Integer price;

		private Integer stock;

		// Entity 변환 메서드
		public Product toEntity() {
			return Product.builder()
				.name(name)
				.code(code)
				.price(price)
				.stock(stock)
				.build();
		}
	}

	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Response {
		private Long id;
		private String name;
		private String code;
		private Integer price;
		private Integer stock;
		private LocalDateTime createdAt;
		private LocalDateTime updatedAt;

		@Builder.Default
		private List<ExpDto.Response> exps = new ArrayList<>();

		// Entity에서 DTO로 변환하는 생성자
		public static Response fromEntity(Product product) {
			ResponseBuilder builder = Response.builder()
				.id(product.getId())
				.name(product.getName())
				.code(product.getCode())
				.price(product.getPrice())
				.stock(product.getStock())
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

	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class UpdateRequest {
		private String name;
		private String code;
		private Integer price;
		private Integer stock;

		public void updateEntity(Product product) {
			if (name != null) product.setName(name);
			if (code != null) product.setCode(code);
			if (price != null) product.setPrice(price);
			if (stock != null) product.setStock(stock);
		}
	}
}