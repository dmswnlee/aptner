import { combineReducers } from "redux";
import noticesReducer from "./slice/noticesSlice";
import registrationReducer from "./slice/registrationSlice";
import disclosuresReducer from "./slice/disclosuresSlice"
import communicationsReducer from "./slice/communicationsSlice"

const rootReducer = combineReducers({
	notices: noticesReducer,
	registration: registrationReducer,
	disclosures: disclosuresReducer,
	communications: communicationsReducer
});

export default rootReducer;
