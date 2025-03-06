// models/Exp.ts
export interface Product {
  id: number;
  name: string;
  code: string;
  stock: number;
}

// 임의의 상품 데이터 생성
export const sampleProduct: Product[] = [
  {
    id: 1,
    name: '우유500ml',
    code: 'ML-500-01',
    stock: 6,
  },
  {
    id: 2,
    name: '샌드위치',
    code: 'SW-100-02',
    stock: 8,
  },
];
