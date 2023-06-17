CREATE TABLE IF NOT EXISTS "Sale" (
  "UPC"           VARCHAR(13)     NOT NULL,
  "check_number"  VARCHAR(10)     NOT NULL,
  "product_nuber" INT             NOT NULL,
  "selling_price" DECIMAL(13, 4)  NOT NULL,

  PRIMARY KEY   ("UPC", "check_number"),

  FOREIGN KEY   ("UPC")
    REFERENCES    "Store_Product" ("UPC")
    ON UPDATE     CASCADE
    ON DELETE     NO ACTION,

  FOREIGN KEY   ("check_number")
    REFERENCES    "Check" ("check_number")
    ON UPDATE     CASCADE
    ON DELETE     NO ACTION
)