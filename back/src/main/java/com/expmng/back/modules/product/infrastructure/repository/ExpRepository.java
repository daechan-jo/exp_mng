package com.expmng.back.modules.product.infrastructure.repository;

import com.expmng.back.modules.product.infrastructure.entity.Exp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpRepository extends JpaRepository<Exp, Long> {
	List<Exp> findByProductId(Long productId);

	List<Exp> findByStatus(Boolean status);
}