import { UserInitStateType } from '../../types';
import { USER_LOGGED_IN, USER_SIGNED_OUT } from '../constants';

const initialState: UserInitStateType = {
  isLoggedIn: false,
  personalDetails: {
    email: '',
    userId: '',
    name: '',
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        personalDetails: {
          userId: action.payload.userId,
          email: action.payload.email,
          name: action.payload.name,
        },
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
