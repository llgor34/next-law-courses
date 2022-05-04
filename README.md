# How to use
1. npm install
2. Create new firebase project
3. Initialize auth, firestore, storage
4. Go to firebase/config.js, in the same folder paste your accountService file and path to it into config.js file
5. Go to firebase-client/config.js and paste your firebase credentials
6. Go to pages/api/sendEmail.js, and fill your data (comments are next to places where you need to fill them, this allows to send emails!)

# Purpose
This website was made for first job as freelancer. It has two features. One - simple website to show in internet, Second - When you login, and have admin permission (just 'admin' text in roles array) you can add new content to website, delete it and also add new courses, which customers can buy (Unfortunately I didn't know much about backend, so when coming to 'payment', it just gives you number of account and title of payment ;) ).
