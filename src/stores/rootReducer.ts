import { combineReducers } from "redux";
import noticesReducer from "./slice/noticesSlice";
import registrationReducer from "./slice/registrationSlice";
import disclosuresReducer from "./slice/disclosuresSlice";
import communicationsReducer from "./slice/communicationsSlice";
import verificationReducer from "./slice/verificationSlice";

const rootReducer = combineReducers({
	notices: noticesReducer,
	registration: registrationReducer,
	verification: verificationReducer,
	disclosures: disclosuresReducer,
	communications: communicationsReducer,
});

export default rootReducer;
