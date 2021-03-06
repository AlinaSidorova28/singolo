const links = document.querySelectorAll('#menu a');
const slide_prev = document.getElementById('slide_prev');
const slide_after = document.getElementById('slide_after');
const phone_vert = document.querySelector('.vert_phone_button');
const phone_hor = document.querySelector('.hor_phone_button');
const tabs = document.querySelectorAll('#tabs button');
const pictures = document.getElementById('pictures');
const button = document.getElementById('button');
const close_button = document.getElementById('close-btn');
const slider = document.getElementById('slider');
const burger = document.querySelector(".burger");
const header = document.querySelector("header");
const logo = document.querySelector(".logo");
const nav = header.querySelector("nav");
const headerBackground = header.querySelector(".dark-background");


let pic_array = document.querySelectorAll('#pictures img');


// Меню с переключением
links.forEach(el => el.addEventListener('click', (event) => {
    links.forEach(el => el.classList.remove('menu_active'));
    event.target.classList.add('menu_active');
    setTimeout(showMenu, 700);
}));

document.addEventListener('scroll', onScroll);

function onScroll(event) {
    
    const divs = document.querySelectorAll('.div-wrap');
    const curPos = window.scrollY;
    divs.forEach((el) => {
        if(el.offsetTop <= curPos + 95 && (el.offsetTop + el.offsetHeight) > curPos) {
            links.forEach((a) => {
                a.classList.remove('menu_active');
                if(el.getAttribute('id') === a.getAttribute('href').substring(1)){
                    a.classList.add('menu_active');
                }
            })
        }
    })
}

// Выключение вертикального телефона
phone_vert.addEventListener('click', () => {
    let el = document.getElementById('black_vert');
    el.classList.toggle('hidden');
});

// Выключение горизонтального телефона
phone_hor.addEventListener('click', () => {
    let el = document.getElementById('black_hor');
    el.classList.toggle('hidden');
});

// Перемешивание картинок
tabs.forEach(el => el.addEventListener('click', (event) => {
    let arrayImg = Array.from(pic_array);
    let ImgSrcMix = arrayImg.map(e => e.src).sort((a, b) => Math.random()-0.7);
    arrayImg.map((e,i) => e.src = ImgSrcMix[i]);
    pictures.querySelectorAll('img').forEach(el => el.classList.remove('border'));

    tabs.forEach(el => el.classList.remove('tabs_active'));
    event.target.classList.add('tabs_active');
}));

// Граница на картинках
pic_array.forEach(el => el.addEventListener('click', () => {
    pic_array.forEach(el => el.classList.remove('border'));
    event.target.classList.add('border');
}));

// Сообщение об отправке формы
message = () => {
    const subject = document.getElementById('subject').value.toString();
    document.getElementById('result_obj').innerText = subject !== '' ? "Тема: " + subject : "Без темы";

    const description = document.getElementById('description').value.toString();
    document.getElementById('result_desrcipt').innerText = description !== '' ? "Описание: " + description : "Без описания";

    document.getElementById('message-block').classList.remove('hidden');
}
        
button.addEventListener('click', (event) => {
    
    if (document.getElementById('name').checkValidity() && document.getElementById('email').checkValidity()){
        message();
        event.preventDefault();
    }
    
});

close_button.addEventListener('click', () => {
    document.getElementById('result_obj').innerText = "";
    document.getElementById('message-block').classList.add('hidden');

    document.getElementById('form').reset();
})

// Слайдер-карусель
let items = document.querySelectorAll('.slider-items .item');
let currentItem = 0;
let isEnabled = true;

function changeColor(){
    if(items[currentItem].firstElementChild.classList.contains('phones')){
        slider.classList.remove('slider');
        slider.classList.add('blue');
        document.getElementById('hr').className = 'hr-blue';
    }
    else {
        slider.classList.remove('blue');
        slider.classList.add('slider');
        document.getElementById('hr').className = 'hr-slider';
    }
}

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    });
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    });
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}

function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

document.querySelector('.arrow.left').addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentItem);
        changeColor();
    }
});

document.querySelector('.arrow.right').addEventListener('click', function() {
    if (isEnabled) {
        nextItem(currentItem);
        changeColor();
    }
});

// меню-бургер
burger.addEventListener('click', showMenu);

function showMenu() {
    burger.classList.toggle('rotated90');
    headerBackground.classList.toggle('transparent');
    nav.classList.toggle('to-right');
    logo.classList.toggle('to-left');
}

headerBackground.addEventListener('click', showMenu);