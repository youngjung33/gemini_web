const sections = document.querySelectorAll('.section');

/* window.addEventListener('scroll', () => {
    const scrolY = window.scrollY;
    console.log(scrolY);

    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    // if(scrolY >=)
}) */


var opacity1 = 1.00; // background1의 초기 opacity 값
var opacity2 = 0; // background2의 초기 opacity 값

window.addEventListener('wheel', function(e) {
    var bg1 = document.getElementById('background1');
    var bg2 = document.getElementById('background2');
    console.log(bg1);
    // 마우스휠 스크롤 방향에 따라 opacity 값을 증가 또는 감소
    if (e.deltaY > 0) { // 아래로 스크롤 시
        opacity1 = Math.max(opacity1 - 0.31, 0);
        opacity2 = Math.min(opacity2 + 0.31, 1);
    } else { // 위로 스크롤 시
        opacity1 = Math.min(opacity1 + 0.31, 1);
        opacity2 = Math.max(opacity2 - 0.31, 0);
    }

     // 각 배경이미지의 투명도 변경하여 페이드 인/아웃 효과 적용
     bg1.style.opacity = opacity1;
     bg2.style.opacity = opacity2;
});