// 초기값 세팅
let currentSection = 1;
let isImageChanged = false;
let scrollCount = 0;
let scrollCount2 = 0;

// 윈도우 기본 휠이벤트 삭제
window.addEventListener("wheel", function (e) {
    e.preventDefault();
}, { passive: false });

// 휠이벤트시 동작
window.addEventListener('wheel', (event) => {
    const headerText = document.querySelectorAll(".header-nav-item-link-text");
    const logo = document.querySelector('.header-title img');
    const overlay = document.querySelector('#section3 .overlay');
    const section3_move_text1 = document.getElementById('section3_move_text1');
    const section3_move_text2 = document.getElementById('section3_move_text2');
    const overlay5 = document.querySelector('#section5 .overlay');
    const section5_move_text1 = document.getElementById('section3_move_text1');
    const section5_move_text2 = document.getElementById('section3_move_text2');

    if (event.deltaY > 0) { //휠 아래로
        if (currentSection == 1 && !isImageChanged) { //첫번째 섹션
            // 조건이 맞으면 backgroundImage변경
            document.getElementById('section1').style.backgroundImage = "url('../../../public/images/main_background2.png')";
            isImageChanged = true;

            // 헤더 텍스트와 로고 변경
            headerText.forEach(text => {
                text.classList.add('background_white');
            });
            logo.src = './public/logo.svg'

        } else if (currentSection == 3 && scrollCount < 2) { //3번째 섹션
            // 조건이 맞으면 헤더 텍스트와 로고 변경
            headerText.forEach(text => {
                text.classList.remove('background_white');
            });
            logo.src = './public/logo_white.svg'
            // overlay 효과주기
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            // scrollCount 증가 시키고 다음 코드
            scrollCount++;

            if (scrollCount == 1) { //scrollCount 1일때 text 애니메이션
                section3_move_text1.style.animation = 'slide-up 1s forwards';
                section3_move_text1.style.opacity = 1;
            } else if (scrollCount == 2) {
                //scrollCount 2일때 text 애니메이션
                section3_move_text2.style.animation = 'slide-up 1s forwards';
                section3_move_text2.style.opacity = 1;
            }
        } else if (currentSection == 5 && scrollCount < 2) { //5번째 섹션
            // 조건이 맞으면 헤더 텍스트와 로고 변경
            headerText.forEach(text => {
                text.classList.remove('background_white');
            });
            logo.src = './public/logo_white.svg'
            // overlay 효과주기
            overlay5.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            // scrollCount2 증가 시키고 다음 코드
            scrollCount2++;
            if (scrollCount2 == 1) { //scrollCount 1일때 text 애니메이션
                section5_move_text1.style.animation = 'slide-up 1s forwards';
                section5_move_text1.style.opacity = 1;
            } else if (scrollCount2 == 2) {
                //scrollCount 2일때 text 애니메이션
                section5_move_text2.style.animation = 'slide-up 1s forwards';
                section5_move_text2.style.opacity = 1;
            }
        }
        else if (currentSection < 14) {
            // 조건이 맞으면 다음페이지
            currentSection++;
            // scrollCount 초기화
            scrollCount = 0;
            scrollCoun2 = 0;
            scrollToSection(currentSection);
        }
    } else if (event.deltaY < 0) { //휠 위로
        if (isImageChanged && currentSection == 1) {
            // 조건에 맞으면 배경이미지 변경
            document.getElementById('section1').style.backgroundImage = "url('../../../public/images/main_background1.png')";
            isImageChanged = false;
            // 헤더와 로고 변경
            headerText.forEach(text => {
                text.classList.remove('background_white');
            });
            logo.src = './public/logo_white.svg'
        } else if (currentSection > 1) {
            // 페이지 벗어날시 초기값 세팅
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            overlay5.style.backgroundColor = 'rgba(0, 0, 0, 0)';

            section3_move_text1.style.animation = '';
            section3_move_text1.style.opacity = 0;
            section3_move_text2.style.animation = '';
            section3_move_text2.style.opacity = 0;

            currentSection--;
            scrollToSection(currentSection);
        }
    }
})

// 스크롤 효과
function scrollToSection(section) {
    const sectionElement = document.getElementById(`section${section}`);

    if (sectionElement) {
        window.scrollTo({
            top: sectionElement.offsetTop,
            behavior: 'smooth'
        });
    }
}

// 스크롤 이벤트시 발동
window.addEventListener('scroll', function () {
    const section2 = document.getElementById('section2');
    const section4 = document.getElementById('section4');
    const ani_text2 = document.querySelectorAll('.ani_text_2');
    const ani_text2_img = document.querySelector('.ani_text_2_img');
    const ani_text4 = document.querySelectorAll('.ani_text_4');
    const ani_text4_img = document.querySelector('.ani_text_4_img');

    const headerText = document.querySelectorAll(".header-nav-item-link-text");
    const logo = document.querySelector('.header-title img');

    // 현재 스크롤 위치를 확인
    // const scrollPosition = window.scrollY;

    // 섹션2의 위치를 확인 2가지 방법
    const section2Position = section2.getBoundingClientRect().top;
    const section4Position = section4.getBoundingClientRect().top;
    // const section2Position = section2.offsetTop;
    // const section4Position = section4.offsetTop;

    if (section2Position == 0) {
        // 조건에 맞으면 애니메이션 효과와 헤더 변경
        ani_text2.forEach((text) => {
            text.style.animation = 'slide-up 1s forwards, fade-in 2s forwards';
        });
        ani_text2_img.style.animation = 'slide-up 4s forwards, fade-in 5s forwards';
        headerText.forEach(text => {
            text.classList.add('background_white');
        });
        logo.src = './public/logo.svg'
    } else if (section2Position !== 0) {
        // 페이지 벗어나면 초기화
        ani_text2.forEach((text) => {
            text.style.animation = ''; // 애니메이션 속성을 초기화
            text.style.opacity = 0; // 텍스트가 보이지 않게 설정
            text.style.transform = 'translateY(10%)'; // 텍스트가 아래에 위치하게 설정
        })
        ani_text2_img.style.animation = '';
        ani_text2_img.style.opacity = 0;
        ani_text2_img.style.transform = 'translateY(10%)';
    }

    if (section4Position == 0) {
        // 조건에 맞으면 애니메이션
        ani_text4.forEach((text) => {
            text.style.animation = 'slide-up 1s forwards, fade-in 2s forwards';
        });
        ani_text4_img.style.animation = 'slide-up 4s forwards, fade-in 5s forwards';
        headerText.forEach(text => {
            text.classList.add('background_white');
        });
        logo.src = './public/logo.svg'
    } else if (section4Position !== 0) {
        // 페이지 벗어나면 초기화
        ani_text4.forEach((text) => {
            text.style.animation = ''; // 애니메이션 속성을 초기화
            text.style.opacity = 0; // 텍스트가 보이지 않게 설정
            text.style.transform = 'translateY(10%)'; // 텍스트가 아래에 위치하게 설정
        });
        ani_text4_img.style.animation = '';
        ani_text4_img.style.opacity = 0;
        ani_text4_img.style.transform = 'translateY(10%)';
    }

    // 다른방법
    /*    if (scrollPosition >= section2Position) {
           ani_texts.forEach((text) => {
               text.style.animation = 'slide-up 1s forwards, fade-in 2s forwards';
           });
       } else if (scrollPosition < section2Position) {
           ani_texts.forEach((text) => {
               text.style.animation = ''; // 애니메이션 속성을 초기화
               text.style.opacity = 0; // 텍스트가 보이지 않게 설정
               text.style.transform = 'translateY(10%)'; // 텍스트가 아래에 위치하게 설정
           })
       }
   
       if (scrollPosition >= section4Position) {
           ani_texts.forEach((text) => {
               text.style.animation = 'slide-up 1s forwards, fade-in 2s forwards';
           });
       } else if (scrollPosition < section4Position) {
           ani_texts.forEach((text) => {
               text.style.animation = ''; // 애니메이션 속성을 초기화
               text.style.opacity = 0; // 텍스트가 보이지 않게 설정
               text.style.transform = 'translateY(10%)'; // 텍스트가 아래에 위치하게 설정
           })
       } */

});

// 헤더버튼 효과
document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('.button');
    const buttonList = document.querySelector('.button_list')

    button.addEventListener('click', function () {
        buttonList.classList.toggle('show_list');
    })
})

// 새로고침 시 페이지의 가장 위로 이동
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});