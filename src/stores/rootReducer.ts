import { combineReducers } from "redux";
import noticesReducer from "./slice/noticesSlice";
import registrationReducer from "./slice/registrationSlice";
import disclosuresReducer from "./slice/disclosuresSlice"

const rootReducer = combineReducers({
	notices: noticesReducer,
	registration: registrationReducer,
	disclosures: disclosuresReducer
});

export default rootReducer;
