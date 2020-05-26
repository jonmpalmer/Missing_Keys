-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: May 18, 2020 at 10:00 PM
-- Server version: 10.4.11-MariaDB-log
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_palmejon`
--

-- --------------------------------------------------------

--
-- Table structure for table `Addresses`
--

CREATE TABLE `Addresses` (
  `addressID` int(11) NOT NULL,
  `addressLine1` varchar(255) DEFAULT NULL,
  `addressLine2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Addresses`
--

INSERT INTO `Addresses` (`addressID`, `addressLine1`, `addressLine2`, `city`, `state`, `zip`) VALUES
(1, '5000 Powers Rd.', 'Unit 12', 'Bend', 'Oregon', '97701'),
(2, '12345 Newark Rd. ', 'Apartment 77', 'Seattle', 'WA', '91112-09911'),
(3, '76555 Pluto Ave.', NULL, 'Portland', 'Oregon', '89744');

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL,
  `addressID` int(11) DEFAULT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` (`customerID`, `addressID`, `firstName`, `lastName`, `phone`, `email`) VALUES
(1, 2, 'Bill', 'Billson', '555-555-5555', 'billson@bill.com'),
(2, 1, 'Jack', 'Jackson', '(444)-444-4444', 'jackson@jack.com'),
(3, 3, 'Jill', 'Jillian', NULL, 'jillian@jill.com');

-- --------------------------------------------------------

--
-- Table structure for table `OrderItems`
--

CREATE TABLE `OrderItems` (
  `orderID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `orderDate` date DEFAULT NULL,
  `quant` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `OrderItems`
--

INSERT INTO `OrderItems` (`orderID`, `productID`, `orderDate`, `quant`) VALUES
(1, 2, '2020-02-02', 1),
(2, 1, '2020-02-02', 3),
(3, 3, '2020-02-02', 9);

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `orderID` int(11) NOT NULL,
  `customerID` int(11) DEFAULT NULL,
  `orderDate` date DEFAULT NULL,
  `shippedDate` date DEFAULT NULL,
  `total` decimal(10,0) UNSIGNED ZEROFILL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`orderID`, `customerID`, `orderDate`, `shippedDate`, `total`) VALUES
(1, 1, '2020-02-02', '2020-02-02', '0000000023'),
(2, 2, '2020-02-02', '2020-02-02', '0000000066'),
(3, 1, '2020-02-02', '2020-02-02', '0000000023');

-- --------------------------------------------------------

--
-- Table structure for table `Payments`
--

CREATE TABLE `Payments` (
  `paymentID` int(11) NOT NULL,
  `customerID` int(11) DEFAULT NULL,
  `addressID` int(11) DEFAULT NULL,
  `cardNumber` varchar(255) DEFAULT NULL,
  `crv` int(11) NOT NULL,
  `expDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Payments`
--

INSERT INTO `Payments` (`paymentID`, `customerID`, `addressID`, `cardNumber`, `crv`, `expDate`) VALUES
(1, 1, 1, '8888-8888-8888-8888', 888, '2021-01-01'),
(2, 3, 2, '9999-99999-9999-9999', 999, '2020-01-01'),
(3, 1, 1, '8888-8888-8888-8888', 888, '2020-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `productID` int(11) NOT NULL,
  `supplierID` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quant` int(11) NOT NULL,
  `price` decimal(10,0) UNSIGNED ZEROFILL NOT NULL,
  `image` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`productID`, `supplierID`, `name`, `type`, `model`, `description`, `quant`, `price`, `image`) VALUES
(1, 2, 'Keyboard', 'Wired', '45-FB9', 'A Keyboard.', 543, '0000000024', NULL),
(2, 1, 'Monitor', 'Flatscreen', '8979-ADKJJ', 'A Monitor', 89, '0000000044', NULL),
(3, 3, 'Mouse', 'Wireless', '123978-ASDFJ', 'A Mouse', 434, '0000000124', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Suppliers`
--

CREATE TABLE `Suppliers` (
  `supplierID` int(11) NOT NULL,
  `addressID` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Suppliers`
--

INSERT INTO `Suppliers` (`supplierID`, `addressID`, `name`, `phone`, `email`) VALUES
(1, 2, 'Initech', '333-333-3333', 'info@initech.com'),
(2, 1, 'Evil Corp', '666-666-6666', 'info@evilcorp.com'),
(3, 3, 'Weyland Corporation', '123-456-7890', 'info@weyland.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Addresses`
--
ALTER TABLE `Addresses`
  ADD PRIMARY KEY (`addressID`);

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`customerID`),
  ADD KEY `addressID` (`addressID`);

--
-- Indexes for table `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD PRIMARY KEY (`orderID`,`productID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `customerID` (`customerID`);

--
-- Indexes for table `Payments`
--
ALTER TABLE `Payments`
  ADD PRIMARY KEY (`paymentID`),
  ADD KEY `customerID` (`customerID`),
  ADD KEY `addressID` (`addressID`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `supplierID` (`supplierID`);

--
-- Indexes for table `Suppliers`
--
ALTER TABLE `Suppliers`
  ADD PRIMARY KEY (`supplierID`),
  ADD KEY `addressID` (`addressID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Addresses`
--
ALTER TABLE `Addresses`
  MODIFY `addressID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE `Customers`
  MODIFY `customerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `orderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `paymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Suppliers`
--
ALTER TABLE `Suppliers`
  MODIFY `supplierID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Customers`
--
ALTER TABLE `Customers`
  ADD CONSTRAINT `Customers_ibfk_1` FOREIGN KEY (`addressID`) REFERENCES `Addresses` (`addressID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD CONSTRAINT `OrderItems_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `Orders` (`orderID`),
  ADD CONSTRAINT `OrderItems_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `Products` (`productID`);

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Payments`
--
ALTER TABLE `Payments`
  ADD CONSTRAINT `Payments_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Payments_ibfk_2` FOREIGN KEY (`addressID`) REFERENCES `Addresses` (`addressID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`supplierID`) REFERENCES `Suppliers` (`supplierID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Suppliers`
--
ALTER TABLE `Suppliers`
  ADD CONSTRAINT `Suppliers_ibfk_1` FOREIGN KEY (`addressID`) REFERENCES `Addresses` (`addressID`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
