CREATE TABLE IF NOT EXISTS "User" (
  "id_employee"   VARCHAR(10)     NOT NULL,
  "login"         VARCHAR(30)     NOT NULL,
  "password_hash" VARCHAR(72)     NOT NULL,

  PRIMARY KEY   ("id_employee"),

  FOREIGN KEY   ("id_employee")
    REFERENCES    "Employee" ("id_employee")
    ON UPDATE     CASCADE
    ON DELETE     NO ACTION
)