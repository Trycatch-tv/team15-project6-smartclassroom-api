# Smart Classroom API

This repository contains the backend code for the Smart Classroom application, built with Node.Js and Express.Js. It also uses a MySQL database for data storage.

## 📋 Prerequisites
Before running the code, the following prerequisites must be met:

- Node.Js must be installed (version 18 or higher)
- MySQL must be installed

## 🚀 Installation
1. Clone the repository on your local machine.
```sh
git clone https://github.com/Trycatch-tv/team15-project6-smartclassroom-api.git
```

2. Navigate to the repository folder.
```sh
cd team15-project6-smartclassroom-api
```

3. Install the dependencies.
```sh
npm install
```

4. Create a **'.env'** file in the project root and configure the necessary environment variables for the MySQL database connection.
```javascript
DB_HOST=serverUrl
DB_USER=username
DB_PASSWORD=password
DB_NAME=SmartClassroomDB
```

5. Run the server.
```sh
npm start
```

The server will run on http://localhost:3001.

## 🔬 Unit Tests
```sh
npm test
```
This will run all of the tests in the **'tests'** folder using the Jest test framework.

## 📖 Usage
The Smart Classroom backend API is designed to be consumed by the application frontend. The API documentation is available [here](https://docs.google.com/document/d/1w90BNus2SGBJtNl7b1vn-wyo6W5a8GFgv5v3kku4Qeg/edit?usp=sharing).

## 🤝 Contributions
If you wish to contribute to the development of Smart Classroom, please submit a pull request with your proposed changes. Make sure your changes are compatible with the MIT license.

## 📝 License
This project is licensed under the MIT License. See the LICENSE file for more information.