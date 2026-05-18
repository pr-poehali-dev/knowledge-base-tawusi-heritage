"""
Seed-функция: заполняет таблицы тестовыми данными на ru / en / ku.
Вызывать POST / {"action": "run"} — идемпотентно (повторный запуск безопасен).
GET  / {"action": "status"} — возвращает количество записей в каждой таблице.
"""
import json
import os
import psycopg2

DB_URL = os.environ["DATABASE_URL"]
SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p2339777_knowledge_base_tawus")

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def resp(status: int, body: dict) -> dict:
    return {
        "statusCode": status,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps(body, ensure_ascii=False),
    }


def get_conn():
    return psycopg2.connect(DB_URL, options=f"-c search_path={SCHEMA}")


def handler(event: dict, context) -> dict:
    """Seed: action=run заполняет БД примерами, action=status — статистика"""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    params = event.get("queryStringParameters") or {}
    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    action = body.get("action") or params.get("action", "status")

    if action == "run":
        return _run_seed()
    if action == "status":
        return _status()
    return resp(400, {"error": "unknown action"})


# ──────────────────────────────────────────────────────────────
# STATUS
# ──────────────────────────────────────────────────────────────
def _status() -> dict:
    conn = get_conn()
    cur = conn.cursor()
    tables = ["persons", "person_translations", "relationships",
              "stories", "story_translations",
              "photos", "photo_translations",
              "qewls", "qewl_translations"]
    counts = {}
    for t in tables:
        cur.execute(f"SELECT COUNT(*) FROM {t}")
        counts[t] = cur.fetchone()[0]
    conn.close()
    return resp(200, {"counts": counts})


# ──────────────────────────────────────────────────────────────
# SEED
# ──────────────────────────────────────────────────────────────
def _run_seed() -> dict:
    conn = get_conn()
    cur = conn.cursor()

    # Проверяем, уже засеяно ли
    cur.execute("SELECT COUNT(*) FROM persons")
    if cur.fetchone()[0] > 0:
        conn.close()
        return resp(200, {"message": "Already seeded — skipped", "seeded": False})

    # ── PERSONS ──────────────────────────────────────────────
    # Персона 1: Шейх Ади ибн Мусафир (историческая)
    cur.execute(
        """INSERT INTO persons (gender, birth_year, death_year, birth_place, clan, is_public)
           VALUES (%s, %s, %s, %s, %s, TRUE) RETURNING id""",
        ("male", 1073, 1162, "Баальбек, Ливан", "Адавийя"),
    )
    p1 = str(cur.fetchone()[0])

    cur.executemany(
        "INSERT INTO person_translations (person_id, locale, first_name, last_name, bio) VALUES (%s,%s,%s,%s,%s)",
        [
            (p1, "ru", "Шейх Ади", "ибн Мусафир",
             "Суфийский мистик и духовный лидер, основатель общины Адавийя. "
             "Почитается езидами как святой — его гробница в Лалеше является "
             "местом ежегодного паломничества."),
            (p1, "en", "Sheikh Adi", "ibn Musafir",
             "Sufi mystic and spiritual leader, founder of the Adawiyya order. "
             "Venerated by Yazidis as a saint — his tomb in Lalish is the site "
             "of annual pilgrimage."),
            (p1, "ku", "Şêxê Adî", "ibn Musafir",
             "Mîstîkê sûfî û serokê giyanî, damezrînerê komela Adawiyya. "
             "Bi rûmetê Êzidiyan wekî pîrozek tê hesibandin — gora wî li Laleşê "
             "cihê ziyareta salane ye."),
        ],
    )

    # Персона 2: Мирза Динаий (вымышленный предок для демо)
    cur.execute(
        """INSERT INTO persons (gender, birth_year, death_year, birth_place, clan, is_public)
           VALUES (%s, %s, %s, %s, %s, TRUE) RETURNING id""",
        ("male", 1880, 1955, "Синджар, Ирак", "Синджари"),
    )
    p2 = str(cur.fetchone()[0])

    cur.executemany(
        "INSERT INTO person_translations (person_id, locale, first_name, last_name, bio) VALUES (%s,%s,%s,%s,%s)",
        [
            (p2, "ru", "Мирза", "Динаий",
             "Старейшина рода Синджари, хранитель устных преданий и священных "
             "текстов общины. Пережил несколько волн преследований, сохранив "
             "родовую память для потомков."),
            (p2, "en", "Mirza", "Dinaii",
             "Elder of the Sinjari clan, keeper of oral traditions and sacred "
             "texts of the community. Survived several waves of persecution, "
             "preserving ancestral memory for descendants."),
            (p2, "ku", "Mîrza", "Dinaî",
             "Rêberê eşîra Sincarî, parastvanê çîrokên devkî û nivîsên pîroz "
             "ên civakê. Çend pêlên zulm û zordariyê derbas kir û bîranîna "
             "bav û kalên xwe ji bo neviyên xwe parast."),
        ],
    )

    # Персона 3: Нарин Динаий — внучка
    cur.execute(
        """INSERT INTO persons (gender, birth_year, death_year, birth_place, clan, is_public)
           VALUES (%s, %s, %s, %s, %s, TRUE) RETURNING id""",
        ("female", 1942, None, "Синджар, Ирак", "Синджари"),
    )
    p3 = str(cur.fetchone()[0])

    cur.executemany(
        "INSERT INTO person_translations (person_id, locale, first_name, last_name, bio) VALUES (%s,%s,%s,%s,%s)",
        [
            (p3, "ru", "Нарин", "Динаий",
             "Дочь Мирзы, первая грамотная женщина рода. Записала семейные "
             "предания и передала их следующим поколениям."),
            (p3, "en", "Narin", "Dinaii",
             "Mirza's daughter, the first literate woman in the clan. She "
             "wrote down family legends and passed them to the next generations."),
            (p3, "ku", "Narîn", "Dinaî",
             "Keça Mîrza, yekem jinê xwendewar a eşîrê. Çîrokên malbatê nivîsî "
             "û ji nifşên pêşerojê re şand."),
        ],
    )

    # ── RELATIONSHIPS ────────────────────────────────────────
    cur.execute(
        "INSERT INTO relationships (person_a_id, person_b_id, type, note) VALUES (%s,%s,%s,%s)",
        (p2, p3, "parent", "Мирза — отец Нарин"),
    )
    cur.execute(
        "INSERT INTO relationships (person_a_id, person_b_id, type, note) VALUES (%s,%s,%s,%s)",
        (p3, p2, "child", "Нарин — дочь Мирзы"),
    )

    # ── STORIES ──────────────────────────────────────────────
    cur.execute(
        """INSERT INTO stories (person_id, status, cover_url)
           VALUES (%s, 'approved', NULL) RETURNING id""",
        (p2,),
    )
    s1 = str(cur.fetchone()[0])

    cur.executemany(
        "INSERT INTO story_translations (story_id, locale, title, body) VALUES (%s,%s,%s,%s)",
        [
            (s1, "ru", "Путь через горы",
             "В 1915 году Мирза Динаий вёл свою семью через горные перевалы "
             "Синджара. Ночами они прятались в пещерах, днём пробирались "
             "тропами, известными только пастухам. Его внуки до сих пор помнят "
             "эту историю — как дед пел священные гимны, чтобы поддержать "
             "духом идущих рядом."),
            (s1, "en", "The Path Through the Mountains",
             "In 1915, Mirza Dinaii led his family through the mountain passes "
             "of Sinjar. At night they hid in caves; by day they moved along "
             "paths known only to shepherds. His grandchildren still remember "
             "the story — how grandfather sang sacred hymns to keep the spirits "
             "of those walking beside him high."),
            (s1, "ku", "Riya Çiyayan",
             "Di sala 1915-an de, Mîrza Dinaî malbata xwe di nav derbendên "
             "Çiyayê Sincarê de birin. Şevê di şikeftan de vedişartin, "
             "roj bi rê û birên ku tenê çoban dizanibûn diçûn. "
             "Neviyên wî hîn jî vê çîrokê tînin bîra xwe — çawa bapîr "
             "stranên pîroz dixwend da ku keça û kurên li kêleka wî "
             "bibin xwediyê hêzê."),
        ],
    )

    cur.execute(
        """INSERT INTO stories (person_id, status, cover_url)
           VALUES (%s, 'approved', NULL) RETURNING id""",
        (p1,),
    )
    s2 = str(cur.fetchone()[0])

    cur.executemany(
        "INSERT INTO story_translations (story_id, locale, title, body) VALUES (%s,%s,%s,%s)",
        [
            (s2, "ru", "Лалеш — священная долина",
             "Долина Лалеш расположена в 60 км к северу от Мосула. Здесь "
             "покоятся мощи Шейха Ади ибн Мусафира. Каждый год в октябре "
             "тысячи езидов со всего мира совершают паломничество — омываются "
             "в священных источниках, зажигают светильники и слушают пение "
             "кавалей. Это место считается духовным центром всей нации."),
            (s2, "en", "Lalish — The Sacred Valley",
             "The valley of Lalish lies 60 km north of Mosul. Here rest the "
             "relics of Sheikh Adi ibn Musafir. Every October thousands of "
             "Yazidis from around the world make the pilgrimage — bathing in "
             "sacred springs, lighting oil lamps, and listening to the chanting "
             "of qawwals. This place is considered the spiritual center of the "
             "entire nation."),
            (s2, "ku", "Laleş — Geliya Pîroz",
             "Geliya Laleşê 60 km li bakurê Mûsilê ye. Li vir bermayên "
             "Şêxê Adî ibn Musafir hene. Her salê di cotmehê de bi hezaran "
             "Êzidî ji çar aliyên cîhanê tên ziyaretê — xwe di çavkaniyên "
             "pîroz de dişon, çira pêdixin û stranên kewalan guhdarî dikin. "
             "Ev cih wekî navenda giyanî ya tevahiya netewê tê hesibandin."),
        ],
    )

    # ── PHOTOS ───────────────────────────────────────────────
    cur.execute(
        """INSERT INTO photos (person_id, story_id, url, taken_year, status)
           VALUES (%s, %s, %s, %s, 'approved') RETURNING id""",
        (p2, s1,
         "https://cdn.poehali.dev/projects/fa7a9dc1-94fe-4481-b369-7a53779b1282/files/66d766c9-eafb-42fc-83b2-481c5624befb.jpg",
         1940),
    )
    ph1 = str(cur.fetchone()[0])

    cur.executemany(
        "INSERT INTO photo_translations (photo_id, locale, caption) VALUES (%s,%s,%s)",
        [
            (ph1, "ru", "Мирза Динаий с семьёй, ок. 1940 г. Синджар."),
            (ph1, "en", "Mirza Dinaii with family, ca. 1940. Sinjar."),
            (ph1, "ku", "Mîrza Dinaî bi malbata xwe, nêz. 1940. Sincar."),
        ],
    )

    # ── QEWLS ────────────────────────────────────────────────
    cur.execute(
        """INSERT INTO qewls (slug, audio_url, duration_sec, status)
           VALUES (%s, NULL, %s, 'approved') RETURNING id""",
        ("qewle-shexe-adi", 272),
    )
    q1 = str(cur.fetchone()[0])

    cur.executemany(
        """INSERT INTO qewl_translations
               (qewl_id, locale, title, subtitle, lyrics, translation, notes)
           VALUES (%s,%s,%s,%s,%s,%s,%s)""",
        [
            (q1, "ru", "Qewlê Şêxê Adî", "Гимн Шейху Ади",
             "Şêxê Adî, xwedê dilovan\nLa ilah ill Allah...",
             "О Шейх Ади, милосердный господин\nНет бога кроме Бога...",
             "Один из старейших религиозных гимнов. Исполняется кавалями "
             "во время паломничества в Лалеш."),
            (q1, "en", "Qewlê Şêxê Adî", "Hymn to Sheikh Adi",
             "Şêxê Adî, xwedê dilovan\nLa ilah ill Allah...",
             "O Sheikh Adi, merciful lord\nThere is no god but God...",
             "One of the oldest religious hymns. Performed by qawwals during "
             "the pilgrimage to Lalish."),
            (q1, "ku", "Qewlê Şêxê Adî", "Straneke ji bo Şêxê Adî",
             "Şêxê Adî, xwedê dilovan\nLa ilah ill Allah...",
             "Ay Şêxê Adî, xwedayê dilovan\nXwedayekî din tune...",
             "Yek ji kevntirîn stranên olî. Di dema ziyareta Laleşê de ji "
             "aliyê kewalan ve tê xwendin."),
        ],
    )

    cur.execute(
        """INSERT INTO qewls (slug, audio_url, duration_sec, status)
           VALUES (%s, NULL, %s, 'approved') RETURNING id""",
        ("qewle-tawisi-melek", 348),
    )
    q2 = str(cur.fetchone()[0])

    cur.executemany(
        """INSERT INTO qewl_translations
               (qewl_id, locale, title, subtitle, lyrics, translation, notes)
           VALUES (%s,%s,%s,%s,%s,%s,%s)""",
        [
            (q2, "ru", "Qewlê Tawisî Melek", "Гимн Малак Тавусу",
             "Tawisî Melek, ronahiya me\nTu ronahiya heft asman î...",
             "Малак Тавус, наш свет\nТы свет семи небес...",
             "Посвящён Малак Тавусу — Ангелу-Павлину. Исполняется "
             "в начале священных собраний."),
            (q2, "en", "Qewlê Tawisî Melek", "Hymn to Melek Taus",
             "Tawisî Melek, ronahiya me\nTu ronahiya heft asman î...",
             "Melek Taus, our light\nYou are the light of seven heavens...",
             "Dedicated to Melek Taus — the Peacock Angel. Performed at the "
             "opening of sacred gatherings."),
            (q2, "ku", "Qewlê Tawisî Melek", "Straneya Tawisî Melek",
             "Tawisî Melek, ronahiya me\nTu ronahiya heft asman î...",
             "Tawisî Melek, ronahiya me\nTu ronahiya heft ezman î...",
             "Terxankirî ji bo Tawisî Melek — Melekê Tawûs. Di destpêka "
             "civînên pîroz de tê xwendin."),
        ],
    )

    cur.execute(
        """INSERT INTO qewls (slug, audio_url, duration_sec, status)
           VALUES (%s, NULL, %s, 'approved') RETURNING id""",
        ("lalish-dengbeji", 374),
    )
    q3 = str(cur.fetchone()[0])

    cur.executemany(
        """INSERT INTO qewl_translations
               (qewl_id, locale, title, subtitle, lyrics, translation, notes)
           VALUES (%s,%s,%s,%s,%s,%s,%s)""",
        [
            (q3, "ru", "Lalish Dengbêjî", "Песнопение Лалеша",
             "Laleş, ciyê pîroz\nKû dengê bav û kalan tê...",
             "Лалеш, священное место\nГде слышен голос предков...",
             "Dengbêj (певец-сказитель) исполняет этот гимн в долине Лалеш "
             "на рассвете. Считается, что звук разносится по всей долине "
             "как благословение."),
            (q3, "en", "Lalish Dengbêjî", "Chant of Lalish",
             "Laleş, ciyê pîroz\nKû dengê bav û kalan tê...",
             "Lalish, sacred place\nWhere the voice of ancestors comes...",
             "A dengbêj (singer-storyteller) performs this hymn in the valley "
             "of Lalish at dawn. It is believed the sound spreads through the "
             "entire valley as a blessing."),
            (q3, "ku", "Lalish Dengbêjî", "Stranên Laleşê",
             "Laleş, ciyê pîroz\nKû dengê bav û kalan tê...",
             "Laleş, cihê pîroz\nKu dengê bav û kalan tê...",
             "Dengbêj vê stranê li geliya Laleşê di şefeqê de dixwîne. "
             "Tê bawer kirin ku deng wekî bereketekê li seranserê geliyê "
             "belav dibe."),
        ],
    )

    conn.commit()
    conn.close()

    return resp(201, {
        "message": "Seed completed successfully",
        "seeded": True,
        "records": {
            "persons": 3,
            "person_translations": 9,
            "relationships": 2,
            "stories": 2,
            "story_translations": 6,
            "photos": 1,
            "photo_translations": 3,
            "qewls": 3,
            "qewl_translations": 9,
        },
    })
