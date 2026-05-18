CREATE TYPE t_p2339777_knowledge_base_tawus.gender_enum AS ENUM ('male', 'female', 'unknown');
CREATE TYPE t_p2339777_knowledge_base_tawus.relationship_type AS ENUM ('parent', 'child', 'spouse', 'sibling', 'other');
CREATE TYPE t_p2339777_knowledge_base_tawus.story_status AS ENUM ('draft', 'pending', 'approved', 'rejected');
CREATE TYPE t_p2339777_knowledge_base_tawus.photo_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE t_p2339777_knowledge_base_tawus.qewl_status AS ENUM ('draft', 'pending', 'approved', 'rejected');

CREATE TABLE t_p2339777_knowledge_base_tawus.persons (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES t_p2339777_knowledge_base_tawus.users(id),
    gender      t_p2339777_knowledge_base_tawus.gender_enum NOT NULL DEFAULT 'unknown',
    birth_year  SMALLINT,
    death_year  SMALLINT,
    birth_place VARCHAR(255),
    clan        VARCHAR(255),
    is_public   BOOLEAN NOT NULL DEFAULT TRUE,
    created_by  UUID REFERENCES t_p2339777_knowledge_base_tawus.users(id),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE t_p2339777_knowledge_base_tawus.person_translations (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id  UUID NOT NULL REFERENCES t_p2339777_knowledge_base_tawus.persons(id),
    locale     CHAR(2) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255),
    bio        TEXT,
    UNIQUE (person_id, locale)
);

CREATE INDEX idx_person_trans_person ON t_p2339777_knowledge_base_tawus.person_translations(person_id);
CREATE INDEX idx_person_trans_locale ON t_p2339777_knowledge_base_tawus.person_translations(locale);

CREATE TABLE t_p2339777_knowledge_base_tawus.relationships (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_a_id UUID NOT NULL REFERENCES t_p2339777_knowledge_base_tawus.persons(id),
    person_b_id UUID NOT NULL REFERENCES t_p2339777_knowledge_base_tawus.persons(id),
    type        t_p2339777_knowledge_base_tawus.relationship_type NOT NULL,
    note        TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT no_self_link CHECK (person_a_id <> person_b_id)
);

CREATE INDEX idx_rel_a ON t_p2339777_knowledge_base_tawus.relationships(person_a_id);
CREATE INDEX idx_rel_b ON t_p2339777_knowledge_base_tawus.relationships(person_b_id);

CREATE TABLE t_p2339777_knowledge_base_tawus.stories (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id  UUID REFERENCES t_p2339777_knowledge_base_tawus.users(id),
    person_id  UUID REFERENCES t_p2339777_knowledge_base_tawus.persons(id),
    status     t_p2339777_knowledge_base_tawus.story_status NOT NULL DEFAULT 'pending',
    cover_url  TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE t_p2339777_knowledge_base_tawus.story_translations (
    id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    story_id UUID NOT NULL REFERENCES t_p2339777_knowledge_base_tawus.stories(id),
    locale   CHAR(2) NOT NULL,
    title    VARCHAR(512) NOT NULL,
    body     TEXT NOT NULL,
    UNIQUE (story_id, locale)
);

CREATE INDEX idx_story_trans_story  ON t_p2339777_knowledge_base_tawus.story_translations(story_id);
CREATE INDEX idx_story_trans_locale ON t_p2339777_knowledge_base_tawus.story_translations(locale);
CREATE INDEX idx_story_status       ON t_p2339777_knowledge_base_tawus.stories(status);

CREATE TABLE t_p2339777_knowledge_base_tawus.photos (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id   UUID REFERENCES t_p2339777_knowledge_base_tawus.persons(id),
    story_id    UUID REFERENCES t_p2339777_knowledge_base_tawus.stories(id),
    uploader_id UUID REFERENCES t_p2339777_knowledge_base_tawus.users(id),
    url         TEXT NOT NULL,
    taken_year  SMALLINT,
    status      t_p2339777_knowledge_base_tawus.photo_status NOT NULL DEFAULT 'pending',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE t_p2339777_knowledge_base_tawus.photo_translations (
    id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    photo_id UUID NOT NULL REFERENCES t_p2339777_knowledge_base_tawus.photos(id),
    locale   CHAR(2) NOT NULL,
    caption  TEXT,
    UNIQUE (photo_id, locale)
);

CREATE INDEX idx_photo_person ON t_p2339777_knowledge_base_tawus.photos(person_id);
CREATE INDEX idx_photo_story  ON t_p2339777_knowledge_base_tawus.photos(story_id);

CREATE TABLE t_p2339777_knowledge_base_tawus.qewls (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug         VARCHAR(255) NOT NULL UNIQUE,
    audio_url    TEXT,
    duration_sec SMALLINT,
    submitted_by UUID REFERENCES t_p2339777_knowledge_base_tawus.users(id),
    status       t_p2339777_knowledge_base_tawus.qewl_status NOT NULL DEFAULT 'pending',
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE t_p2339777_knowledge_base_tawus.qewl_translations (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    qewl_id     UUID NOT NULL REFERENCES t_p2339777_knowledge_base_tawus.qewls(id),
    locale      CHAR(2) NOT NULL,
    title       VARCHAR(512) NOT NULL,
    subtitle    VARCHAR(512),
    lyrics      TEXT,
    translation TEXT,
    notes       TEXT,
    UNIQUE (qewl_id, locale)
);

CREATE INDEX idx_qewl_trans_qewl   ON t_p2339777_knowledge_base_tawus.qewl_translations(qewl_id);
CREATE INDEX idx_qewl_trans_locale ON t_p2339777_knowledge_base_tawus.qewl_translations(locale);
CREATE INDEX idx_qewl_status       ON t_p2339777_knowledge_base_tawus.qewls(status);
