const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = (notification => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc => console.log('notification added :)', doc))
});

exports.planCreated = functions.firestore
    .document('plans/{planId}')
    .onCreate( (doc, context) => {

        const plan = doc.data();
        console.log(plan);
        const notification = {
            title: 'Added new event',
            date: admin.firestore.FieldValue.serverTimestamp(),
            summary: `${plan.title}: ${plan.summary}`,
            eventId: `${context.params.planId}`,
            userId: ''
        };

        return createNotification(notification);
});

exports.newUser = functions.firestore
    .document('users/{userId}')
    .onCreate( (doc, context) => {
        const user = doc.data();
        const notification = {
            title: 'New user has joined',
            date: admin.firestore.FieldValue.serverTimestamp(),
            summary: `Nickname: ${user.nick}`,
            userId: `${context.params.userId}`,
            eventId: ''
        };

        return createNotification(notification);
    });

