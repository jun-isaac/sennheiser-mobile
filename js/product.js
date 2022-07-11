// 제품 데이터 가져오기
function getData() {
	// 여기에 여러분 깃허브 JSON 파일 경로(서버 데이터 주소)
	const DataURL = 'https://raw.githubusercontent.com/jun-isaac/sennheiser-mobile/main/js/data.json'
	fetch(DataURL)
		.then(function (res) {
			return res.json(); // JSON 객체 변환
		})
		.then(function (obj) {
			// 최종 데이터 출력(object)
			showProducts(obj);
			console.log(obj);
		});
}

function showProducts(obj) {
	// 현재 페이지의 URL query 파라미터(매개변수)
	const query = location.search;
	console.log(query);
	// ? URL query문을 object(변수)로 변경
	let params = new URLSearchParams(query).get('category');

	// params == null이면 ( 시작 페이지 모든 제품 출력 )
	if (params == null || params == 'all') {
		params = null
	}
	console.log(params);

	// 상품 데이터 출력
	obj.forEach(function (product, i){
		// 카테고리 구분 wireless | 무선헤드폰 | 유선헤드폰
		// 요청한 params와 동물 카테고리명이 일치하는 데이터만 출력
		let category = product.category;
		let name = product.name;
		let price = product.price;
		let imgUrl = product.imgUrl;
		let text = product.text;
		console.log(category);

		// 카테고리 별로 보기
		if (params == product.category) {
			let html = `
	<div class="product" data-id=${i}>
		<a href="detail.html?id=${i}">
		<img src="${imgUrl}" alt=${name}>
			<div class="info">
				<span class="category">${category}</span>
				<p class="title">${name}</p>
				<p class="price"><span>₩</span>${price}</p>
				</div>
		</a>
	</div>
	`
			$('main .products').append(html);
		}

		// 상품 전체보기
		if (params == null) {
			let html = `
									<div class="product" data-id=${i}>
											<a href="detail.html?id=${i}">
													<img src="${imgUrl}" alt=${name}>
													<div class="info">
															<span class="category">${category}</span>
															<p class="title">${name}</p>
															<p class="price"><span>₩</span>${price}</p>
													</div>
											</a>
									</div>
							`
			$('main .products').append(html);
			console.log(`i = `, i)
		}
	});
}

$(function () {
	getData();
})