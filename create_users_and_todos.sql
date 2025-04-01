CREATE TABLE
  users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    create_at TIMESTAMPTZ DEFAULT (
      CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Bangkok'
    )
  );

CREATE TABLE
  todos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT NOT NULL,
    is_done BOOLEAN DEFAULT FALSE,
    create_at TIMESTAMPTZ DEFAULT (
      CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Bangkok'
    ),
    update_at TIMESTAMPTZ DEFAULT (
      CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Bangkok'
    ),
    user_id UUID NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );