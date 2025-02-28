package com.expmng.back.modules.product.api;

import com.expmng.back.common.cqrs.command.CommandBus;
import com.expmng.back.modules.product.dto.ProductDto;
import com.expmng.back.modules.product.api.command.CreateProductCommand;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products/commands")
public class ProductCommandController {

	private final CommandBus commandBus;

	@Autowired
	public ProductCommandController(CommandBus commandBus) {
		this.commandBus = commandBus;
	}

	@PostMapping
	public ResponseEntity<ProductDto> createProduct(@Valid @RequestBody CreateProductCommand command) {
		ProductDto productDto = commandBus.execute(command);
		return new ResponseEntity<>(productDto, HttpStatus.CREATED);
	}
}