# UserUniqueness
Feature to check uniqueness of user by comparing mobile number and email.

The task is to develop a function to handle the registration routes '/register' and '/api/register' for the same purpose with a slight difference in the incoming request format. While the former route accepts mobile numbers in the format of "country_code + phone_number," the latter route accepts them as separate fields, i.e., 'country_code' and 'phone_number'. The phone number needs to be encrypted, and its hash value needs to be checked against the database to ensure the uniqueness of the user before registration.

After downloading all files , update your Mongo URL in "/model/userModel.js".

Run 'npm install' in terminal;
use scripts 'npm start' to start server;
use scripts 'npm test' to run test cases;
you can test to create users in '/register' , "/api/register" findout the results;

sample body for '/register'
{
  "name": "ABCD",
  "email": "abced@gmail.com",
  "phoneNum": 911234567890,
  "Address": "H.No 5/559, xyz City"
}

sample body for '/api/register'
{
  "name": "ABCD",
  "email": "abcesdae@gmail.com",
  "phoneNum": 1234567890,
  "cc": 91,
  "Address": "H.No 5/559, xyz City"
}

kindly note that test results are stored in 'testResults.txt' file.
