# Single Place Assistant (front)

TODO:
* show loading progress


libs:

Toast
https://react-hot-toast.com/

Icon repository
https://www.svgrepo.com/vectors/lock/

Architecture = FEATURE SLICED DESIGN
* https://www.youtube.com/watch?v=c3JGBdxfYcU&t=4s
* https://github.com/feature-sliced/documentation

Слой *состоит из* Слайс(модуль) *состоит из* Сегмент

### Слои:
* app = инициализатор всего приложения
  * провайдеры
  * роутер
  * конфигурация
  * глобальные стили
  * глобальные декларации с типами
* processes = (опц) процессы приложения, протекающие над страницами
* pages = страницы приложения
* widgets = максимально самостоятельные компоненты. Примеры:
  * Sidebar
  * Header/navbar
  * Footer
  * Postcard
* features = (опц) Обрабатываемые пользовательские сценарии. Примеры:
  * Подписка
  * Поставить лайк
  * Оценка товара
  * AuthByPhone
  * ArticleFeedback
  * ChangePhoneForm
* entities = (опц) бизнес сущности. Аналог данных на бэкенде.
     Принимает на вход пропсы, и отрисовывает компонент
     Примеры:
  * Лист комментариев
  * Форма комментария
  * Характеристики продукта
  * Описание продукта
  * Список продуктов
  * user
  * article
  * product
  * order
  * comment
  * contract
* shared = переиспользуемые модули, без привязки к бизнес логике

### Внутри каждого слайса есть сегменты:
* index.tx - доступные функции для внешнего использования
* UI - компоненты
* model - бизнес логика (state, selector, action)
* lib - все хелперы(работа с url, store), вспомогательные функции, хуки
* config - редкая шняга (конфигурация)
* api - запросы на сервер
* const - константы, необходимые для модуля