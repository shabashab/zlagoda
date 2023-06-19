CREATE TABLE IF NOT EXISTS "Store_Product" (
  "UPC"                   VARCHAR(13)     NOT NULL,
  "UPC_prom"              VARCHAR(13),
  "id_product"            INT             NOT NULL,
  "selling_price"         DECIMAL(13, 4)  NOT NULL,
  "products_number"       INT             NOT NULL,
  "promotional_product"   BOOLEAN         NOT NULL,

  PRIMARY KEY   ("UPC"),

  FOREIGN KEY   ("UPC_prom") 
    REFERENCES    "Store_Product" ("UPC") 
    ON UPDATE     CASCADE
    ON DELETE     NO ACTION,

  FOREIGN KEY   ("id_product") 
    REFERENCES    "Product" ("id_product") 
    ON UPDATE     CASCADE
    ON DELETE     NO ACTION
)