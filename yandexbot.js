// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==
let keywords = ["Как звучит флейта","Валторна","Тромбон","Кларнет","Фагот","Гобой","Саксофон"];//поисковый запрос
let randomIndex = Math.floor(Math.random()*keywords.length);
let keyword = keywords[randomIndex];//генерация случайного слова для запроса поисковой строки

let yandexInput = document.getElementsByClassName("input__control input__input mini-suggest__input")[0];//поисковая строка найдена по её class
let btn = document.getElementsByClassName("button_theme_websearch")[0];//ищем кнопку поиска по классу

let links = document.links;//сюда падают результаты поиска в виде массива

if(btn!=undefined){
    let i = 0;
    let timerId = setInterval(()=>{
        yandexInput.value += keyword[i++];
        if(i==keyword.length){
            clearInterval(timerId);
            btn.click();
        }
    },300);
}else{
    let nextYandexPage = true;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1){
            nextYandexPage = false;
            link.removeAttribute('target');
            link.click(); // кликаем по ссылке
            break; // завершаем цикл
        }
    }
    if(nextYandexPage) document.querySelector('[aria-label="Следующая страница"]').click();
}
