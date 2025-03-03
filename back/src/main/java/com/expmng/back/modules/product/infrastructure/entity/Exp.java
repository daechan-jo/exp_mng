package com.expmng.back.modules.product.infrastructure.entity;

import com.expmng.back.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "exps")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Exp extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Integer amount;

	@Column(nullable = false)
	private Boolean status;


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;
}
