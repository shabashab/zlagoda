
CREATE TABLE IF NOT EXISTS "Customer_Card" (
  "card_number"     VARCHAR(13)   NOT NULL,
  "cust_surname"    VARCHAR(50)   NOT NULL,
  "cust_name"       VARCHAR(50)   NOT NULL,
  "cust_patronymic" VARCHAR(50),
  "phone_number"    VARCHAR(13)   NOT NULL,
  "city"            VARCHAR(50),
  "street"          VARCHAR(50),
  "zip_code"        VARCHAR(9),
  "percent"         INT           NOT NULL,

  PRIMARY KEY       ("card_number")
)