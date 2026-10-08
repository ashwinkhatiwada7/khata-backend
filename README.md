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
http://localhost:3001/v1/customer
{
"name": "Ramesh Kumar",
"phone": "9876543210",
"address": "12 MG Road, Indore",
"creditLimit": "50000.00",
"creditBalance": "0.00",
"isActive": true,
"image": "https://example.com/images/ramesh-kumar.jpg"
}
[
  {
    "name": "Ramesh Kumar",
    "phone": "9876543210",
    "address": "12 MG Road, Indore",
    "creditLimit": "50000.00",
    "creditBalance": "12500.50",
    "isActive": true,
    "image": "https://example.com/images/ramesh-kumar.jpg"
  },
  {
    "name": "Sita Sharma",
    "phone": "9841234567",
    "address": "45 New Baneshwor, Kathmandu",
    "creditLimit": "30000.00",
    "creditBalance": "0.00",
    "isActive": true
  },
  {
    "name": "Hari Bahadur Thapa",
    "phone": "9867890123",
    "address": "78 Lakeside, Pokhara",
    "creditLimit": "75000.00",
    "creditBalance": "20000.00",
    "isActive": true,
    "image": "https://example.com/images/hari-thapa.jpg"
  },
  {
    "name": "Hari Bahadur Thapa",
    "phone": "9867890123",
    "address": "78 Lakeside, Pokhara",
    "creditLimit": "75000.00",
    "creditBalance": "20000.00",
    "isActive": true,
    "image": "https://example.com/images/hari-thapa.jpg"
  },
  {
    "name": "Mohan Prasad Singh",
    "phone": "9856012345",
    "address": "56 Traffic Chowk, Butwal",
    "creditLimit": "100000.00",
    "creditBalance": "45000.00",
    "isActive": false,
    "image": "https://example.com/images/mohan-singh.jpg"
  },
  {
    "name": "Kamala Kumari Oli",
    "phone": "9845678901",
    "address": "89 Pulchowk, Lalitpur",
    "creditLimit": "15000.00",
    "creditBalance": "0.00",
    "isActive": true
  },
  {
    "name": "Dipak Raj Adhikari",
    "phone": "9860123456",
    "address": "11 Shahid Gate, Birgunj",
    "creditLimit": "60000.00",
    "creditBalance": "15000.25",
    "isActive": true
  },
  {
    "name": "Sunita Rana Magar",
    "phone": "9823456789",
    "address": "34 Boudha Road, Kathmandu",
    "creditLimit": "40000.00",
    "creditBalance": "8000.00",
    "isActive": true,
    "image": "https://example.com/images/sunita-rana.jpg"
  },
  {
    "name": "Anil Kumar Gupta",
    "phone": "9834567890",
    "address": "67 Hospital Line, Nepalgunj",
    "creditLimit": "20000.00",
    "creditBalance": "20000.00",
    "isActive": false
  },
  {
    "name": "Pooja Shrestha",
    "phone": "9851237890",
    "address": "90 Thamel Marg, Kathmandu",
    "creditLimit": "35000.50",
    "creditBalance": "1200.00",
    "isActive": true,
    "image": "https://example.com/images/pooja-shrestha.jpg"
  }
]