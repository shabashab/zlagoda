CREATE TABLE IF NOT EXISTS "Category" (
  "category_number"   SERIAL        NOT NULL,
  "category_name"     VARCHAR(50)   NOT NULL,

  PRIMARY KEY         ("category_number")
)