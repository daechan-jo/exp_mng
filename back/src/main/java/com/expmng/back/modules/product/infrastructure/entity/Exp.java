package com.expmng.back.modules.product.infrastructure.entity;

import com.expmng.back.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


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

	private Integer stock;

	@Column(nullable = false)
	private Boolean status;

	private Date deadline;


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;
}
