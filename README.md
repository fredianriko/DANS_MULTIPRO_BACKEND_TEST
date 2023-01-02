### PROJECT DEPENDENCIES

- express
- body-parser
- cors
- sequelize
- mysql2
- axios

### STEP TO TEST THIS PROJECT

1. clone the project to your computer
2. cd nodetest
3. run `npm install`
4. adjust environment variabel with database credential in your machine
5. after installation done and env variabel adjustment done
6. run `npm run dev` to start development
7. run `npm run star` to start project without nodemon

### TASK

<!-- DONE -->

1. Login API
   a. The API should validate username and password
   b. List of valid username and password should be stored on a DBMS
   c. Any DBMS is allowed
   d. The API should implement JSON Web Token (JWT)

<!-- DONE -->

2.  Get job list API
    a. The API should be secured with JWT Authorization
    b. The API should make http request to http://dev3.dansmultipro.co.id/api/recruitment/positions.json and return jobs data as response payload.
    c. The API should provide “search” functionality tearch for jobs by term, location, full time vs part time, or any combination of the three. All parameters are optional.
    Parameters

    >     i. description — A search term, such as "ruby" or "java". This parameter is aliased to search.
    >     ii. location — A city name, zip code, or other location search term.
    >     iii. full_time — If you want to limit results to full time positions set this parameter to 'true'.

    Example
    http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description=python&location=berlin
    d. The API should support pagination
    Example
    http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=1

<!-- DONE -->

3. Get job detail API
   a. The API should be secured with JWT Authorization
   b. The API should make http request http://dev3.dansmultipro.co.id/api/recruitment/positions/{ID} and return job detail data as response payload.
