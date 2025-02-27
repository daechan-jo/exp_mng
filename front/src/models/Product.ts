// models/Product.ts
export interface Product {
  id: number;
  name: string; // 공백없이
  code: string;
  exp: string; // 유통기한
  amount: number; // 수량
  status: boolean; // 체크했는지 안했는지
}

// 임의의 상품 데이터 생성
export const sampleProducts: Product[] = [
  {
    id: 1,
    name: '우유500ml',
    code: 'ML-500-01',
    exp: '2025-03-01 08:00:00',
    amount: 6,
    status: false,
  },
  {
    id: 2,
    name: '샌드위치',
    code: 'SW-100-02',
    exp: '2025-03-01 09:00:00',
    amount: 8,
    status: false,
  },
  {
    id: 3,
    name: '도시락',
    code: 'ML-200-03',
    exp: '2025-03-01 10:00:00',
    amount: 3,
    status: false,
  },
  {
    id: 4,
    name: '과자A',
    code: 'SN-300-04',
    exp: '2025-03-01 11:30:00',
    amount: 12,
    status: false,
  },
  {
    id: 5,
    name: '컵라면',
    code: 'ND-100-05',
    exp: '2025-03-01 12:00:00',
    amount: 24,
    status: false,
  },
  { id: 6, name: '빵', code: 'BR-100-06', exp: '2025-03-01 13:15:00', amount: 5, status: false },
  {
    id: 7,
    name: '아이스크림',
    code: 'IC-200-07',
    exp: '2025-03-01 14:00:00',
    amount: 10,
    status: false,
  },
  {
    id: 8,
    name: '음료수',
    code: 'DR-300-08',
    exp: '2025-03-01 15:30:00',
    amount: 18,
    status: false,
  },
  {
    id: 9,
    name: '소시지',
    code: 'MT-100-09',
    exp: '2025-03-01 16:45:00',
    amount: 7,
    status: false,
  },
  {
    id: 10,
    name: '요거트',
    code: 'YG-150-10',
    exp: '2025-03-01 17:20:00',
    amount: 9,
    status: false,
  },
  {
    id: 11,
    name: '과일주스',
    code: 'JC-500-11',
    exp: '2025-03-01 18:00:00',
    amount: 4,
    status: false,
  },
  {
    id: 12,
    name: '초콜릿',
    code: 'CH-050-12',
    exp: '2025-03-01 19:30:00',
    amount: 15,
    status: false,
  },
  { id: 13, name: '치즈', code: 'CS-200-13', exp: '2025-03-01 20:00:00', amount: 6, status: false },
  {
    id: 14,
    name: '햄버거',
    code: 'BG-300-14',
    exp: '2025-03-01 21:15:00',
    amount: 3,
    status: false,
  },
  {
    id: 15,
    name: '물500ml',
    code: 'WT-500-15',
    exp: '2025-03-01 22:00:00',
    amount: 48,
    status: false,
  },
  {
    id: 16,
    name: '커피',
    code: 'CF-250-16',
    exp: '2025-03-01 22:30:00',
    amount: 12,
    status: false,
  },
  {
    id: 17,
    name: '케이크',
    code: 'CK-150-17',
    exp: '2025-03-01 23:00:00',
    amount: 2,
    status: false,
  },
  {
    id: 18,
    name: '쿠키',
    code: 'CK-100-18',
    exp: '2025-03-01 23:45:00',
    amount: 20,
    status: false,
  },
];
