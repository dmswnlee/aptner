import { combineReducers } from "redux";
import termsReducer from "./slice/termsSlice";
import noticesReducer from "./slice/noticesSlice";

const rootReducer = combineReducers({
	terms: termsReducer,
	notices: noticesReducer,
});

export default rootReducer;
