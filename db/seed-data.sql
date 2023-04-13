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
INSERT INTO `students` (`student_name`, `email`, `phone`)
VALUES (
        'Luis Lopez',
        'juan.perez@gmail.com',
        '555-1234'
    ),
    (
        'Carlos Nino',
        'correo1@mail.com',
        '555-5678'
    ),
    (
        'Carlos Ramírez',
        'correo1@mail.com',
        '555-9101'
    ),
    (
        'Dylan Suarez',
        'correo2@mail.com',
        '555-1212'
    ),
    (
        'Eynar Alvarez',
        'correo3@mail.com',
        '555-1313'
    ),
    (
        'Giovanny Gómez',
        'correo4@mail.com',
        '555-1414'
    ),
    (
        'Joshua Acevedo',
        'correo5@mail.com',
        '555-1414'
    ),
    (
        'Luis Rodríguez',
        'correo6@mail.com',
        '555-1414'
    );
INSERT INTO `registrations` (
        `student_id`,
        `course_id`,
        `registration_date`,
        `cancellation_date`
    )
VALUES (1, 1, '2023-04-01', '2023-04-10'),
    (1, 2, '2023-04-15', '2023-05-01'),
    (2, 1, '2023-05-01', '2023-05-10'),
    (3, 2, '2023-05-10', '2023-05-20'),
    (4, 3, '2023-06-01', '2023-06-15'),
    (5, 3, '2023-06-15', '2023-06-30');
INSERT INTO `grades` (
        `student_id`,
        `course_id`,
        `grade1`,
        `grade2`,
        `grade3`,
        `grade4`,
        `grade5`
    )
VALUES (1, 1, 8.5, 9.2, 7.8, 8.0, 8.7),
    (1, 2, 7.3, 8.0, 9.1, 7.5, 8.8),
    (2, 1, 9.0, 8.5, 9.3, 9.1, 8.8),
    (3, 2, 8.2, 8.8, 7.9, 9.0, 8.6),
    (4, 3, 9.5, 9.8, 9.3, 9.5, 9.2),
    (5, 3, 8.0, 7.5, 8.2, 7.9, 8.5);