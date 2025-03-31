-- table users
CREATE TABLE
  users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createAt DATE DEFAULT CURRENT_DATE
  );

-- table todos
CREATE TABLE
  todos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT NOT NULL,
    isDone BOOLEAN DEFAULT FALSE,
    createAt DATE DEFAULT CURRENT_DATE,
    updateAt DATE DEFAULT CURRENT_DATE,
    userEmail TEXT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (userEmail) REFERENCES users (email) ON DELETE CASCADE
  );