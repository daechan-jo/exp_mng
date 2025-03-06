import { ExpProduct } from '../models/ExpProduct';

const API_BASE_URL = 'http://localhost:8080/api';

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
  const url = `${API_BASE_URL}/products/expiring?page=${page}&size=${size}&status=${statusParam}`;

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
  const url = `${API_BASE_URL}/products/expiring/count`;

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
export const toggleProductStatus = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products/exp/${id}/toggle-status`, {
    method: 'PUT',
  });

  if (!response.ok) {
    throw new Error(`Failed to toggle product status: ${response.status}`);
  }
};
