export const createPlan = (plan) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const nick = getState().firebase.profile.nick;
        const uid = getState().firebase.auth.uid;
        firestore.collection('plans').add({
            ...plan,
            date: new Date(),
            authorNick: nick,
            authorId: uid
        }).then(() => {
            dispatch({type: 'CREATE_PLAN', plan})
        }).catch((error) => {
            dispatch({type: 'CREATE_PLAN_ERROR', error})
        })
    }
};
