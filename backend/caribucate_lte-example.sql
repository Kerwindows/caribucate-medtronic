-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2025 at 03:57 PM
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
-- Database: `caribucate_lte`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`) VALUES
(2, 'Business'),
(1, 'English'),
(6, 'ICT'),
(3, 'Mathematics'),
(5, 'Modern Studies'),
(4, 'Science');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`id`, `name`) VALUES
(5, 'Administrator'),
(6, 'Counselor'),
(3, 'Dean'),
(2, 'Principal'),
(4, 'Supervisor'),
(1, 'Teacher');

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`id`, `name`) VALUES
(2, 'Bates'),
(1, 'Caribbean Union College');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `user_id` int(11) NOT NULL,
  `form_class` varchar(50) DEFAULT NULL,
  `start_year` year(4) DEFAULT NULL,
  `end_year` year(4) DEFAULT NULL,
  `status` enum('active','transferred','graduated','alumni') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `user_id` int(11) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `form_class` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role` enum('superadmin','admin','teacher','parent','student','auxiliary') NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `temp_password` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `address1` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `time_zone` varchar(100) DEFAULT NULL,
  `on_site` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` varchar(255) NOT NULL,
  `position_id` int(11) DEFAULT NULL,
  `house` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `avatar`, `first_name`, `last_name`, `email`, `phone`, `username`, `password`, `temp_password`, `dob`, `address1`, `address2`, `city`, `country`, `time_zone`, `on_site`, `created_at`, `updated_at`, `position_id`, `house`) VALUES
(8, 'teacher', '/media/avatars/300-3.jpg', 'Kerwin', 'Thompson', 'kerwindows@gmail.com', '(868) 798-7674', 'kerwindows', '$2y$10$ecPCAdlXr73Y.5j/P.v0AukywkKH5jo.F5RRws2f9ua6vIytC2Lba', 'Kkj8412', '1990-01-01', 'Main St', '', 'Port of Spain', 'Trinidad and Tobago', 'America/Port_of_Spain', 1, '2025-04-06 09:01:47', '', 1, 'Orange'),
(9, 'admin', '', 'Sharlene', 'Josiah', 'admin@localhost.com', '', 'administrator', '$2y$10$tusQfXTnI1krWm6Jq8OYCO69am6xBTwGiBsmzXFeVwOn3Ehg6KZzu', '$Kkj8412', '1990-01-01', 'Main St', '', 'Port of Spain', 'Trinidad and Tobago', 'America/Port_of_Spain', 1, '2025-04-06 09:02:59', '', 4, ''),
(10, 'teacher', '', 'Kamiyah', 'Adaeze', 'kerwindows@hotmail.com', '', 'adaeze', '$2y$10$49JMYGNCvQLZEoYquxarvOqRQdNfjfIcdLNWyE9qPk6lnyU4ykeQG', '$Kkj8412', NULL, NULL, NULL, NULL, 'Trinidad and Tobago', 'America/Port_of_Spain', 1, '2025-04-06 17:22:58', '', 3, ''),
(11, 'teacher', '', 'George', 'PIllip', 'george@mail.com', '', 'georgey', '$2y$10$KonkuThFgNwOfP6tymCWzOs0wUHeeJO/zEeDi3DksjPReBHMoLClq', '$Kkj8412', NULL, NULL, NULL, NULL, 'Trinidad and Tobago', 'America/Port_of_Spain', 1, '2025-04-09 08:40:56', '', 2, '');

-- --------------------------------------------------------

--
-- Stand-in structure for view `user_complete_data`
-- (See below for the actual view)
--
CREATE TABLE `user_complete_data` (
`id` int(11)
,`role` enum('superadmin','admin','teacher','parent','student','auxiliary')
,`avatar` varchar(255)
,`first_name` varchar(100)
,`last_name` varchar(100)
,`full_name` varchar(201)
,`email` varchar(150)
,`phone` varchar(15)
,`username` varchar(100)
,`dob` date
,`address1` varchar(255)
,`address2` varchar(255)
,`city` varchar(100)
,`country` varchar(100)
,`time_zone` varchar(100)
,`on_site` tinyint(1)
,`created_at` timestamp
,`updated_at` varchar(255)
,`position_name` varchar(100)
,`position_id` int(11)
,`departments` mediumtext
,`department_ids` mediumtext
,`schools` mediumtext
,`school_ids` mediumtext
,`teacher_form_class` varchar(50)
,`student_form_class` varchar(50)
,`start_year` year(4)
,`end_year` year(4)
,`student_status` enum('active','transferred','graduated','alumni')
);

-- --------------------------------------------------------

--
-- Table structure for table `user_departments`
--

CREATE TABLE `user_departments` (
  `user_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_departments`
--

INSERT INTO `user_departments` (`user_id`, `department_id`) VALUES
(8, 1),
(9, 2),
(10, 3),
(10, 4),
(11, 1),
(11, 5),
(11, 6);

-- --------------------------------------------------------

--
-- Table structure for table `user_schools`
--

CREATE TABLE `user_schools` (
  `user_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_schools`
--

INSERT INTO `user_schools` (`user_id`, `school_id`) VALUES
(8, 1),
(8, 2);

-- --------------------------------------------------------

--
-- Structure for view `user_complete_data`
--
DROP TABLE IF EXISTS `user_complete_data`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_complete_data`  AS SELECT `u`.`id` AS `id`, `u`.`role` AS `role`, `u`.`avatar` AS `avatar`, `u`.`first_name` AS `first_name`, `u`.`last_name` AS `last_name`, concat(`u`.`first_name`,' ',`u`.`last_name`) AS `full_name`, `u`.`email` AS `email`, `u`.`phone` AS `phone`, `u`.`username` AS `username`, `u`.`dob` AS `dob`, `u`.`address1` AS `address1`, `u`.`address2` AS `address2`, `u`.`city` AS `city`, `u`.`country` AS `country`, `u`.`time_zone` AS `time_zone`, `u`.`on_site` AS `on_site`, `u`.`created_at` AS `created_at`, `u`.`updated_at` AS `updated_at`, `p`.`name` AS `position_name`, `p`.`id` AS `position_id`, group_concat(distinct `d`.`name` separator ', ') AS `departments`, group_concat(distinct `d`.`id` separator ',') AS `department_ids`, group_concat(distinct `sch`.`name` separator ', ') AS `schools`, group_concat(distinct `sch`.`id` separator ',') AS `school_ids`, `t`.`form_class` AS `teacher_form_class`, `s`.`form_class` AS `student_form_class`, `s`.`start_year` AS `start_year`, `s`.`end_year` AS `end_year`, `s`.`status` AS `student_status` FROM (((((((`users` `u` left join `positions` `p` on(`u`.`position_id` = `p`.`id`)) left join `user_departments` `ud` on(`u`.`id` = `ud`.`user_id`)) left join `departments` `d` on(`ud`.`department_id` = `d`.`id`)) left join `user_schools` `us` on(`u`.`id` = `us`.`user_id`)) left join `schools` `sch` on(`us`.`school_id` = `sch`.`id`)) left join `teachers` `t` on(`u`.`id` = `t`.`user_id`)) left join `students` `s` on(`u`.`id` = `s`.`user_id`)) GROUP BY `u`.`id` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `fk_users_position` (`position_id`);

--
-- Indexes for table `user_departments`
--
ALTER TABLE `user_departments`
  ADD PRIMARY KEY (`user_id`,`department_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `user_schools`
--
ALTER TABLE `user_schools`
  ADD PRIMARY KEY (`user_id`,`school_id`),
  ADD KEY `school_id` (`school_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `positions`
--
ALTER TABLE `positions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_position` FOREIGN KEY (`position_id`) REFERENCES `positions` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `user_departments`
--
ALTER TABLE `user_departments`
  ADD CONSTRAINT `user_departments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_departments_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_schools`
--
ALTER TABLE `user_schools`
  ADD CONSTRAINT `user_schools_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
