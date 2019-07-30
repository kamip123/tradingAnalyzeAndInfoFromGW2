export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'})
        }).catch((error) => {
            dispatch({type: 'LOGIN_ERROR', error})
        })
    }
};

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'});
        });
    }
};

export const changePassword = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, credentials.oldPassword);
        user.reauthenticateWithCredential(cred)
            .then(() => {
                firebase.auth().currentUser.updatePassword(credentials.newPassword)
                    .then(() => {
                        dispatch({type: 'PASSWORD_CHANGE_SUCCESS'});
                    }).catch(() => {
                    dispatch({type: 'PASSWORD_CHANGE_ERROR'});
                });
            }).catch(() => {
            dispatch({type: 'PASSWORD_CHANGE_ERROR'});
        });
    }
};

export const changeEmail = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, credentials.password);
        user.reauthenticateWithCredential(cred)
            .then(() => {
                firebase.auth().currentUser.updateEmail(credentials.newEmail)
                    .then(() => {
                        dispatch({type: 'EMAIL_CHANGE_SUCCESS'});
                    }).catch(() => {
                    dispatch({type: 'EMAIL_CHANGE_ERROR'});
                });
            }).catch(() => {
            dispatch({type: 'EMAIL_CHANGE_ERROR'});
        });
    }
};

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            return firestore.collection('users').doc(response.user.uid).set({
                guild: '',
                bio: '',
                nick: newUser.nick
            })
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch(error => {
            dispatch({type: 'SIGNUP_ERROR', error})
        })
    }
};

export const editBio = (bio) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        firestore.update(`users/${uid}`, {
            nick: bio.nick,
            bio: bio.bio,
            guild: bio.guild
        }).then(() => {
            dispatch({type: 'UPDATE_BIO_SUCCESS', bio})
        }).catch((error) => {
            dispatch({type: 'UPDATE_BIO_ERROR', error})
        })
    }
};

