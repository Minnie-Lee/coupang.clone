// 메인 페이지 컴포넌트 - 상품 목록, 검색, 카테고리 표시
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 네비게이션 바 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Multi-Vendor Mall
            </h1>
            <div className="flex gap-4">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                로그인
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                회원가입
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 검색 및 카테고리 섹션 */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="상품 검색..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 카테고리 필터 */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg whitespace-nowrap">
            전체
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap">
            전자기기
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap">
            의류
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap">
            식품
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap">
            생활용품
          </button>
        </div>

        {/* 상품 목록 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* 상품 카드 예시 */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">상품 이미지</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  상품 이름 {item}
                </h3>
                <p className="text-sm text-gray-600 mb-2">판매자명</p>
                <p className="text-lg font-bold text-blue-600">
                  ₩{(item * 10000).toLocaleString()}
                </p>
                <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  장바구니 담기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
