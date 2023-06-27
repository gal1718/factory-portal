export const createDispatchAction = (actionType) => (payload) => ({
    type: actionType,
    payload,
  });