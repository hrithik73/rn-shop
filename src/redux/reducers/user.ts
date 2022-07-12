import { USER_LOGGED_IN, USER_SIGNED_OUT } from '../constants';

const initialState = {
  isLoggedIn: false,
  userId: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        useId: action.payload,
      };
    case USER_SIGNED_OUT:
      return {
        ...state,
      };
    default: {
      return state;
    }
  }
};
