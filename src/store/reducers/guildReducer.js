const initState = {
    guildInfo: {
        level: 0,
        motd: '',
        influence: 0,
        aetherium: 0,
        resonance: 0,
        favor: 0,
        member_count: 0,
        member_capacity: 0,
        id: '',
        name: '',
        tag: '',
        emblem: {
            background: {
                id: 0,
                colors: [
                    0
                ]
            },
            foreground: {
                id: 0,
                colors: [
                    0,
                    0
                ]
            },
            flags: [
                '',
                ''
            ]
        }
    }
};

const guildReducer = ( state = initState, action) => {
    if (action.type === 'CHANGE_GUILD'){
        return{
            ...state,
            guildInfo: action.info
        }
    }
    return state
};

export default guildReducer