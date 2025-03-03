package com.expmng.back.modules.product.dto;

import com.expmng.back.modules.product.infrastructure.entity.Exp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class ExpDto {

	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Request {
		private Integer amount;
		private Boolean status;

		public Exp toEntity() {
			return Exp.builder()
				.amount(amount)
				.status(status)
				.build();
		}
	}

	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Response {
		private Long id;
		private Integer amount;
		private Boolean status;
		private LocalDateTime createdAt;
		private LocalDateTime updatedAt;

		public static Response fromEntity(Exp exp) {
			return Response.builder()
				.id(exp.getId())
				.amount(exp.getAmount())
				.status(exp.getStatus())
				.createdAt(exp.getCreatedAt())
				.updatedAt(exp.getUpdatedAt())
				.build();
		}
	}

	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class UpdateRequest {
		private Integer amount;
		private Boolean status;

		public void updateEntity(Exp exp) {
			if (amount != null) exp.setAmount(amount);
			if (status != null) exp.setStatus(status);
		}
	}
}