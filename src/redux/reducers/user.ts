import { USER_LOGGED_IN, USER_SIGNED_OUT } from '@src/redux/constants';
import { IUserInitState } from '@src/types';

const initialState: IUserInitState = {
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
      const { email, userId, name } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        personalDetails: {
          userId: userId,
          email: email,
          name: name,
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
