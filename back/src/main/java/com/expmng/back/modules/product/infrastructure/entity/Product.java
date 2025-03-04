package com.expmng.back.modules.product.infrastructure.entity;

import com.expmng.back.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Product extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "제품명은 필수입니다.")
	@Column(nullable = false)
	private String name;

	@Column(length = 100)
	private String code;

	@PositiveOrZero(message = "가격은 0 이상이어야 합니다.")
	@Column(nullable = false)
	private Integer price;

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Exp> exps;

	// 헬퍼 메서드
	public void addExp(Exp exp) {
		exps.add(exp);
		exp.setProduct(this);
	}

	public void removeExp(Exp exp) {
		exps.remove(exp);
		exp.setProduct(null);
	}
}