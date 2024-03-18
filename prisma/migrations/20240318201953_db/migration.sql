-- Drop the existing constraint
ALTER TABLE product
DROP CONSTRAINT "Product_pkey";

-- Add a new primary key constraint with the desired name
ALTER TABLE product
ADD CONSTRAINT product_pkey PRIMARY KEY (id);
