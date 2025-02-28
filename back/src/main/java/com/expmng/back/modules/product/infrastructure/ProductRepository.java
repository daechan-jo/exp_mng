package com.expmng.back.modules.product.infrastructure;

import com.expmng.back.modules.product.infrastructure.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	boolean existsByCode(String code);
}

