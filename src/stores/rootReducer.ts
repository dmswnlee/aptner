import { combineReducers } from "redux";
import termsReducer from "./slice/termsSlice";

const rootReducer = combineReducers({
	terms: termsReducer,
});

export default rootReducer;
