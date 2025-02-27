// pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { CheckCircle, ListChecks } from 'lucide-react';
import { Product, sampleProducts } from '../models/Product';
import ProductListItem from '../components/dashboard/ProductListItem';

const Dashboard: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
	const [showAnimation, setShowAnimation] = useState(false);

	// 서버에서 데이터 로드
	const loadData = () => {
		setLoading(true);

		// 서버에서 현재 날짜 기준 데이터를 가져옴
		setTimeout(() => {
			// 현재 날짜 기준 필터링 (테스트를 위해 모든 데이터 반환)
			const filteredData = [...sampleProducts];

			// 탭에 따라 정렬
			if (activeTab === 'pending') {
				// 확인 필요 탭: 미확인 상품만 보여주고 유통기한 순 정렬
				const pendingProducts = filteredData
					.filter(p => !p.status)
					.sort((a, b) => new Date(a.exp).getTime() - new Date(b.exp).getTime());

				setProducts(pendingProducts);
			} else {
				// 확인 완료 탭: 확인된 상품만 보여주고 최근 확인 순으로 정렬 (ID로 대체)
				const completedProducts = filteredData
					.filter(p => p.status)
					.sort((a, b) => b.id - a.id); // 실제로는 확인 일시 기준으로 정렬해야 함

				setProducts(completedProducts);
			}

			setShowAnimation(true);
			setLoading(false);

			// 애니메이션 플래그 초기화
			setTimeout(() => {
				setShowAnimation(false);
			}, 500);
		}, 500);
	};

	// 초기 데이터 로드
	useEffect(() => {
		loadData();
	}, [activeTab]); // 탭이 변경될 때마다 데이터 다시 로드

	// 체크 상태 토글
	const toggleCheck = (id: number) => {
		setProducts(prevProducts => {
			const updatedProducts = prevProducts.filter(product => product.id !== id);

			// 상태 변경
			const toggledProduct = sampleProducts.find(p => p.id === id);
			if (toggledProduct) {
				toggledProduct.status = !toggledProduct.status;
			}

			return updatedProducts;
		});
	};

	// 확인해야 할 상품과 확인한 상품 개수 계산
	const pendingCount = sampleProducts.filter(p => !p.status).length;
	const completedCount = sampleProducts.filter(p => p.status).length;

	return (
		<div className="p-4 h-full flex flex-col">
			{/* 탭 메뉴 */}
			<div className="grid grid-cols-2 gap-3 mb-4">
				<button
					onClick={() => setActiveTab('pending')}
					className={`rounded-lg p-3 flex flex-col justify-between transition-colors ${
						activeTab === 'pending'
							? 'bg-blue-50 border-2 border-blue-300'
							: 'bg-gray-100 border-2 border-transparent'
					}`}
				>
					<div className="flex items-center">
						<ListChecks size={18} className={`mr-2 ${activeTab === 'pending' ? 'text-blue-500' : 'text-gray-500'}`} />
						<span className={`text-sm font-medium ${activeTab === 'pending' ? 'text-blue-700' : 'text-gray-600'}`}>확인 필요</span>
					</div>
					<div className="mt-1">
						<span className={`text-2xl font-bold ${activeTab === 'pending' ? 'text-blue-900' : 'text-gray-700'}`}>{pendingCount}</span>
						<span className={`text-sm ml-1 ${activeTab === 'pending' ? 'text-blue-700' : 'text-gray-600'}`}>상품</span>
					</div>
				</button>

				<button
					onClick={() => setActiveTab('completed')}
					className={`rounded-lg p-3 flex flex-col justify-between transition-colors ${
						activeTab === 'completed'
							? 'bg-green-50 border-2 border-green-300'
							: 'bg-gray-100 border-2 border-transparent'
					}`}
				>
					<div className="flex items-center">
						<CheckCircle size={18} className={`mr-2 ${activeTab === 'completed' ? 'text-green-500' : 'text-gray-500'}`} />
						<span className={`text-sm font-medium ${activeTab === 'completed' ? 'text-green-700' : 'text-gray-600'}`}>확인 완료</span>
					</div>
					<div className="mt-1">
						<span className={`text-2xl font-bold ${activeTab === 'completed' ? 'text-green-900' : 'text-gray-700'}`}>{completedCount}</span>
						<span className={`text-sm ml-1 ${activeTab === 'completed' ? 'text-green-700' : 'text-gray-600'}`}>상품</span>
					</div>
				</button>
			</div>

			{/* 상품 목록 */}
			<div className="flex-grow overflow-y-auto bg-gray-50 rounded-lg">
				{loading ? (
					<div className="flex justify-center items-center h-full">
						<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
					</div>
				) : (
					<div className="space-y-3 p-3">
						{products.length === 0 ? (
							<div className="flex flex-col items-center justify-center h-32 text-gray-500">
								<p>{activeTab === 'pending' ? '확인이 필요한 상품이 없습니다.' : '확인 완료된 상품이 없습니다.'}</p>
							</div>
						) : (
							products.map((product) => (
								<ProductListItem
									key={product.id}
									product={product}
									onToggleCheck={toggleCheck}
									showAnimation={showAnimation}
								/>
							))
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;