package com.expmng.back.modules.product.api;

import com.expmng.back.modules.product.core.ExpService;
import com.expmng.back.modules.product.dto.ExpDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/products/{productId}/exps")
@RequiredArgsConstructor
public class ExpController {

	private final ExpService expService;

	@GetMapping
	public ResponseEntity<List<ExpDto.Response>> getAllExpsByProductId(@PathVariable Long productId) {
		return ResponseEntity.ok(expService.getAllExpsByProductId(productId));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ExpDto.Response> getExpById(@PathVariable Long id) {
		return ResponseEntity.ok(expService.getExpById(id));
	}

	@PostMapping
	public ResponseEntity<ExpDto.Response> createExp(
		@PathVariable Long productId,
		@Valid @RequestBody ExpDto.Request requestDto) {
		return new ResponseEntity<>(expService.createExp(productId, requestDto), HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ExpDto.Response> updateExp(
		@PathVariable Long id,
		@Valid @RequestBody ExpDto.UpdateRequest updateDto) {
		return ResponseEntity.ok(expService.updateExp(id, updateDto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteExp(@PathVariable Long id) {
		expService.deleteExp(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/status")
	public ResponseEntity<List<ExpDto.Response>> getExpsByStatus(@RequestParam Boolean status) {
		return ResponseEntity.ok(expService.getExpsByStatus(status));
	}
}