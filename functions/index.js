const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello, test");
});

const createNotification = (notification => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc => console.log('notification added :)', doc))
});

exports.planCreated = functions.firestore
    .document('plans/{planId}')
    .onCreate( doc => {

        const plan = doc.data();
        const notification = {
            title: 'Added new event',
            date: admin.firestore.FieldValue.serverTimestamp(),
            summary: `${plan.title}: ${plan.summary}`
        };

        return createNotification(notification);
});

exports.newUser = functions.firestore
    .document('users/{userId}')
    .onCreate( doc => {
        const user = doc.data();
        const notification = {
            title: 'New user has joined',
            date: admin.firestore.FieldValue.serverTimestamp(),
            summary: `Nickname: ${user.nick}`
        };

        return createNotification(notification);
    });

