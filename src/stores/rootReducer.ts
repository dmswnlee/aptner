import { combineReducers } from "redux";
import noticesReducer from "./slice/noticesSlice";
import registrationReducer from "./slice/registrationSlice";

const rootReducer = combineReducers({
	notices: noticesReducer,
	registration: registrationReducer,
});

export default rootReducer;
