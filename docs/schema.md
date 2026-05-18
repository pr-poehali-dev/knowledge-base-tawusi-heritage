# Tawûsî Heritage — Database Schema

PostgreSQL schema: `t_p2339777_knowledge_base_tawus`

## i18n-стратегия

Текстовые поля вынесены в отдельные `*_translations` таблицы.  
Поле `locale CHAR(2)` принимает: `ru` | `en` | `ku`.  
Уникальный индекс `(entity_id, locale)` — один перевод на язык.  
Нелокализованные данные (даты, координаты, slug) хранятся в основной таблице.

---

## Таблицы

### `persons` + `person_translations`
Человек в родовом древе.

| Колонка | Тип | Описание |
|---|---|---|
| `id` | UUID PK | — |
| `user_id` | UUID FK→users | привязка к аккаунту |
| `gender` | enum | male / female / unknown |
| `birth_year` | SMALLINT | год рождения |
| `death_year` | SMALLINT | год смерти (null если жив) |
| `birth_place` | VARCHAR | топоним (не переводится) |
| `clan` | VARCHAR | название рода |
| `is_public` | BOOLEAN | видимость |

**person_translations:** `locale`, `first_name`, `last_name`, `bio`

---

### `relationships`
Связи между персонами.

| `type` | Значение |
|---|---|
| `parent` | A — родитель B |
| `child` | A — ребёнок B |
| `spouse` | супруги |
| `sibling` | братья/сёстры |
| `other` | иная связь |

---

### `stories` + `story_translations`
Семейные истории и культурные статьи.

Статусы: `draft → pending → approved / rejected`

**story_translations:** `locale`, `title`, `body`

---

### `photos` + `photo_translations`
Архив фотографий. Привязываются к персоне и/или истории.

**photo_translations:** `locale`, `caption`

---

### `qewls` + `qewl_translations`
Священные песнопения.

| Колонка | Описание |
|---|---|
| `slug` | уникальный идентификатор (напр. `qewle-shexe-adi`) |
| `audio_url` | ссылка на аудиофайл |
| `duration_sec` | длительность в секундах |

**qewl_translations:** `locale`, `title`, `subtitle`, `lyrics`, `translation`, `notes`

---

## Seed-данные

Запуск: `POST /seed {"action": "run"}` (идемпотентно)  
Статус: `GET /seed?action=status`

Содержит примеры на **ru / en / ku**:
- 3 персоны: Шейх Ади ибн Мусафир, Мирза Динаий, Нарин Динаий
- 2 связи (родитель → ребёнок)
- 2 истории с переводами
- 1 фото с подписями
- 3 священных гимна (Qewlê Şêxê Adî, Qewlê Tawisî Melek, Lalish Dengbêjî)
