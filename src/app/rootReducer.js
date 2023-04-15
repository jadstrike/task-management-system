import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import memberReducer from "../features/member/memberSlice";
import projectReducer from "../features/projects/projectSlice";
import contentReducer from "../features/content/contentSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  member: memberReducer,
  project: projectReducer,
  content: contentReducer,
});

export default rootReducer;
