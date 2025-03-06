package com.expmng.back.modules.product.dto;

import com.expmng.back.modules.product.infrastructure.entity.Exp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

public class ExpDto {

	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Request {
		private Integer stock;
		private Boolean status;
		private Date deadline;

		public Exp toEntity() {
			return Exp.builder()
				.stock(stock)
				.status(status)
				.deadline(deadline)
				.build();
		}
	}

	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Response {
		private Long id;
		private Integer stock;
		private Boolean status;
		private Date deadline;
		private LocalDateTime createdAt;
		private LocalDateTime updatedAt;

		public static Response fromEntity(Exp exp) {
			return Response.builder()
				.id(exp.getId())
				.stock(exp.getStock())
				.status(exp.getStatus())
				.deadline(exp.getDeadline())
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
		private Boolean status;

		public void updateEntity(Exp exp) {
			if (status != null) exp.setStatus(status);
		}
	}
}