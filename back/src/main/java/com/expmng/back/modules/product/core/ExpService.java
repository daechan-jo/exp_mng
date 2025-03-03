package com.expmng.back.modules.product.core;

import com.expmng.back.modules.product.dto.ExpDto;
import com.expmng.back.modules.product.infrastructure.entity.Exp;
import com.expmng.back.modules.product.infrastructure.entity.Product;
import com.expmng.back.modules.product.infrastructure.repository.ExpRepository;
import com.expmng.back.modules.product.infrastructure.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpService {

	private final ExpRepository expRepository;
	private final ProductRepository productRepository;

	@Transactional(readOnly = true)
	public List<ExpDto.Response> getAllExpsByProductId(Long productId) {
		return expRepository.findByProductId(productId).stream()
			.map(ExpDto.Response::fromEntity)
			.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public ExpDto.Response getExpById(Long id) {
		Exp exp = expRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Exp not found with id: " + id));
		return ExpDto.Response.fromEntity(exp);
	}

	@Transactional
	public ExpDto.Response createExp(Long productId, ExpDto.Request requestDto) {
		Product product = productRepository.findById(productId)
			.orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

		Exp exp = requestDto.toEntity();
		exp.setProduct(product);

		Exp savedExp = expRepository.save(exp);
		return ExpDto.Response.fromEntity(savedExp);
	}

	@Transactional
	public ExpDto.Response updateExp(Long id, ExpDto.UpdateRequest updateDto) {
		Exp exp = expRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Exp not found with id: " + id));

		updateDto.updateEntity(exp);
		Exp updatedExp = expRepository.save(exp);
		return ExpDto.Response.fromEntity(updatedExp);
	}

	@Transactional
	public void deleteExp(Long id) {
		if (!expRepository.existsById(id)) {
			throw new ResourceNotFoundException("Exp not found with id: " + id);
		}
		expRepository.deleteById(id);
	}

	@Transactional(readOnly = true)
	public List<ExpDto.Response> getExpsByStatus(Boolean status) {
		return expRepository.findByStatus(status).stream()
			.map(ExpDto.Response::fromEntity)
			.collect(Collectors.toList());
	}
}