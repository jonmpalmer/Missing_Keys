-- get customer information to populate search result
SELECT 
	Customers.customerID, Customers.firstName, Customers.lastName, 
	Addresses.addressLine1, Addresses.addressLine2, Addresses.city, 
	Addresses.state Addresses.zip, Customers.phone, Customers.email,
	Payments.paymentID
FROM Customers, Addresses, Payments
WHERE Customers.addressID = Addresses.addressID AND Customers.lastName = :customerSearch;

-- get supplier information to populate search result
SELECT 
	Suppliers.supplierID, Suppliers.name, Address.addressLine1, 
	Address.addressLine2, Address.city, Address.state Address.zip, 
	Suppliers.phone, Suppliers.email 
FROM Suppliers, Addresses 
WHERE (Supplier.addressID = Address.addressID AND Suppliers.name = :supplierSearch);

-- get product information to populate search result 
SELECT 
	Products.name, Products.type, Products.model,
	Products.description, Products.quant, Products.price, 
	Products.image, Suppliers.supplierID, Suppliers.name
FROM Products, Suppliers
WHERE (Products.supplierID = Suppliers.supplierID AND (name = :productNameSearch OR type = :productTypeSearch));

-- get order information to populate search result
SELECT 
	Orders.orderID, Orders.customerID, Orders.orderDate, 
	Orders.shippedDate, Orders.total, OrderItems.productID,
	OrderItems.orderDate, OrderItems.quant, Products.name, Products.price
FROM Orders, OrderItems, Products
WHERE (Orders.orderID = OrderItems.orderID AND orderID = :orderSearch);


-- add new customer
INSERT INTO Customers (addressID, firstName, lastName, phone, email) VALUES (:input1, :input2, :input3, :input4, :input5,);
-- add new supplier
INSERT INTO Suppliers (addressID, name, phone, email) VALUES (:input1, :input2, :input3, :input4, :input5);
-- add new product
INSERT INTO Products (supplierID, name, type, model, description, quant, price, image) VALUES (:input1, :input2, :input3, :input4, :input5, :input6, :input7, :input8);
-- add new payment
INSERT INTO Payments (customerID, addressID, cardNumber, crv, expDate) VALUES (:input1, :input2, :input3, :input4);
-- add new address to customers, payments or suppliers
INSERT INTO Addresses (addressID, addressLine1, addressLine2, city, state, zip) VALUES (:input1, :input2, :input3, :input4, :input5, :input6);


-- update customer
UPDATE Customers SET firstName = input1, lastName = input2, phone = input3, email = input4 WHERE customerID = :customerUpdateID;
-- update supplier
UPDATE Suppliers SET name = input1, phone = input2, email = input3 WHERE supplierID = :supplierUpdateID;
-- update product
UPDATE Products SET name = input1, type = input2, model = input3, description = input4, quant = input5, price = input6, image = input7 WHERE productsID = :productUpdateID;
-- update payment
UPDATE Payments SET cardNumber = input1, crv = input2, expDate = input3 WHERE paymentID = :paymentUpdateID;
-- update address
UPDATE Addresses SET addressID = input1, addressLine1 = input2, addressLine2 = input3, city = input4, state = input5, zip = input6 WHERE addressID = :addressUpdateID;


-- delete customer
DELETE FROM Customers WHERE customerID = :customerDeleteID;
-- delete supplier
DELETE FROM Suppliers WHERE supplierID = :supplierDeleteID;
-- delete product
DELETE FROM Products WHERE productsID = :productDeleteID;
-- delete payment
DELETE FROM Payments WHERE paymentID = :paymentDeleteID;
-- delete address
DELETE FROM Addresses WHERE addressID = :addressDeleteID;