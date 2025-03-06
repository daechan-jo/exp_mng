package com.expmng.back.modules.product.infrastructure.repository;

import com.expmng.back.modules.product.infrastructure.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	Optional<Product> findByCode(String code);

	List<Product> findByNameContaining(String name);

	@Query(value = "SELECT * FROM products WHERE " +
		"name ILIKE %:query% OR " +
		"code ILIKE %:query% OR " +
		"similarity(name, :query) > 0.3 OR " +
		"similarity(code, :query) > 0.3 " +
		"ORDER BY " +
		"CASE WHEN name ILIKE %:query% OR code ILIKE %:query% THEN 1 ELSE 2 END, " +
		"similarity(name, :query) + similarity(code, :query) DESC",
		nativeQuery = true)
	List<Product> searchByNameOrCode(@Param("query") String query);
}