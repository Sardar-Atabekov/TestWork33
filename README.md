# TestWork33

Тестовое задание, реализованное с использованием Next.js, TypeScript, Zustand и SCSS.
Проект представляет собой приложение с базовой архитектурой и минимальной конфигурацией.

## 📦 Стек технологий

- Next.js
- TypeScript
- SCSS (Sass)
- Zustand

## 🚀 Установка и запуск

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/Sardar-Atabekov/TestWork33.git
   cd TestWork33
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Запустите приложение в режиме разработки:

   ```bash
   npm run dev
   ```

4. Откройте [http://localhost:3000](http://localhost:3000) в браузере для просмотра.

## 🗂️ Структура проекта

```bash
src/
├── app/              # Инициализация, маршруты, глобальные провайдеры
├── pages/            # Next.js-страницы
├── widgets/          # UI-блоки, объединяющие сущности и фичи
├── features/         # Функциональные модули (например, auth, toggleTheme и т.д.)
├── entities/         # Бизнес-сущности (User, Product, Post и т.д.)
├── shared/
│   ├── ui/           # Базовые переиспользуемые UI-компоненты
│   ├── lib/          # Утилиты, хелперы
│   ├── config/       # Конфигурации (например, маршруты, настройки)
│   └── types/        # Общие типы
├── .eslintrc.js        # Конфигурация ESLint
├── .gitignore          # Исключения для Git
├── generated-icon.png  # Сгенерированная иконка
├── next-env.d.ts       # Типы среды Next.js
├── next.config.js      # Конфигурация Next.js
├── package.json        # Зависимости и скрипты
├── package-lock.json   # Лок-файл npm
├── prettier.config.js  # Конфигурация Prettier
└── tsconfig.json       # Конфигурация TypeScript

```

## ⚙️ Скрипты

- `npm run dev` — запуск в режиме разработки
- `npm run build` — сборка проекта
- `npm run start` — запуск собранного проекта

## 🧑‍💻 Автор

[Sardar Atabekov](https://github.com/Sardar-Atabekov)

---

Проект выполнен в рамках тестового задания. Структура и функциональность могут быть расширены...
