-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2025 at 07:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_fullstack_final`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(2, 'test111'),
(3, 'JasonStanson'),
(5, 'Ray Allen'),
(6, 'Sprewell'),
(7, 'Cacell'),
(15, 'Rashad Luwis'),
(16, 'Odom'),
(17, 'Kevin Garnett'),
(18, 'Ben Wallace'),
(19, 'Marion'),
(20, 'Dirk Nowitzki');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL COMMENT 'FK reference to categories',
  `title` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `price` double NOT NULL,
  `quantity` int(11) NOT NULL,
  `sku` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `category_id`, `title`, `description`, `price`, `quantity`, `sku`) VALUES
(4, 16, 'Kobe\'s mask', 'protect the face and boost shooting skills', 11.25, 9, '857669391'),
(5, 17, 'Curry\'s eye contact', 'will shoot from anywhere', 999.99, 1, '5791248192'),
(6, 20, 'KG\'s Jersey', '2008 Final', 100.5, 5, '845923849'),
(7, 5, 'Rebook Shoe', 'test data', 11, 2, '23122132'),
(8, 20, 'T-Mac\'s shoe', 'got 13 points in 35 seconds', 899.5, 1, '000000001'),
(9, 18, 'O‘neal Jersey', 'size XXXXX', 90.1, 1, '23123321'),
(10, 6, 'Michael Jordan\'s furry', 'The God of Basketball', 0, 1, '99999999'),
(11, 19, 'Sneaker', 'avoid slippery', 55, 321, '9029131290');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `fk_categories` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `fk_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
