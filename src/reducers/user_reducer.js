import { LOGIN_USER, REGISTER_USER, INSERT_BOARD ,AUTH_USER,PUTNOTE_LIST,NOTE_LIST} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;
    case REGISTER_USER:
      return { ...state, joingSuccess: action.payload };
    case INSERT_BOARD:
      return { ...state, insertSuccess: action.payload };
      break;
    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;
      case PUTNOTE_LIST:
        return { ...state, putSuccess: action.payload };
        break;
        case NOTE_LIST:
          return { ...state, noteSuccess: action.payload };
          break;
  
    default:
      return state;
  }
}
