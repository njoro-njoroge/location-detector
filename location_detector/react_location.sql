-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2022 at 10:46 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_location`
--

-- --------------------------------------------------------

--
-- Table structure for table `coordinates`
--

CREATE TABLE `coordinates` (
  `id` int(11) NOT NULL,
  `polygon_id` int(11) NOT NULL,
  `latitude` varchar(30) NOT NULL,
  `longtitude` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coordinates`
--

INSERT INTO `coordinates` (`id`, `polygon_id`, `latitude`, `longtitude`) VALUES
(1, 1, '0.083419017824785', '37.65015553683'),
(2, 1, '0.083135709796831', '37.649965435266'),
(3, 1, '0.083528653001909', '37.649427317083'),
(4, 1, '0.083698973092981', '37.649626471102'),
(14, 3, '0.083394877969226', '37.650728859007'),
(15, 3, '0.083262108763398', '37.650635652244'),
(16, 3, '0.083129339557126', '37.650870680809'),
(17, 3, '0.083289266100991', '37.650963887572'),
(18, 4, '0.082896322893533', '37.650813348591'),
(19, 4, '0.083045185337778', '37.650972940028'),
(20, 4, '0.082869165555673', '37.651276029646'),
(21, 4, '0.082740084381632', '37.651003450155'),
(25, 6, '0.083334528330269', '37.650388553739'),
(26, 6, '0.083255067972159', '37.650555856526'),
(27, 6, '0.082959354739353', '37.65025075525'),
(28, 6, '0.083034791788752', '37.650116309524'),
(33, 8, '0.08320779408815', '37.650617212057'),
(34, 8, '0.083123639868968', '37.650527022779'),
(36, 8, '0.082907722269912', '37.650787867606'),
(37, 8, '0.083071672123963', '37.650947459042');

-- --------------------------------------------------------

--
-- Table structure for table `polygons`
--

CREATE TABLE `polygons` (
  `polygon_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `data_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `polygon_status` varchar(20) NOT NULL DEFAULT 'Incomplete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `polygons`
--

INSERT INTO `polygons` (`polygon_id`, `user_id`, `data_added`, `polygon_status`) VALUES
(1, 20, '2022-09-02 19:27:23', 'Done'),
(3, 20, '2022-09-02 19:29:22', 'Done'),
(4, 20, '2022-09-02 19:29:51', 'Done'),
(6, 20, '2022-09-02 19:35:19', 'Done'),
(8, 20, '2022-09-02 19:39:06', 'Done');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `date_registered` timestamp NOT NULL DEFAULT current_timestamp(),
  `password` varchar(50) NOT NULL,
  `userlevel` varchar(20) NOT NULL DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `username`, `latitude`, `longitude`, `date_registered`, `password`, `userlevel`) VALUES
(8, 'Didank', 'Kimathi', 'Kimathi', NULL, NULL, '2022-08-04 15:35:51', '1234', 'User'),
(11, 'Stanley', 'Njoroge', 'Mute', NULL, NULL, '2022-08-05 06:48:31', '1234', 'User'),
(17, 'Kim', 'Kiki', 'Kim', '0.0837102', '37.6492849', '2022-08-10 10:59:42', '1234', 'User'),
(19, 'Kimani', 'Njenga', 'Kimani', NULL, NULL, '2022-08-10 13:11:25', '1234', 'User'),
(20, 'Eliza', 'Waceke', 'Liz', '0.0837307', '37.6493032', '2022-08-10 13:13:21', '1234', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coordinates`
--
ALTER TABLE `coordinates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `box_id` (`polygon_id`);

--
-- Indexes for table `polygons`
--
ALTER TABLE `polygons`
  ADD PRIMARY KEY (`polygon_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coordinates`
--
ALTER TABLE `coordinates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `polygons`
--
ALTER TABLE `polygons`
  MODIFY `polygon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coordinates`
--
ALTER TABLE `coordinates`
  ADD CONSTRAINT `coordinates_ibfk_1` FOREIGN KEY (`polygon_id`) REFERENCES `polygons` (`polygon_id`);

--
-- Constraints for table `polygons`
--
ALTER TABLE `polygons`
  ADD CONSTRAINT `polygons_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
