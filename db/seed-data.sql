USE SmartClassroomDB;

INSERT INTO `courses` (
        `course_name`,
        `course_description`,
        `start_date`,
        `end_date`,
        `teacher`
    )
VALUES (
        'Programación en Python',
        'Curso de programación en Python para principiantes',
        '2023-05-01',
        '2023-06-30',
        'Juan Pérez'
    ),
    (
        'Introducción a la Programación',
        'Curso introductorio sobre programación',
        '2023-07-01',
        '2023-08-31',
        'Ana Gómez'
    ),
    (
        'Programación orientada a objetos',
        'Curso para estudiantes que deseen aprender los conceptos de la POO',
        '2023-06-01',
        '2023-08-31',
        'Michael Johnson'
    ),
    (
        'Diseño de interfaces de usuario',
        'Curso para estudiantes que deseen aprender a diseñar interfaces de usuario atractivas y funcionales',
        '2023-09-01',
        '2023-10-31',
        'Laura González'
    ),
    (
        'Introducción a la Inteligencia Artificial',
        'Curso introductorio sobre inteligencia artificial',
        '2023-05-01',
        '2023-06-30',
        'Carlos Rodríguez'
    );
INSERT INTO `students` (`student_name`,`national_number_id`, `email`, `phone`)
VALUES (
        'Luis Lopez',
        1234567899,
        'correo0@mail.com',
        '555-1234'
    ),
    (
        'Carlos Niño',
        2222222222,
        'correo1@mail.com',
        '555-5678'
    ),
    (
        'Carlos Ramírez',
        8787878787,
        'correo2@mail.com',
        '555-9101'
    ),
    (
        'Dylan Suarez',
        3453456789,
        'correo3@mail.com',
        '555-1212'
    ),
    (
        'Eynar Alvarez',
        7837462520,
        'correo4@mail.com',
        '555-1313'
    ),
    (
        'Giovanny Gómez',
        7837462516,
        'correo5@mail.com',
        '555-1414'
    ),
    (
        'Joshua Acevedo',
        3457462516,
        'correo6@mail.com',
        '555-1414'
    ),
    (
        'Luis Rodríguez',
        1465896035,
        'correo7@mail.com',
        '555-1414'
    );
INSERT INTO `registrations` (
        `student_id`,
        `course_id`,
        `registration_date`
    )
VALUES (1, 1, '2023-04-01'),
    (1, 2, '2023-04-15'),
    (2, 1, '2023-05-01'),
    (3, 2, '2023-05-10'),
    (4, 3, '2023-06-01'),
    (5, 3, '2023-06-15');
INSERT INTO `grades` (
        `registration_id`,
        `grade1`,
        `grade2`,
        `grade3`,
        `grade4`,
        `grade5`
    )
VALUES (1, 8.5, 9.2, 7.8, 8.0, 8.7),
    (2, 7.3, 8.0, 9.1, 7.5, 8.8),
    (3, 9.0, 8.5, 9.3, 9.1, 8.8),
    (4, 8.2, 8.8, 7.9, 9.0, 8.6),
    (5, 9.5, 9.8, 9.3, 9.5, 9.2),
    (6, 8.0, 7.5, 8.2, 7.9, 8.5);
