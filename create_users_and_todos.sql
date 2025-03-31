CREATE TABLE
  users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    create_at DATE DEFAULT CURRENT_DATE
  );

CREATE TABLE
  todos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT NOT NULL,
    is_done BOOLEAN DEFAULT FALSE,
    create_at DATE DEFAULT CURRENT_DATE,
    update_at DATE DEFAULT CURRENT_DATE,
    user_id TEXT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );