package com.expmng.back.modules.product.infrastructure.repository;

import com.expmng.back.modules.product.infrastructure.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	Optional<Product> findByCode(String code);

	List<Product> findByNameContaining(String name);

	@Query("SELECT p FROM Product p WHERE p.stock > 0")
	List<Product> findAllInStock();
}