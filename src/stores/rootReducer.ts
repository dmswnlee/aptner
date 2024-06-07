import { combineReducers } from "redux";
import noticesReducer from "./slice/noticesSlice";
import registrationReducer from "./slice/registrationSlice";
import disclosuresReducer from "./slice/disclosuresSlice";
import communicationsReducer from "./slice/communicationsSlice";
import verificationReducer from "./slice/verificationSlice";
import loginReducer from "./slice/loginSlice";
import idReducer from "./slice/idSlice";
import passwordReducer from "./slice/passwordSlice";

const rootReducer = combineReducers({
	notices: noticesReducer,
	registration: registrationReducer,
	verification: verificationReducer,
	disclosures: disclosuresReducer,
	communications: communicationsReducer,
	login: loginReducer,
	findId: idReducer,
	findPassword: passwordReducer,
});

export default rootReducer;
