package com.expmng.back.common;

import com.expmng.back.modules.product.infrastructure.entity.Product;
import com.expmng.back.modules.product.infrastructure.repository.ProductRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;

@Component
public class ProductCsvImporter implements CommandLineRunner {

	private final ProductRepository productRepository;

	@Autowired
	public ProductCsvImporter(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	@Override
	public void run(String... args) throws Exception {
//		importProductsFromCsv();
	}

	private void importProductsFromCsv() {
		// CSV 파일 경로 설정 (프로젝트 루트 디렉토리에 products.csv가 있다고 가정)
		for (int i = 1; i < 8; i++) {
			Path path = Paths.get("../data/cu_products_" + i + ".csv");
			String csvFilePath = path.toAbsolutePath().toString();

			try (CSVReader reader = new CSVReader(new FileReader(csvFilePath))) {
				String[] line;
				// 헤더 건너뛰기 (첫 번째 줄이 헤더인 경우)
				reader.readNext();

				// 각 행을 읽어 Product 엔티티로 변환하여 저장
				while ((line = reader.readNext()) != null) {
					if (line.length >= 2) {  // 최소한 상품명과 가격 컬럼은 있어야 함
						String name = line[0].trim();  // 첫 번째 컬럼: 상품명
						int price = parsePrice(line[1].trim());  // 두 번째 컬럼: 가격

						// 새 Product 객체 생성 (code는 일단 비워두거나 별도 로직으로 생성)
						Product product = Product.builder()
							.name(name)
							.price(price)
							.code(null)  // 상품 코드 생성 함수 (구현 필요)
							.exps(new ArrayList<>())  // 빈 리스트로 초기화
							.build();

						// 저장
						productRepository.save(product);
					}
				}
				System.out.println("CSV 데이터 임포트 완료!");
			} catch (IOException | CsvValidationException e) {
				System.err.println("CSV 파일 임포트 중 오류 발생: " + e.getMessage());
				e.printStackTrace();
			}
		}
	}

	// 가격을 문자열에서 정수로 변환 (쉼표, 원 기호 등 제거)
	private int parsePrice(String priceStr) {
		try {
			// 쉼표, 원, ₩ 등 제거
			String cleanPrice = priceStr.replaceAll("[^0-9]", "");
			return Integer.parseInt(cleanPrice);
		} catch (NumberFormatException e) {
			System.err.println("가격 변환 중 오류: " + priceStr);
			return 0; // 기본값 반환 또는 예외 처리
		}
	}

}