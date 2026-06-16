import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const LOGO = 'https://sun9-82.userapi.com/s/v1/ig2/raix3a3d34tE8qiszMZSsReSO82h0qp9R4ExdNJeaZNP1em0ANfveS5RwsNp5qII3dVXlVqPaQOh_p4Dxt3NmBZ2.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1024x1024&from=bu&u=RP6Cp4Ny_p6izYfew82WynsuXkruRG2hnQb4EGGda_I&cs=1024x0';

const LEVELS = [
  { id: 'novice', emoji: '🌱', title: 'Новичок', desc: 'Никогда не писал код. Объясняю всё с самых основ, простыми словами.' },
  { id: 'amateur', emoji: '🚀', title: 'Любитель', desc: 'Что-то слышал про HTML и CSS. Идём бодро, но без пробелов в знаниях.' },
  { id: 'pro', emoji: '⚡', title: 'Уверенный', desc: 'Понимаю базу, хочу прокачаться до уровня настоящего разработчика.' },
];

const NAV = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'lessons', label: 'Уроки', icon: 'BookOpen' },
  { id: 'progress', label: 'Прогресс', icon: 'TrendingUp' },
  { id: 'tests', label: 'Тесты', icon: 'ClipboardCheck' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
  { id: 'certificate', label: 'Сертификат', icon: 'Award' },
];

const TRACKS = [
  { tag: 'HTML', emoji: '🧱', title: 'Структура страниц', lessons: 90, color: 'from-orange-500 to-pink-500' },
  { tag: 'CSS', emoji: '🎨', title: 'Стили и дизайн', lessons: 90, color: 'from-sky-400 to-indigo-500' },
  { tag: 'JavaScript', emoji: '✨', title: 'Логика и интерактив', lessons: 90, color: 'from-fuchsia-500 to-purple-600' },
];

type LessonType = { n: number; title: string; type: 'Урок' | 'Тест'; track: 'HTML' | 'CSS' | 'JS' };

const ALL_LESSONS: LessonType[] = [
  // ─── HTML (уроки 1–90) ───────────────────────────────────────────────
  { n: 1,  title: 'Что такое HTML и зачем он нужен',          type: 'Урок', track: 'HTML' },
  { n: 2,  title: 'Структура HTML-документа',                  type: 'Урок', track: 'HTML' },
  { n: 3,  title: 'Заголовки: теги h1–h6',                    type: 'Урок', track: 'HTML' },
  { n: 4,  title: 'Тест: первые шаги в HTML',                 type: 'Тест', track: 'HTML' },
  { n: 5,  title: 'Абзацы и текст: тег <p>',                  type: 'Урок', track: 'HTML' },
  { n: 6,  title: 'Жирный и курсив: <b>, <i>, <strong>',      type: 'Урок', track: 'HTML' },
  { n: 7,  title: 'Перенос строки и горизонтальная линия',     type: 'Урок', track: 'HTML' },
  { n: 8,  title: 'Тест: работа с текстом',                   type: 'Тест', track: 'HTML' },
  { n: 9,  title: 'Ссылки: тег <a> и атрибут href',           type: 'Урок', track: 'HTML' },
  { n: 10, title: 'Открытие ссылок в новой вкладке',          type: 'Урок', track: 'HTML' },
  { n: 11, title: 'Изображения: тег <img>',                   type: 'Урок', track: 'HTML' },
  { n: 12, title: 'Тест: ссылки и изображения',               type: 'Тест', track: 'HTML' },
  { n: 13, title: 'Списки: маркированный <ul>',               type: 'Урок', track: 'HTML' },
  { n: 14, title: 'Списки: нумерованный <ol>',                type: 'Урок', track: 'HTML' },
  { n: 15, title: 'Вложенные списки',                         type: 'Урок', track: 'HTML' },
  { n: 16, title: 'Тест: списки',                             type: 'Тест', track: 'HTML' },
  { n: 17, title: 'Таблицы: <table>, <tr>, <td>',             type: 'Урок', track: 'HTML' },
  { n: 18, title: 'Заголовки таблицы: <th>',                  type: 'Урок', track: 'HTML' },
  { n: 19, title: 'Объединение ячеек colspan и rowspan',       type: 'Урок', track: 'HTML' },
  { n: 20, title: 'Тест: таблицы',                            type: 'Тест', track: 'HTML' },
  { n: 21, title: 'Формы: тег <form>',                        type: 'Урок', track: 'HTML' },
  { n: 22, title: 'Поле ввода: <input>',                      type: 'Урок', track: 'HTML' },
  { n: 23, title: 'Кнопки, чекбоксы и радио',                 type: 'Урок', track: 'HTML' },
  { n: 24, title: 'Выпадающий список <select>',               type: 'Урок', track: 'HTML' },
  { n: 25, title: 'Тест: формы',                              type: 'Тест', track: 'HTML' },
  { n: 26, title: 'Семантика: зачем это важно',               type: 'Урок', track: 'HTML' },
  { n: 27, title: 'Теги <header>, <footer>, <main>',          type: 'Урок', track: 'HTML' },
  { n: 28, title: 'Теги <section>, <article>, <aside>',       type: 'Урок', track: 'HTML' },
  { n: 29, title: 'Тег <nav> и навигация сайта',              type: 'Урок', track: 'HTML' },
  { n: 30, title: 'Тест: семантический HTML',                 type: 'Тест', track: 'HTML' },
  { n: 31, title: 'Атрибуты HTML: id и class',                type: 'Урок', track: 'HTML' },
  { n: 32, title: 'Атрибут title и alt',                      type: 'Урок', track: 'HTML' },
  { n: 33, title: 'Мета-теги и SEO-основы',                   type: 'Урок', track: 'HTML' },
  { n: 34, title: 'Тест: атрибуты и мета',                    type: 'Тест', track: 'HTML' },
  { n: 35, title: 'Встраивание видео: <video>',               type: 'Урок', track: 'HTML' },
  { n: 36, title: 'Встраивание аудио: <audio>',               type: 'Урок', track: 'HTML' },
  { n: 37, title: 'Iframe: вставка карт и видео',             type: 'Урок', track: 'HTML' },
  { n: 38, title: 'Тест: медиа в HTML',                       type: 'Тест', track: 'HTML' },
  { n: 39, title: 'Специальные символы HTML',                 type: 'Урок', track: 'HTML' },
  { n: 40, title: 'Комментарии в HTML',                       type: 'Урок', track: 'HTML' },
  { n: 41, title: 'HTML5: что нового',                        type: 'Урок', track: 'HTML' },
  { n: 42, title: 'Тест: HTML5-возможности',                  type: 'Тест', track: 'HTML' },
  { n: 43, title: 'Доступность: атрибут aria',                type: 'Урок', track: 'HTML' },
  { n: 44, title: 'Структура большого сайта',                 type: 'Урок', track: 'HTML' },
  { n: 45, title: 'Практика: верстаем страницу "О себе"',     type: 'Урок', track: 'HTML' },
  { n: 46, title: 'Тест: структура сайта',                    type: 'Тест', track: 'HTML' },
  { n: 47, title: 'Вёрстка шапки сайта (header)',             type: 'Урок', track: 'HTML' },
  { n: 48, title: 'Вёрстка футера (footer)',                  type: 'Урок', track: 'HTML' },
  { n: 49, title: 'Вёрстка карточки товара',                  type: 'Урок', track: 'HTML' },
  { n: 50, title: 'Тест: практические навыки HTML',           type: 'Тест', track: 'HTML' },
  { n: 51, title: 'Вложенность тегов: правила',               type: 'Урок', track: 'HTML' },
  { n: 52, title: 'Блочные и строчные элементы',              type: 'Урок', track: 'HTML' },
  { n: 53, title: 'Тег <div> и <span>',                       type: 'Урок', track: 'HTML' },
  { n: 54, title: 'Тест: блочная модель HTML',                type: 'Тест', track: 'HTML' },
  { n: 55, title: 'Путь к файлам: абсолютный и относительный',type: 'Урок', track: 'HTML' },
  { n: 56, title: 'Подключение CSS к HTML',                   type: 'Урок', track: 'HTML' },
  { n: 57, title: 'Подключение JavaScript к HTML',            type: 'Урок', track: 'HTML' },
  { n: 58, title: 'Тест: подключение ресурсов',               type: 'Тест', track: 'HTML' },
  { n: 59, title: 'Favicon: иконка сайта',                    type: 'Урок', track: 'HTML' },
  { n: 60, title: 'Адаптивность: мета тег viewport',          type: 'Урок', track: 'HTML' },
  { n: 61, title: 'Валидация HTML-кода',                      type: 'Урок', track: 'HTML' },
  { n: 62, title: 'Тест: профессиональные практики',          type: 'Тест', track: 'HTML' },
  { n: 63, title: 'HTML-письма: email-вёрстка',               type: 'Урок', track: 'HTML' },
  { n: 64, title: 'Шаблонизация: зачем нужны компоненты',     type: 'Урок', track: 'HTML' },
  { n: 65, title: 'Практика: лендинг — шапка и герой',        type: 'Урок', track: 'HTML' },
  { n: 66, title: 'Тест: создание лендинга',                  type: 'Тест', track: 'HTML' },
  { n: 67, title: 'Практика: секция преимуществ',             type: 'Урок', track: 'HTML' },
  { n: 68, title: 'Практика: форма обратной связи',           type: 'Урок', track: 'HTML' },
  { n: 69, title: 'Практика: футер лендинга',                 type: 'Урок', track: 'HTML' },
  { n: 70, title: 'Тест: полный лендинг на HTML',             type: 'Тест', track: 'HTML' },
  { n: 71, title: 'Атрибут data-* в HTML',                    type: 'Урок', track: 'HTML' },
  { n: 72, title: 'Прогресс-бар и meter в HTML5',             type: 'Урок', track: 'HTML' },
  { n: 73, title: 'Теги details и summary',                   type: 'Урок', track: 'HTML' },
  { n: 74, title: 'Тест: HTML5 продвинутый',                  type: 'Тест', track: 'HTML' },
  { n: 75, title: 'SVG: встраивание графики',                  type: 'Урок', track: 'HTML' },
  { n: 76, title: 'Canvas: рисование в браузере',             type: 'Урок', track: 'HTML' },
  { n: 77, title: 'WebFonts: подключение шрифтов',            type: 'Урок', track: 'HTML' },
  { n: 78, title: 'Тест: графика и шрифты',                   type: 'Тест', track: 'HTML' },
  { n: 79, title: 'Скрипты: async и defer',                   type: 'Урок', track: 'HTML' },
  { n: 80, title: 'Preload и prefetch',                       type: 'Урок', track: 'HTML' },
  { n: 81, title: 'Open Graph: превью в соцсетях',            type: 'Урок', track: 'HTML' },
  { n: 82, title: 'Тест: оптимизация загрузки',               type: 'Тест', track: 'HTML' },
  { n: 83, title: 'Практика: портфолио — HTML-каркас',        type: 'Урок', track: 'HTML' },
  { n: 84, title: 'Практика: страница блога',                 type: 'Урок', track: 'HTML' },
  { n: 85, title: 'Практика: интернет-магазин (витрина)',     type: 'Урок', track: 'HTML' },
  { n: 86, title: 'Тест: итоговый HTML',                      type: 'Тест', track: 'HTML' },
  { n: 87, title: 'Ошибки новичков в HTML',                   type: 'Урок', track: 'HTML' },
  { n: 88, title: 'Инструменты разработчика (DevTools)',      type: 'Урок', track: 'HTML' },
  { n: 89, title: 'HTML: что дальше — переход к CSS',         type: 'Урок', track: 'HTML' },
  { n: 90, title: 'Финальный тест блока HTML',                type: 'Тест', track: 'HTML' },

  // ─── CSS (уроки 91–180) ──────────────────────────────────────────────
  { n: 91,  title: 'Что такое CSS и как он работает',         type: 'Урок', track: 'CSS' },
  { n: 92,  title: 'Подключение CSS: три способа',            type: 'Урок', track: 'CSS' },
  { n: 93,  title: 'Селекторы: тег, класс, идентификатор',   type: 'Урок', track: 'CSS' },
  { n: 94,  title: 'Тест: основы CSS',                        type: 'Тест', track: 'CSS' },
  { n: 95,  title: 'Цвета: hex, rgb, hsl',                   type: 'Урок', track: 'CSS' },
  { n: 96,  title: 'Цвет текста и фона',                     type: 'Урок', track: 'CSS' },
  { n: 97,  title: 'Шрифты: font-family, size, weight',      type: 'Урок', track: 'CSS' },
  { n: 98,  title: 'Тест: цвета и шрифты',                   type: 'Тест', track: 'CSS' },
  { n: 99,  title: 'Блочная модель: margin и padding',        type: 'Урок', track: 'CSS' },
  { n: 100, title: 'Рамки: border и border-radius',          type: 'Урок', track: 'CSS' },
  { n: 101, title: 'Размеры: width, height, max/min',        type: 'Урок', track: 'CSS' },
  { n: 102, title: 'Тест: блочная модель',                   type: 'Тест', track: 'CSS' },
  { n: 103, title: 'Display: block, inline, inline-block',   type: 'Урок', track: 'CSS' },
  { n: 104, title: 'Позиционирование: position',             type: 'Урок', track: 'CSS' },
  { n: 105, title: 'Z-index: управление слоями',             type: 'Урок', track: 'CSS' },
  { n: 106, title: 'Тест: display и position',               type: 'Тест', track: 'CSS' },
  { n: 107, title: 'Flexbox: основы',                        type: 'Урок', track: 'CSS' },
  { n: 108, title: 'Flexbox: выравнивание элементов',        type: 'Урок', track: 'CSS' },
  { n: 109, title: 'Flexbox: flex-wrap и flex-grow',         type: 'Урок', track: 'CSS' },
  { n: 110, title: 'Тест: Flexbox',                          type: 'Тест', track: 'CSS' },
  { n: 111, title: 'Grid: основы сетки',                     type: 'Урок', track: 'CSS' },
  { n: 112, title: 'Grid: строки и колонки',                 type: 'Урок', track: 'CSS' },
  { n: 113, title: 'Grid: grid-area и шаблоны',              type: 'Урок', track: 'CSS' },
  { n: 114, title: 'Тест: Grid',                             type: 'Тест', track: 'CSS' },
  { n: 115, title: 'Псевдоклассы: :hover, :focus, :active',  type: 'Урок', track: 'CSS' },
  { n: 116, title: 'Псевдоэлементы: ::before и ::after',     type: 'Урок', track: 'CSS' },
  { n: 117, title: 'Комбинаторы селекторов',                 type: 'Урок', track: 'CSS' },
  { n: 118, title: 'Тест: селекторы продвинутые',            type: 'Тест', track: 'CSS' },
  { n: 119, title: 'Градиенты: linear и radial',             type: 'Урок', track: 'CSS' },
  { n: 120, title: 'Тени: box-shadow и text-shadow',         type: 'Урок', track: 'CSS' },
  { n: 121, title: 'Фоновые изображения: background',        type: 'Урок', track: 'CSS' },
  { n: 122, title: 'Тест: визуальные эффекты',               type: 'Тест', track: 'CSS' },
  { n: 123, title: 'Переходы: transition',                   type: 'Урок', track: 'CSS' },
  { n: 124, title: 'Анимации: @keyframes',                   type: 'Урок', track: 'CSS' },
  { n: 125, title: 'Transform: поворот, масштаб, сдвиг',     type: 'Урок', track: 'CSS' },
  { n: 126, title: 'Тест: анимации и трансформации',         type: 'Тест', track: 'CSS' },
  { n: 127, title: 'Медиа-запросы: адаптивность',            type: 'Урок', track: 'CSS' },
  { n: 128, title: 'Mobile-first подход',                    type: 'Урок', track: 'CSS' },
  { n: 129, title: 'Единицы: vw, vh, rem, em, %',            type: 'Урок', track: 'CSS' },
  { n: 130, title: 'Тест: адаптивный дизайн',                type: 'Тест', track: 'CSS' },
  { n: 131, title: 'CSS-переменные (custom properties)',      type: 'Урок', track: 'CSS' },
  { n: 132, title: 'Каскад и специфичность',                 type: 'Урок', track: 'CSS' },
  { n: 133, title: 'Наследование в CSS',                     type: 'Урок', track: 'CSS' },
  { n: 134, title: 'Тест: CSS-архитектура',                  type: 'Тест', track: 'CSS' },
  { n: 135, title: 'Overflow: скрытие и прокрутка',          type: 'Урок', track: 'CSS' },
  { n: 136, title: 'Opacity и visibility',                   type: 'Урок', track: 'CSS' },
  { n: 137, title: 'Фильтры: blur, brightness, contrast',    type: 'Урок', track: 'CSS' },
  { n: 138, title: 'Тест: управление отображением',          type: 'Тест', track: 'CSS' },
  { n: 139, title: 'Практика: навигационное меню',           type: 'Урок', track: 'CSS' },
  { n: 140, title: 'Практика: карточки продуктов',           type: 'Урок', track: 'CSS' },
  { n: 141, title: 'Практика: адаптивная сетка',             type: 'Урок', track: 'CSS' },
  { n: 142, title: 'Тест: вёрстка компонентов',              type: 'Тест', track: 'CSS' },
  { n: 143, title: 'Стилизация форм',                        type: 'Урок', track: 'CSS' },
  { n: 144, title: 'Стилизация кнопок',                      type: 'Урок', track: 'CSS' },
  { n: 145, title: 'Стилизация таблиц',                      type: 'Урок', track: 'CSS' },
  { n: 146, title: 'Тест: стилизация UI',                    type: 'Тест', track: 'CSS' },
  { n: 147, title: 'Типографика: line-height, letter-spacing',type: 'Урок', track: 'CSS' },
  { n: 148, title: 'Google Fonts: подключение шрифтов',      type: 'Урок', track: 'CSS' },
  { n: 149, title: 'Иконочные шрифты и SVG-иконки',          type: 'Урок', track: 'CSS' },
  { n: 150, title: 'Тест: типографика',                      type: 'Тест', track: 'CSS' },
  { n: 151, title: 'Методология BEM',                        type: 'Урок', track: 'CSS' },
  { n: 152, title: 'Организация CSS-файлов',                 type: 'Урок', track: 'CSS' },
  { n: 153, title: 'CSS reset и normalize',                  type: 'Урок', track: 'CSS' },
  { n: 154, title: 'Тест: организация кода',                 type: 'Тест', track: 'CSS' },
  { n: 155, title: 'Clip-path: фигурные вырезы',             type: 'Урок', track: 'CSS' },
  { n: 156, title: 'Mask: маскирование элементов',           type: 'Урок', track: 'CSS' },
  { n: 157, title: 'Backdrop-filter: стеклянный эффект',     type: 'Урок', track: 'CSS' },
  { n: 158, title: 'Тест: продвинутые эффекты',              type: 'Тест', track: 'CSS' },
  { n: 159, title: 'Скроллинг: scroll-behavior и snap',      type: 'Урок', track: 'CSS' },
  { n: 160, title: 'Стилизация полосы прокрутки',            type: 'Урок', track: 'CSS' },
  { n: 161, title: 'Sticky элементы',                        type: 'Урок', track: 'CSS' },
  { n: 162, title: 'Тест: поведение страницы',               type: 'Тест', track: 'CSS' },
  { n: 163, title: 'Практика: hero-секция сайта',            type: 'Урок', track: 'CSS' },
  { n: 164, title: 'Практика: анимированная кнопка',         type: 'Урок', track: 'CSS' },
  { n: 165, title: 'Практика: модальное окно на CSS',        type: 'Урок', track: 'CSS' },
  { n: 166, title: 'Тест: CSS-компоненты',                   type: 'Тест', track: 'CSS' },
  { n: 167, title: 'Практика: тёмная тема',                  type: 'Урок', track: 'CSS' },
  { n: 168, title: 'Практика: анимированное меню-бургер',    type: 'Урок', track: 'CSS' },
  { n: 169, title: 'Практика: parallax-эффект',              type: 'Урок', track: 'CSS' },
  { n: 170, title: 'Тест: креативный CSS',                   type: 'Тест', track: 'CSS' },
  { n: 171, title: 'CSS Grid: сложные макеты',               type: 'Урок', track: 'CSS' },
  { n: 172, title: 'Subgrid: вложенные сетки',               type: 'Урок', track: 'CSS' },
  { n: 173, title: 'Container queries',                      type: 'Урок', track: 'CSS' },
  { n: 174, title: 'Тест: современный CSS',                  type: 'Тест', track: 'CSS' },
  { n: 175, title: 'Практика: стилизуем лендинг',            type: 'Урок', track: 'CSS' },
  { n: 176, title: 'Практика: адаптивное портфолио',         type: 'Урок', track: 'CSS' },
  { n: 177, title: 'Ошибки новичков в CSS',                  type: 'Урок', track: 'CSS' },
  { n: 178, title: 'Тест: итоговый CSS',                     type: 'Тест', track: 'CSS' },
  { n: 179, title: 'CSS: что дальше — переход к JS',         type: 'Урок', track: 'CSS' },
  { n: 180, title: 'Финальный тест блока CSS',               type: 'Тест', track: 'CSS' },

  // ─── JavaScript (уроки 181–270) ──────────────────────────────────────
  { n: 181, title: 'Что такое JavaScript',                   type: 'Урок', track: 'JS' },
  { n: 182, title: 'Подключение JS к странице',              type: 'Урок', track: 'JS' },
  { n: 183, title: 'Переменные: let, const, var',            type: 'Урок', track: 'JS' },
  { n: 184, title: 'Тест: первые шаги в JS',                 type: 'Тест', track: 'JS' },
  { n: 185, title: 'Типы данных: строки, числа, булевы',     type: 'Урок', track: 'JS' },
  { n: 186, title: 'Операторы: арифметика и сравнение',      type: 'Урок', track: 'JS' },
  { n: 187, title: 'Шаблонные строки',                       type: 'Урок', track: 'JS' },
  { n: 188, title: 'Тест: типы данных и операторы',          type: 'Тест', track: 'JS' },
  { n: 189, title: 'Условия: if / else / else if',           type: 'Урок', track: 'JS' },
  { n: 190, title: 'Тернарный оператор',                     type: 'Урок', track: 'JS' },
  { n: 191, title: 'Switch: выбор варианта',                 type: 'Урок', track: 'JS' },
  { n: 192, title: 'Тест: условная логика',                  type: 'Тест', track: 'JS' },
  { n: 193, title: 'Циклы: for и while',                     type: 'Урок', track: 'JS' },
  { n: 194, title: 'Цикл for...of и for...in',               type: 'Урок', track: 'JS' },
  { n: 195, title: 'Break и continue',                       type: 'Урок', track: 'JS' },
  { n: 196, title: 'Тест: циклы',                            type: 'Тест', track: 'JS' },
  { n: 197, title: 'Функции: объявление и вызов',            type: 'Урок', track: 'JS' },
  { n: 198, title: 'Параметры и возврат значений',           type: 'Урок', track: 'JS' },
  { n: 199, title: 'Стрелочные функции',                     type: 'Урок', track: 'JS' },
  { n: 200, title: 'Тест: функции',                          type: 'Тест', track: 'JS' },
  { n: 201, title: 'Массивы: создание и доступ',             type: 'Урок', track: 'JS' },
  { n: 202, title: 'Методы массивов: push, pop, shift',      type: 'Урок', track: 'JS' },
  { n: 203, title: 'Методы массивов: map, filter, find',     type: 'Урок', track: 'JS' },
  { n: 204, title: 'Тест: массивы',                          type: 'Тест', track: 'JS' },
  { n: 205, title: 'Объекты: ключи и значения',              type: 'Урок', track: 'JS' },
  { n: 206, title: 'Методы объектов',                        type: 'Урок', track: 'JS' },
  { n: 207, title: 'Деструктуризация объектов и массивов',   type: 'Урок', track: 'JS' },
  { n: 208, title: 'Тест: объекты',                          type: 'Тест', track: 'JS' },
  { n: 209, title: 'DOM: что это такое',                     type: 'Урок', track: 'JS' },
  { n: 210, title: 'Поиск элементов: querySelector',         type: 'Урок', track: 'JS' },
  { n: 211, title: 'Изменение содержимого и стилей',         type: 'Урок', track: 'JS' },
  { n: 212, title: 'Тест: работа с DOM',                     type: 'Тест', track: 'JS' },
  { n: 213, title: 'События: addEventListener',              type: 'Урок', track: 'JS' },
  { n: 214, title: 'Клик, ввод, отправка формы',             type: 'Урок', track: 'JS' },
  { n: 215, title: 'Event object: target и preventDefault',  type: 'Урок', track: 'JS' },
  { n: 216, title: 'Тест: события',                          type: 'Тест', track: 'JS' },
  { n: 217, title: 'Создание и удаление элементов DOM',      type: 'Урок', track: 'JS' },
  { n: 218, title: 'ClassList: управление классами',         type: 'Урок', track: 'JS' },
  { n: 219, title: 'Практика: интерактивный список задач',   type: 'Урок', track: 'JS' },
  { n: 220, title: 'Тест: динамический DOM',                 type: 'Тест', track: 'JS' },
  { n: 221, title: 'LocalStorage: хранение данных',          type: 'Урок', track: 'JS' },
  { n: 222, title: 'JSON: формат обмена данными',            type: 'Урок', track: 'JS' },
  { n: 223, title: 'Практика: сохраняем список задач',       type: 'Урок', track: 'JS' },
  { n: 224, title: 'Тест: данные в браузере',                type: 'Тест', track: 'JS' },
  { n: 225, title: 'Таймеры: setTimeout и setInterval',      type: 'Урок', track: 'JS' },
  { n: 226, title: 'Практика: обратный отсчёт',              type: 'Урок', track: 'JS' },
  { n: 227, title: 'Практика: слайдер изображений',          type: 'Урок', track: 'JS' },
  { n: 228, title: 'Тест: таймеры и анимации',               type: 'Тест', track: 'JS' },
  { n: 229, title: 'Fetch API: загрузка данных из сети',     type: 'Урок', track: 'JS' },
  { n: 230, title: 'Promise: обещание результата',           type: 'Урок', track: 'JS' },
  { n: 231, title: 'Async / await: удобная асинхронность',   type: 'Урок', track: 'JS' },
  { n: 232, title: 'Тест: асинхронный JS',                   type: 'Тест', track: 'JS' },
  { n: 233, title: 'Работа с API: получаем погоду',          type: 'Урок', track: 'JS' },
  { n: 234, title: 'Работа с API: курс валют',               type: 'Урок', track: 'JS' },
  { n: 235, title: 'Обработка ошибок: try / catch',          type: 'Урок', track: 'JS' },
  { n: 236, title: 'Тест: работа с API',                     type: 'Тест', track: 'JS' },
  { n: 237, title: 'ООП: классы и объекты',                  type: 'Урок', track: 'JS' },
  { n: 238, title: 'Наследование классов',                   type: 'Урок', track: 'JS' },
  { n: 239, title: 'Модули: import и export',                type: 'Урок', track: 'JS' },
  { n: 240, title: 'Тест: ООП и модули',                     type: 'Тест', track: 'JS' },
  { n: 241, title: 'Регулярные выражения: основы',           type: 'Урок', track: 'JS' },
  { n: 242, title: 'Spread и rest операторы',                type: 'Урок', track: 'JS' },
  { n: 243, title: 'Optional chaining и nullish coalescing', type: 'Урок', track: 'JS' },
  { n: 244, title: 'Тест: современный JS',                   type: 'Тест', track: 'JS' },
  { n: 245, title: 'Практика: калькулятор',                  type: 'Урок', track: 'JS' },
  { n: 246, title: 'Практика: форма с валидацией',           type: 'Урок', track: 'JS' },
  { n: 247, title: 'Практика: аккордеон FAQ',                type: 'Урок', track: 'JS' },
  { n: 248, title: 'Тест: UI-компоненты',                    type: 'Тест', track: 'JS' },
  { n: 249, title: 'Практика: фильтрация каталога',          type: 'Урок', track: 'JS' },
  { n: 250, title: 'Практика: тёмная/светлая тема',          type: 'Урок', track: 'JS' },
  { n: 251, title: 'Практика: бесконечная прокрутка',        type: 'Урок', track: 'JS' },
  { n: 252, title: 'Тест: интерактивность',                  type: 'Тест', track: 'JS' },
  { n: 253, title: 'Отладка: console и DevTools',            type: 'Урок', track: 'JS' },
  { n: 254, title: 'Производительность: debounce и throttle',type: 'Урок', track: 'JS' },
  { n: 255, title: 'Знакомство с npm и пакетами',            type: 'Урок', track: 'JS' },
  { n: 256, title: 'Тест: инструменты разработчика',         type: 'Тест', track: 'JS' },
  { n: 257, title: 'Введение в React: зачем он нужен',       type: 'Урок', track: 'JS' },
  { n: 258, title: 'Введение в Vue: альтернатива React',     type: 'Урок', track: 'JS' },
  { n: 259, title: 'Что такое TypeScript',                   type: 'Урок', track: 'JS' },
  { n: 260, title: 'Тест: фреймворки и будущее',             type: 'Тест', track: 'JS' },
  { n: 261, title: 'Финальный проект: планируем сайт',       type: 'Урок', track: 'JS' },
  { n: 262, title: 'Финальный проект: HTML-каркас',          type: 'Урок', track: 'JS' },
  { n: 263, title: 'Финальный проект: стилизация CSS',       type: 'Урок', track: 'JS' },
  { n: 264, title: 'Финальный проект: добавляем JS',         type: 'Урок', track: 'JS' },
  { n: 265, title: 'Финальный проект: публикация',           type: 'Урок', track: 'JS' },
  { n: 266, title: 'Тест: финальный проект',                 type: 'Тест', track: 'JS' },
  { n: 267, title: 'Карьера: как стать разработчиком',       type: 'Урок', track: 'JS' },
  { n: 268, title: 'Портфолио: что туда положить',           type: 'Урок', track: 'JS' },
  { n: 269, title: 'Ошибки новичков в JavaScript',           type: 'Урок', track: 'JS' },
  { n: 270, title: 'Финальный тест всего курса',             type: 'Тест', track: 'JS' },
];

function Header({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container flex items-center justify-between h-20 px-4">
        <button onClick={() => onNav('home')} className="flex items-center gap-3 hover-scale">
          <img src={LOGO} alt="WebLerner" className="w-11 h-11 rounded-xl object-cover glow-shadow" />
          <span className="font-display font-extrabold text-2xl tracking-tight text-gradient">WebLerner</span>
        </button>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => onNav(n.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active === n.id ? 'bg-aurora text-white glow-shadow' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Icon name={n.icon} size={16} />
              {n.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10 animate-fade-in">
      <span className="text-accent font-mono text-sm uppercase tracking-widest">{kicker}</span>
      <h2 className="font-display font-extrabold text-4xl md:text-5xl mt-2">{title}</h2>
    </div>
  );
}

function HomeSection({ onNav, doneLessons }: { onNav: (id: string) => void; doneLessons: number[] }) {
  const pct = Math.round((doneLessons.length / 270) * 100);
  return (
    <div className="space-y-28">
      <section className="relative pt-16 md:pt-24 text-center">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-[120px] animate-glow" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-[120px] animate-glow" />
        <div className="relative animate-fade-in">
          <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-glow" />
            270 интерактивных уроков · с нуля до своего сайта
          </span>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.05] max-w-4xl mx-auto">
            Создавайте <span className="text-gradient animate-gradient-shift">крутые сайты</span> своими руками
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-8">
            Учу HTML, CSS и JavaScript понятным языком — как будто объясняю другу.
            После курса вы сможете сделать сайт не хуже этого.
          </p>
          {doneLessons.length > 0 && (
            <div className="max-w-sm mx-auto mt-8 glass rounded-2xl px-6 py-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Ваш прогресс</span>
                <span className="font-mono font-bold text-accent">{pct}%</span>
              </div>
              <Progress value={pct} className="h-2" />
            </div>
          )}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            <Button size="lg" onClick={() => onNav('lessons')} className="bg-aurora animate-gradient-shift text-white text-base h-14 px-8 rounded-2xl glow-shadow hover-scale border-0">
              {doneLessons.length > 0 ? 'Продолжить обучение' : 'Начать обучение'}
              <Icon name="ArrowRight" size={20} className="ml-1" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNav('progress')} className="h-14 px-8 rounded-2xl text-base glass border-border hover-scale">
              Мой прогресс
            </Button>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-6">
        {[
          { num: '270', label: 'уроков и тестов', emoji: '📚' },
          { num: '3', label: 'технологии: HTML · CSS · JS', emoji: '⚙️' },
          { num: '100%', label: 'практики и интерактива', emoji: '💡' },
        ].map((s, i) => (
          <div key={s.label} className="glass rounded-3xl p-8 text-center hover-scale animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="text-4xl mb-3">{s.emoji}</div>
            <div className="font-display font-extrabold text-5xl text-gradient">{s.num}</div>
            <div className="text-muted-foreground mt-2">{s.label}</div>
          </div>
        ))}
      </section>

      <section>
        <SectionTitle kicker="Программа" title="Три трека обучения" />
        <div className="grid md:grid-cols-3 gap-6">
          {TRACKS.map((t, i) => (
            <button
              key={t.tag}
              onClick={() => onNav('lessons')}
              className="group relative text-left glass rounded-3xl p-8 overflow-hidden hover-scale animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${t.color} opacity-30 blur-2xl group-hover:opacity-60 transition-opacity`} />
              <div className="relative">
                <div className="text-5xl mb-5">{t.emoji}</div>
                <span className={`inline-block text-xs font-mono font-bold px-3 py-1 rounded-full bg-gradient-to-r ${t.color} text-white`}>{t.tag}</span>
                <h3 className="font-display font-bold text-2xl mt-4">{t.title}</h3>
                <p className="text-muted-foreground mt-2">{t.lessons} уроков с практикой</p>
                <span className="inline-flex items-center gap-1 text-accent font-medium mt-5 group-hover:gap-2 transition-all">
                  Открыть <Icon name="ArrowRight" size={16} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function LessonsSection({ doneLessons, onToggle }: { doneLessons: number[]; onToggle: (n: number) => void }) {
  const [activeTrack, setActiveTrack] = useState<'HTML' | 'CSS' | 'JS'>('HTML');
  const filtered = ALL_LESSONS.filter((l) => l.track === activeTrack);
  const trackColors: Record<string, string> = {
    HTML: 'from-orange-500 to-pink-500',
    CSS: 'from-sky-400 to-indigo-500',
    JS: 'from-fuchsia-500 to-purple-600',
  };

  return (
    <div>
      <SectionTitle kicker="270 уроков" title="Уроки и тесты" />
      <div className="flex gap-3 mb-8">
        {(['HTML', 'CSS', 'JS'] as const).map((track) => (
          <button
            key={track}
            onClick={() => setActiveTrack(track)}
            className={`px-5 py-2 rounded-xl font-mono font-bold text-sm transition-all ${
              activeTrack === track
                ? `bg-gradient-to-r ${trackColors[track]} text-white glow-shadow`
                : 'glass text-muted-foreground hover:text-foreground'
            }`}
          >
            {track}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((l, i) => {
          const done = doneLessons.includes(l.n);
          return (
            <div
              key={l.n}
              onClick={() => onToggle(l.n)}
              className="group glass rounded-2xl p-5 flex items-center gap-5 hover-scale animate-fade-in cursor-pointer"
              style={{ animationDelay: `${i * 0.02}s` }}
            >
              <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-sm transition-all ${
                done
                  ? `bg-gradient-to-br ${trackColors[activeTrack]} text-white`
                  : 'bg-secondary text-muted-foreground'
              }`}>
                {done ? <Icon name="Check" size={20} /> : l.n}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-xs font-mono uppercase tracking-wider ${l.type === 'Тест' ? 'text-accent' : 'text-primary'}`}>{l.type}</span>
                <h3 className={`font-display font-semibold text-base truncate ${done ? 'opacity-60 line-through' : ''}`}>{l.title}</h3>
              </div>
              <Icon name={done ? 'CheckCircle' : 'ChevronRight'} size={20} className={done ? 'text-accent' : 'text-muted-foreground group-hover:translate-x-1 transition-all'} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProgressSection({ doneLessons }: { doneLessons: number[] }) {
  const htmlDone = doneLessons.filter((n) => n <= 90).length;
  const cssDone = doneLessons.filter((n) => n >= 91 && n <= 180).length;
  const jsDone = doneLessons.filter((n) => n >= 181).length;
  const total = doneLessons.length;
  const pct = Math.round((total / 270) * 100);

  const tracks = [
    { tag: 'HTML', done: htmlDone, total: 90, color: 'from-orange-500 to-pink-500' },
    { tag: 'CSS', done: cssDone, total: 90, color: 'from-sky-400 to-indigo-500' },
    { tag: 'JavaScript', done: jsDone, total: 90, color: 'from-fuchsia-500 to-purple-600' },
  ];

  const achievements = [
    { emoji: '🧱', title: 'Первый урок', got: total >= 1 },
    { emoji: '🔟', title: '10 уроков', got: total >= 10 },
    { emoji: '🌟', title: '25 уроков', got: total >= 25 },
    { emoji: '🏅', title: 'HTML завершён', got: htmlDone === 90 },
    { emoji: '🎨', title: 'CSS завершён', got: cssDone === 90 },
    { emoji: '💎', title: 'Все 270 уроков', got: total === 270 },
  ];

  return (
    <div>
      <SectionTitle kicker="Мой путь" title="Прогресс обучения" />
      <div className="glass rounded-3xl p-8 mb-8 animate-fade-in text-center">
        <div className="font-display font-extrabold text-7xl text-gradient">{pct}%</div>
        <p className="text-muted-foreground mt-2">{total} из 270 уроков пройдено</p>
        <Progress value={pct} className="h-3 mt-6" />
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {tracks.map((t, i) => (
          <div key={t.tag} className="glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex justify-between items-center mb-3">
              <span className="font-display font-bold text-lg">{t.tag}</span>
              <span className="font-mono text-sm text-muted-foreground">{t.done}/{t.total}</span>
            </div>
            <div className="h-3 rounded-full bg-secondary overflow-hidden">
              <div className={`h-full rounded-full bg-gradient-to-r ${t.color} transition-all duration-700`} style={{ width: `${(t.done / t.total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <h3 className="font-display font-bold text-2xl mb-5">🏅 Достижения</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {achievements.map((a, i) => (
          <div
            key={a.title}
            className={`glass rounded-2xl p-5 text-center animate-fade-in transition-all ${a.got ? 'glow-shadow' : 'opacity-40 grayscale'}`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="text-4xl mb-2">{a.emoji}</div>
            <div className="font-medium text-sm">{a.title}</div>
            {!a.got && <div className="text-xs text-muted-foreground mt-1">заблокировано</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function TestsSection() {
  const tests = [
    { title: 'Основы HTML', q: 10, color: 'from-orange-500 to-pink-500' },
    { title: 'Основы CSS', q: 12, color: 'from-sky-400 to-indigo-500' },
    { title: 'Основы JavaScript', q: 8, color: 'from-fuchsia-500 to-purple-600' },
  ];
  return (
    <div>
      <SectionTitle kicker="Проверка знаний" title="Тесты" />
      <div className="grid md:grid-cols-3 gap-6">
        {tests.map((t, i) => (
          <div key={t.title} className="glass rounded-3xl p-7 hover-scale animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center mb-5`}>
              <Icon name="ClipboardCheck" size={26} className="text-white" />
            </div>
            <h3 className="font-display font-bold text-xl">{t.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{t.q} вопросов</p>
            <Button className="w-full mt-5 bg-aurora text-white rounded-xl border-0 hover-scale">
              Начать тест
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileSection({ level, doneLessons }: { level: string; doneLessons: number[] }) {
  const lvl = LEVELS.find((l) => l.id === level) ?? LEVELS[0];
  const total = doneLessons.length;
  return (
    <div>
      <SectionTitle kicker="Аккаунт" title="Мой профиль" />
      <div className="glass rounded-3xl p-8 md:p-10 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full glow-shadow" style={{ background: 'linear-gradient(135deg, hsl(270,95%,65%), hsl(190,95%,55%), hsl(320,90%,60%))' }} />
          <div className="text-center sm:text-left">
            <h3 className="font-display font-extrabold text-3xl">Будущий веб-разработчик</h3>
            <p className="text-muted-foreground mt-1">Ваш уровень: {lvl.emoji} {lvl.title}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { v: String(total), l: 'уроков пройдено' },
            { v: String(Math.round((total / 270) * 100)) + '%', l: 'курса пройдено' },
            { v: String(ALL_LESSONS.filter(l => l.type === 'Тест' && doneLessons.includes(l.n)).length), l: 'тестов сдано' },
            { v: total >= 1 ? '🔥' : '—', l: 'активность' },
          ].map((s) => (
            <div key={s.l} className="bg-secondary/50 rounded-2xl p-5 text-center">
              <div className="font-display font-bold text-3xl text-gradient">{s.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CertificateSection({ doneLessons }: { doneLessons: number[] }) {
  const pct = Math.round((doneLessons.length / 270) * 100);
  const done = doneLessons.length === 270;
  return (
    <div>
      <SectionTitle kicker="Финиш курса" title="Сертификат" />
      <div className="relative glass rounded-[2rem] p-10 md:p-16 text-center overflow-hidden animate-scale-in">
        <div className="absolute inset-0 bg-aurora opacity-10 animate-gradient-shift" />
        <div className="relative">
          <div className="text-7xl mb-6 animate-float">🎓</div>
          <span className="font-mono text-accent uppercase tracking-[0.3em] text-sm">Certificate of Completion</span>
          <h3 className="font-display font-extrabold text-4xl md:text-5xl mt-4 text-gradient">WebLerner Pro</h3>
          <p className="text-muted-foreground max-w-md mx-auto mt-6">
            Пройдите все 270 уроков и итоговый тест, чтобы получить именной сертификат веб-разработчика.
          </p>
          <div className="w-full max-w-sm mx-auto mt-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Готовность</span>
              <span className="font-mono font-bold">{pct}%</span>
            </div>
            <Progress value={pct} className="h-3" />
          </div>
          <Button disabled={!done} className={`mt-8 h-12 px-8 rounded-2xl border-0 ${done ? 'bg-aurora text-white glow-shadow' : 'bg-secondary text-muted-foreground'}`}>
            {done ? <><Icon name="Award" size={18} className="mr-2" />Получить сертификат</> : <><Icon name="Lock" size={18} className="mr-2" />Доступно после завершения курса</>}
          </Button>
        </div>
      </div>
    </div>
  );
}

function LevelGate({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[140px] animate-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[140px] animate-glow" />
      <div className="relative max-w-3xl w-full text-center">
        <img src={LOGO} alt="WebLerner" className="w-20 h-20 rounded-2xl object-cover mx-auto glow-shadow animate-float" />
        <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-8 animate-fade-in">
          Добро пожаловать в <span className="text-gradient">WebLerner</span>
        </h1>
        <p className="text-lg text-muted-foreground mt-5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Подскажите, насколько хорошо вы знакомы с веб-разработкой —
          и я подберу подходящую подачу материала.
        </p>
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {LEVELS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => onSelect(l.id)}
              className="group glass rounded-3xl p-7 text-center hover-scale animate-fade-in hover:border-primary"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{l.emoji}</div>
              <h3 className="font-display font-bold text-xl">{l.title}</h3>
              <p className="text-sm text-muted-foreground mt-3">{l.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const Index = () => {
  const [level, setLevel] = useState<string | null>(null);
  const [section, setSection] = useState('home');
  const [doneLessons, setDoneLessons] = useState<number[]>([]);

  const toggleLesson = (n: number) => {
    setDoneLessons((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  const pct = useMemo(() => Math.round((doneLessons.length / 270) * 100), [doneLessons]);

  if (!level) return <LevelGate onSelect={setLevel} />;

  return (
    <div className="min-h-screen">
      <Header active={section} onNav={setSection} />
      <main className="container px-4 py-12 md:py-16">
        {section === 'home' && <HomeSection onNav={setSection} doneLessons={doneLessons} />}
        {section === 'lessons' && <LessonsSection doneLessons={doneLessons} onToggle={toggleLesson} />}
        {section === 'progress' && <ProgressSection doneLessons={doneLessons} />}
        {section === 'tests' && <TestsSection />}
        {section === 'profile' && <ProfileSection level={level} doneLessons={doneLessons} />}
        {section === 'certificate' && <CertificateSection doneLessons={doneLessons} />}
      </main>

      <nav className="lg:hidden sticky bottom-0 z-50 glass">
        <div className="flex justify-around py-2">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setSection(n.id)}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                section === n.id ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              <Icon name={n.icon} size={20} />
              {n.label}
            </button>
          ))}
        </div>
      </nav>

      <footer className="container px-4 py-10 text-center text-sm text-muted-foreground">
        WebLerner · учу веб-разработке понятным языком 🚀
        {doneLessons.length > 0 && (
          <span className="ml-3 font-mono text-accent">{pct}% курса пройдено</span>
        )}
        <div className="mt-2 font-mono text-xs opacity-60">© Вахрушев И.Г. 2026 г.</div>
      </footer>
    </div>
  );
};

export default Index;
