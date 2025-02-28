package com.expmng.back.modules.product.handler.command;


import com.expmng.back.common.cqrs.command.CommandHandler;
import com.expmng.back.modules.product.core.ProductService;
import com.expmng.back.modules.product.infrastructure.entities.Product;
import com.expmng.back.modules.product.dto.ProductDto;
import com.expmng.back.modules.product.api.command.CreateProductCommand;
import com.expmng.back.modules.product.infrastructure.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class CreateProductHandler implements CommandHandler<CreateProductCommand, ProductDto> {

	private final ProductService productService;
	private final ProductRepository productRepository; // 유효성 검사용으로만 사용

	@Autowired
	public CreateProductHandler(ProductService productService, ProductRepository productRepository) {
		this.productService = productService;
		this.productRepository = productRepository;
	}

	@Override
	@Transactional
	public ProductDto handle(CreateProductCommand command) {
		// 비즈니스 유효성 검사 (예: 중복 코드 체크)
		if (productRepository.existsByCode(command.getCode())) {
			throw new IllegalArgumentException("이미 존재하는 상품 코드입니다: " + command.getCode());
		}

		// Command를 Entity로 변환
		Product product = Product.builder()
			.name(command.getName())
			.code(command.getCode())
			.code(command.getCode())
			.price(command.getPrice())
			.stock(command.getStock())
			.build();

		// 서비스를 통해 상품 생성
		return productService.createProduct(product);
	}
}