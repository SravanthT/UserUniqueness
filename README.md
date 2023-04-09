# UserUniqueness
Feature to check uniqueness of user by comparing mobile number and email.

The task is to develop a function to handle the registration routes '/register' and '/api/register' for the same purpose with a slight difference in the incoming request format. While the former route accepts mobile numbers in the format of "country_code + phone_number," the latter route accepts them as separate fields, i.e., 'country_code' and 'phone_number'. The phone number needs to be encrypted, and its hash value needs to be checked against the database to ensure the uniqueness of the user before registration.
