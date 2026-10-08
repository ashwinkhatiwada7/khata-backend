signup
http://localhost:3001/api/auth/sign-up/email

{
"name":"ashwin",
"email":"ashwin@gmail.com",
"password":"12345678",
"shopName":"ashiwnkirana Store",
"location":"biratnagar-1",
"phone":"9812345678"
}

sign in
http://localhost:3001/api/auth/sign-in/email

{
"email":"ashwin@gmail.com",
"password":"12345678"

}

customer module:

1.post:
http://localhost:3001/api/v1/customer
{
"name": "Ramesh Kumar",
"phone": "9876543210",
"address": "12 MG Road, Indore",
"creditLimit": "50000.00",
"creditBalance": "0.00",
"isActive": true,
"image": "https://example.com/images/ramesh-kumar.jpg"
}
