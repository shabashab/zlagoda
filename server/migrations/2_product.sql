CREATE TABLE IF NOT EXISTS "Product" (
  "id_product"          SERIAL        NOT NULL,
  "category_number"     INT           NOT NULL,
  "product_name"        VARCHAR(50)   NOT NULL,
  "characteristics"     VARCHAR(100)  NOT NULL,

  PRIMARY KEY   ("id_product"),

  FOREIGN KEY   ("category_number") 
    REFERENCES    "Category" ("category_number") 
    ON UPDATE     CASCADE
    ON DELETE     NO ACTION 
);