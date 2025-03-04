package com.expmng.back.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI openAPI() {
		return new OpenAPI()
			.info(new Info()
				.title("Product Management API")
				.description("제품 및 재고 관리 RESTful API")
				.version("v1.0.0")
				.contact(new Contact()
					.name("daechanjo")
					.email("daechan476@gmail.com")
					.url("https://example.com"))
				.license(new License()
					.name("Apache License Version 2.0")
					.url("https://www.apache.org/licenses/LICENSE-2.0")))
			.components(new Components()
				.addSecuritySchemes("bearer-jwt", new SecurityScheme()
					.type(SecurityScheme.Type.HTTP)
					.scheme("bearer")
					.bearerFormat("JWT")
					.in(SecurityScheme.In.HEADER)
					.name("Authorization")))
			.addSecurityItem(new SecurityRequirement().addList("bearer-jwt"));
	}
}