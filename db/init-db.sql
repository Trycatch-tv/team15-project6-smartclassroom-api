CREATE DATABASE SmartClassroomDB;
USE SmartClassroomDB;

CREATE TABLE `courses` (
    `course_id` INT PRIMARY KEY AUTO_INCREMENT,
    `course_name` VARCHAR(80) NOT NULL,
    `course_description` TEXT NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `teacher` VARCHAR(40) NOT NULL
);
CREATE TABLE `students` (
    `student_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_name` VARCHAR(40) NOT NULL,
    `national_number_id` BIGINT NOT NULL, 
    `email` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(10) NULL
);
CREATE TABLE `registrations` (
    `registration_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT DEFAULT NULL,
    `course_id` INT DEFAULT NULL,
    `registration_date` DATE NOT NULL,
    `cancellation_date` DATE NOT NULL
);
CREATE TABLE `grades` (
    `grade_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `course_id` INT NOT NULL,
    `grade1` FLOAT(2.2) NOT NULL,
    `grade2` FLOAT(2.2) NOT NULL,
    `grade3` FLOAT(2.2) NOT NULL,
    `grade4` FLOAT(2.2) NOT NULL,
    `grade5` FLOAT(2.2) NOT NULL
);
ALTER TABLE `registrations`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);
ALTER TABLE `registrations`
ADD FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);
ALTER TABLE `grades`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);
ALTER TABLE `grades`
ADD FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);
ALTER TABLE `students` ADD INDEX `national_number_id_index` USING BTREE (`national_number_id`);
ALTER TABLE registrations
ADD CONSTRAINT unique_registration
UNIQUE (student_id, course_id, registration_date);