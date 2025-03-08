import { ExpProduct } from '../models/ExpProduct';
import { Product } from '../models/Product.ts';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type ProductResponse = {
  content: ExpProduct[];
  totalPages: number;
  last: boolean;
};

/**
 * 유통기한 상품 데이터를 가져오는 함수
 */
export const fetchExpiringProducts = async (
  status: 'pending' | 'completed',
  page: number,
  size = 10,
): Promise<ProductResponse> => {
  const statusParam = status === 'pending' ? 'false' : 'true';
  const url = `${API_BASE_URL}/products/exp?page=${page}&size=${size}&status=${statusParam}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return await response.json();
};

/**
 * 오늘 확인이 필요한 상품 카운트를 가져오는 함수
 */
export const fetchTodayPendingCount = async () => {
  const url = `${API_BASE_URL}/products/exp/count`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching today pending count:', error);
    return 0;
  }
};

/**
 * 상품 상태를 토글하는 함수
 */
export const toggleProductStatus = async (id: number, activeTab: string): Promise<void> => {
  const url = `${API_BASE_URL}/products/exp/${id}`;
  const newStatus = activeTab === 'pending';
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    throw new Error(`Failed to toggle product status: ${response.status}`);
  }
};

export const fetchProductsPage = async (page: number = 0, size: number = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error(`상품 목록 가져오기 실패: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('상품 목록 가져오기 중 오류 발생:', error);
    throw error;
  }
};

// 검색 (페이지네이션 적용)
export const searchProducts = async (query: string, page: number = 0, size: number = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/search?query=${encodeURIComponent(query)}&page=${page}&size=${size}`,
    );
    if (!response.ok) {
      throw new Error(`검색 실패: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('검색 중 오류 발생:', error);
    throw error;
  }
};

// 상품 삭제
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`상품 삭제 실패: ${response.status}`);
    }
  } catch (error) {
    console.error('상품 삭제 중 오류 발생:', error);
    throw error;
  }
};

// 상품 저장 (추가/수정)
export const saveProduct = async (product: Product): Promise<Product> => {
  try {
    const url = product.id ? `${API_BASE_URL}/products/${product.id}` : `${API_BASE_URL}/products`;
    const method = product.id ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`상품 저장 실패: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('상품 저장 중 오류 발생:', error);
    throw error;
  }
};

// 유통기한 추가 API
export const addExpiration = async (expData: {
  productId: number;
  deadline: string;
  stock: number;
}): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/exp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expData),
    });

    if (!response.ok) {
      throw new Error(`유통기한 추가 실패: ${response.status}`);
    }
  } catch (error) {
    console.error('유통기한 추가 중 오류 발생:', error);
    throw error;
  }
};
