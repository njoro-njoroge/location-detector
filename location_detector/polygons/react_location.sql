-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2022 at 03:22 PM
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
(25, 35, '0.083412312309351', '37.650158889592'),
(26, 35, '0.08313839200302', '37.649973146617'),
(27, 35, '0.083253726869077', '37.64982227236'),
(28, 35, '0.083465621156992', '37.650048919022'),
(29, 36, '0.083326816987495', '37.650392577052'),
(30, 36, '0.0832570796268', '37.650525681674'),
(31, 37, '0.083333187227174', '37.650396600366'),
(32, 37, '0.083254732696392', '37.65054680407'),
(33, 37, '0.082974442149248', '37.650255784392'),
(34, 37, '0.083036803443394', '37.650111950934'),
(35, 39, '0.083414323963968', '37.650157883763'),
(36, 39, '0.08314845027624', '37.649964764714'),
(37, 39, '0.083254732696392', '37.649819925427'),
(38, 39, '0.08346595643276', '37.650033831596'),
(39, 40, '0.083410971206257', '37.650147154927'),
(40, 40, '0.083139733106114', '37.649958729744'),
(41, 40, '0.083226904807227', '37.649837359786'),
(42, 40, '0.08346897391469', '37.650050260127'),
(43, 41, '0.083147779724693', '37.649957388639'),
(44, 41, '0.083410971206257', '37.650153189898'),
(45, 41, '0.083463609502364', '37.650045566261'),
(46, 41, '0.08324635080207', '37.649824954569'),
(47, 42, '0.083421029479414', '37.650171630085'),
(48, 42, '0.083148115000461', '37.649960741401'),
(49, 42, '0.083226904807227', '37.649845741689'),
(50, 42, '0.083449863195741', '37.650071382523'),
(51, 43, '0.083684220959146', '37.649334780872'),
(52, 43, '0.083793185583997', '37.649389095604'),
(53, 43, '0.083759322731378', '37.649452127516'),
(54, 43, '0.083617501081006', '37.64938171953'),
(55, 44, '0.083141409484988', '37.64996945858'),
(56, 44, '0.083221875670629', '37.649841047823'),
(57, 44, '0.083461262571955', '37.650054618716'),
(58, 44, '0.083415329791295', '37.650160901248'),
(59, 45, '0.0837081', '37.649295'),
(60, 45, '0.08342337640981', '37.65015989542'),
(61, 45, '0.08376032855868', '37.649949006736'),
(62, 45, '0.083384149144521', '37.649723365903'),
(63, 46, '0.083402924587741', '37.650148160756'),
(64, 46, '0.083145768070052', '37.649956047535'),
(65, 46, '0.083248697732479', '37.649820931256'),
(66, 46, '0.083470650293552', '37.650038525462'),
(67, 47, '0.083410971206257', '37.650156542659'),
(68, 47, '0.083140403657661', '37.649967782199'),
(69, 47, '0.083258420729895', '37.649826966226'),
(70, 47, '0.083464950605445', '37.650036178529'),
(71, 48, '0.083690255922995', '37.649393118918'),
(72, 48, '0.083914890687712', '37.649504430592'),
(73, 48, '0.083612807220239', '37.649468556046'),
(74, 49, '0.083403259863508', '37.650159224868'),
(75, 49, '0.083140403657661', '37.649965770543'),
(76, 49, '0.083258756005662', '37.64982059598'),
(77, 49, '0.083470985569319', '37.650030814111'),
(78, 50, '0.083422370582483', '37.65014950186'),
(79, 50, '0.083144426966957', '37.649969793856'),
(80, 50, '0.083263114590713', '37.649819254875'),
(81, 50, '0.083494790149061', '37.649987228215'),
(82, 51, '0.0838797', '37.6489922'),
(83, 51, '0.084427192056745', '37.649166807532'),
(84, 51, '0.084288723166424', '37.649604678154'),
(85, 52, '0.084678313602316', '37.651031948626'),
(86, 52, '0.084523751476325', '37.651375941932'),
(87, 52, '0.084347731700861', '37.651311568916'),
(88, 52, '0.084501288000263', '37.650973275304'),
(89, 53, '0.082880564932052', '37.651285752654'),
(90, 53, '0.082744107690954', '37.651018537581'),
(91, 53, '0.083096482531261', '37.650535404682'),
(92, 53, '0.083062954953824', '37.650895826519'),
(93, 53, '0.083062954953824', '37.650719471276'),
(94, 53, '0.083192706678357', '37.650598101318');

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
(35, 20, '2022-08-21 10:56:42', 'Done'),
(36, 20, '2022-08-21 13:53:38', 'Incomplete'),
(37, 20, '2022-08-21 13:59:41', 'Done'),
(38, 20, '2022-08-21 15:42:41', 'Incomplete'),
(39, 20, '2022-08-22 13:01:19', 'Done'),
(40, 20, '2022-08-22 13:31:36', 'Done'),
(41, 20, '2022-08-22 13:36:22', 'Done'),
(42, 20, '2022-08-22 14:22:31', 'Done'),
(43, 20, '2022-08-22 14:50:39', 'Incomplete'),
(44, 20, '2022-08-22 14:59:38', 'Incomplete'),
(45, 20, '2022-08-22 15:06:24', 'Done'),
(46, 20, '2022-08-22 15:12:18', 'Done'),
(47, 20, '2022-08-22 15:15:10', 'Done'),
(48, 20, '2022-08-22 15:37:53', 'Done'),
(49, 20, '2022-08-22 15:40:49', 'Done'),
(50, 20, '2022-08-23 11:31:26', 'Done'),
(51, 20, '2022-08-23 18:55:33', 'Done'),
(52, 20, '2022-08-24 23:09:35', 'Done'),
(53, 20, '2022-08-24 23:13:07', 'Done'),
(54, 20, '2022-08-28 12:18:22', 'Incomplete');

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
(17, 'Kim', 'Kiki', 'Kim', '0.083699', '37.6494102', '2022-08-10 10:59:42', '1234', 'User'),
(19, 'Kimani', 'Njenga', 'Kimani', NULL, NULL, '2022-08-10 13:11:25', '1234', 'User'),
(20, 'Eliza', 'Waceke', 'Liz', '0.0828321', '37.6494723', '2022-08-10 13:13:21', '1234', 'Admin');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `polygons`
--
ALTER TABLE `polygons`
  MODIFY `polygon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

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
