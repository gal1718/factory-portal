const initialValue = {
    todayUserActions: [],
    actionsLimitExceed: false
}


// state - current state
// action - { type: 'WHAT_TO_DO', [payload: value] }
const applyActionsChange = (state = initialValue, action) => {
    debugger;

    switch (action.type) {

        case 'LOAD': {

            if (action.payload.length > 0) {
                if (action.payload[(action.payload.length - 1)].actionAllowed != 0) {

                    return { ...state, todayUserActions: action.payload };
                }

                else
                    return { ...state, todayUserActions: action.payload, actionsLimitExceed: true };
            }

        }



        case 'ADD': {

            if (state.todayUserActions.length > 0) {
                if (state.todayUserActions[(state.todayUserActions.length - 1)].actionAllowed != 0) {
                    const today = new Date()
                    return { ...state, todayUserActions: [...state.todayUserActions, { externalId: state.todayUserActions[(state.todayUserActions.length - 1)].externalId, maxActions: state.todayUserActions[(state.todayUserActions.length - 1)].maxActions, date: today, actionAllowed: state.todayUserActions[(state.todayUserActions.length - 1)].actionAllowed - 1 }] };
                }

                else//user exceed the actions limit//actionsLimitExceed -> true 
                {
                    return { ...state, actionsLimitExceed: true };
                }

            }

        }


        default:
            return state;
    }
};

export default applyActionsChange;