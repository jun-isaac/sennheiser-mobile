$(function(){

    /* #gnb toggle
        1. 열기: #toggle-btn 클릭시 #gnb on
        2. 닫기: #btn-close 클릭시 #gnb
    */
    $('#toggle-btn').click(function(){
        $('#gnb').addClass('on');
    });

    $('#btn-close').click(function(){
        $('#gnb').removeClass('on');
    });

});

// 서버에 데이터 요청(request)
fetch('https://raw.githubusercontent.com/csslick/animal-mobile/main/animal-data.json')
    .then(function (res) {
        return res.json(); // JSON 객체 변환
    })
    .then(function (obj) {
        // 최종 데이터 출력(object)
        showProducts(obj);

        /*
        for(let i = 0; i < obj.length; i++){
            let html =`
            <div class="col">
                <img src="${obj[i].imgUrl}" alt="dog01">
                <p class="name">${obj[i].name}</p>
            </div>
            `
            $('.row').append(html);
        }
        */

        // forEach() 반복문
        function showProducts(obj) {
            // URL query 파라미터(매개변수)
            const query = location.search;
            console.log(query);
            // ? URL query문을 object(변수)로 변경
            let params = new URLSearchParams(query).get('category');
            console.log(params);

            // params == null이면 ( 시작 페이지 dog 출력 )
            if (params == null) {
                params = 'dog'
            }
            console.log(params);

            // 동물 데이터 출력
            obj.forEach(function (animal) {
                // console.log(animal.name);
                // 카테고리 구분 dog | cat | bird
                // 요청한 params와 동물 카테고리명이 일치하는 데이터만 출력
                if (params == animal.category) {
                    let html = `
                    <div class="col">
                        <img src="${animal.imgUrl}" alt="dog01">
                        <p class="name">${animal.name}</p>
                    </div>
                `
                    $('.row').append(html);
                }
            });
        }
    });


/* 파라미터를 전달하여 요청하기
    홈페이지주소?name=홍길동
    매개변수(URL parameter) name = '홍길동'

    index.html -> index.html?category=dog -> 개 보여주시오
    cat.html -> cat.html?category=cat -> 고양이 보여주시오
    bird.html -> bird.html?category=bird -> 새 보여주시오
*/