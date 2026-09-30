use('serveease');

db.createCollection('users');
db.users.insertOne({
    "name": "Yash Uke",
    "email": "yashuke@mail.com",
    "phone": '9876543210',
    "role": 'customer',
})

