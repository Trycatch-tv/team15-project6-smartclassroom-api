CREATE TABLE `courses` (
    `course_id` INT PRIMARY KEY AUTO_INCREMENT,
    `course_name` VARCHAR(255),
    `course_description` TEXT,
    `start_date` DATE,
    `end_date` DATE,
    `teacher` VARCHAR(255)
);
CREATE TABLE `students` (
    `student_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_name` VARCHAR(255),
    `email` VARCHAR(255),
    `phone` VARCHAR(20)
);
CREATE TABLE `registrations` (
    `registration_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT,
    `course_id` INT,
    `registration_date` DATE,
    `cancellation_date` DATE NULL
);
CREATE TABLE `grades` (
    `grade_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT,
    `course_id` INT,
    `grade1` FLOAT(2.2),
    `grade2` FLOAT(2.2),
    `grade3` FLOAT(2.2),
    `grade4` FLOAT(2.2),
    `grade5` FLOAT(2.2)
);
ALTER TABLE `registrations`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);
ALTER TABLE `registrations`
ADD FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);
ALTER TABLE `grades`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);
ALTER TABLE `grades`
ADD FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);