let currentSection = 1;
let isImageChanged = false;
let scrollCount = 0;

window.addEventListener("wheel", function (e) {
    e.preventDefault();
}, { passive: false });

window.addEventListener('wheel', (event) => {
    const headerText = document.querySelectorAll(".header-nav-item-link-text");
    const logo = document.querySelector('.header-title img');
    // const section3 = document.getElementById('section3');
    const ani_text = document.querySelectorAll('.ani_text')
    const overlay = document.querySelector('#section3 .overlay');
    const section3_move_text1 = document.getElementById('section3_move_text1');
    const section3_move_text2 = document.getElementById('section3_move_text2');

    if (event.deltaY > 0) {
        if (currentSection == 1 && !isImageChanged) {
            document.getElementById('section1').style.backgroundImage = "url('../../../public/images/main_background2.png')";
            isImageChanged = true;

            headerText.forEach(text => {
                text.classList.add('background_white');
            });
            logo.src = './public/logo.svg'

        } /* else if (currentSection == 2) {
            ani_text.forEach((text)=>{
                text.style.animation = 'slide-up 1s forwards, fade-in 2s forwards';
            })
        } */ else if (currentSection == 3 && scrollCount < 2) {
            headerText.forEach(text => {
                text.classList.remove('background_white');
            });
            logo.src = './public/logo_white.svg'
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            scrollCount++;
            if (scrollCount == 1) {
                section3_move_text1.style.animation = 'slide-up 1s forwards';
                section3_move_text1.style.opacity = 1;
            } else if (scrollCount == 2) {
                section3_move_text2.style.animation = 'slide-up 1s forwards';
                section3_move_text2.style.opacity = 1;
            }
        } else if (currentSection < 14) {
            currentSection++;
            scrollCount = 0;
            scrollToSection(currentSection);
        }
    } else if (event.deltaY < 0) {
        if (isImageChanged && currentSection == 1) {
            document.getElementById('section1').style.backgroundImage = "url('../../../public/images/main_background1.png')";
            isImageChanged = false;
            headerText.forEach(text => {
                text.classList.remove('background_white');
            });
            logo.src = './public/logo_white.svg'
        } else if (currentSection > 1) {
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            section3_move_text1.style.opacity = 0;
            section3_move_text2.style.opacity = 0;
            currentSection--;
            scrollToSection(currentSection);
        }
    }
})

function scrollToSection(section) {
    const sectionElement = document.getElementById(`section${section}`);


    if (sectionElement) {
        window.scrollTo({
            top: sectionElement.offsetTop,
            behavior: 'smooth'
        });
    }
}

window.addEventListener('scroll', function () {
    const section2 = document.getElementById('section2');
    const rect = section2.getBoundingClientRect();

    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        // 페이지가 보이는 영역에 들어왔을 때 애니메이션 실행
        document.querySelector('#section2 .left_content').style.animationPlayState = 'running';
        document.querySelector('#section2 .right_content img').style.animationPlayState = 'running';
    } else {
        // 페이지가 보이는 영역에 나가면 애니메이션 일시 중지
        document.querySelector('#section2 .left_content').style.animationPlayState = 'paused';
        document.querySelector('#section2 .right_content img').style.animationPlayState = 'paused';
    }
});

// 새로고침 시 페이지의 가장 위로 이동
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});