-- Create Databa
CREATE DATABASE IF NOT EXISTS quiz_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE quiz_db;

DROP TABLE IF EXISTS quiz_answers;
DROP TABLE IF EXISTS quiz_attempts;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS skill_categories;
DROP TABLE IF EXISTS users;

-- ----------------------------------
-- USERS TABLE
-- ----------------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for performance
CREATE INDEX idx_users_role ON users(role);

-- ----------------------------------
-- SKILL CATEGORIES TABLE
-- ----------------------------------
CREATE TABLE skill_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------
-- QUESTIONS TABLE
-- ----------------------------------
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    skill_id INT NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option ENUM('A', 'B', 'C', 'D') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (skill_id) REFERENCES skill_categories(id) ON DELETE CASCADE
);

CREATE INDEX idx_questions_skill ON questions(skill_id);

-- ----------------------------------
-- QUIZ ATTEMPTS TABLE
-- ----------------------------------
CREATE TABLE quiz_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    total_score INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skill_categories(id) ON DELETE CASCADE
);

CREATE INDEX idx_attempts_user ON quiz_attempts(user_id);
CREATE INDEX idx_attempts_skill ON quiz_attempts(skill_id);
CREATE INDEX idx_attempts_time ON quiz_attempts(started_at);

-- ----------------------------------
-- QUIZ ANSWERS TABLE
-- ----------------------------------
CREATE TABLE quiz_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attempt_id INT NOT NULL,
    question_id INT NOT NULL,
    selected_option ENUM('A', 'B', 'C', 'D') NOT NULL,
    is_correct BOOLEAN,
    FOREIGN KEY (attempt_id) REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE INDEX idx_answers_attempt ON quiz_answers(attempt_id);
CREATE INDEX idx_answers_question ON quiz_answers(question_id);



INSERT INTO skill_categories (name, description)
VALUES ('JavaScript', 'Questions related to JavaScript basics and advanced concepts'),
       ('MySQL', 'MySQL query and schema-related questions'),('Math', 'Calculation Based');


INSERT INTO users (name, email, password, role)
VALUES 
('Admin', 'admin@example.com', '$2b$10$Ab38OmpL/2556mjN9NLl9OkBC0kKLCaJA8wwGIvcxMXf2nrKFxDKq', 'admin'),
('Aser', 'user@example.com', '$2b$10$Ab38OmpL/2556mjN9NLl9OkBC0kKLCaJA8wwGIvcxMXf2nrKFxDKq', 'user');


INSERT INTO questions (question_text, option_a, option_b, option_c, option_d,correct_option,skill_id) 
VALUES
('Which number is greater than 14?', '12', '11', '13', '15','D','3'),
('What is 16 ÷ 4?',  '2', '3', '4', '5','C','3'),
('What is 4 × 2?',  '6', '8', '10', '15','B','3'),
('What is the value of 9 - 3?',  '5', '6', '7', '3','B','3'),
('What is 7 + 5?',  '10', '11', '12', '54','C','3');

INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option, skill_id) 
VALUES
('Which keyword is used to declare a variable in JavaScript?', 'var', 'int', 'let', 'define', 'A', '1'),
('What does `===` mean in JavaScript?', 'Assign value', 'Compare value and type', 'Check only value', 'Check only type', 'B', '1'),
('How do you write a comment in JavaScript?', '// comment', '# comment', '<!-- comment -->', '/* comment */', 'A', '1'),
('What is the correct way to define a function in JavaScript?', 'function myFunc()', 'def myFunc()', 'func myFunc()', 'create myFunc()', 'A', '1'),
('Which method converts a JSON string into a JavaScript object?', 'JSON.stringify()', 'JSON.convert()', 'JSON.parse()', 'JSON.object()', 'C', '1');

INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option, skill_id) 
VALUES
('Which SQL statement is used to retrieve data from a database?', 'GET', 'SELECT', 'EXTRACT', 'FETCH', 'B', '2'),
('Which keyword is used to sort the result-set in SQL?', 'ORDER', 'SORT', 'ORDER BY', 'GROUP BY', 'C', '2'),
('What does the WHERE clause do in SQL?', 'Deletes rows', 'Updates rows', 'Filters rows', 'Groups rows', 'C', '2'),
('Which command is used to remove a table from the database?', 'REMOVE TABLE', 'DROP TABLE', 'DELETE TABLE', 'ERASE TABLE', 'B', '2'),
('What is the default port for MySQL?', '8080', '1521', '3306', '5432', 'C', '2');






