package com.expmng.back.modules.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class StatusDto {

	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Count {
		private Long falseCount;
		private Long trueCount;
	}
}
