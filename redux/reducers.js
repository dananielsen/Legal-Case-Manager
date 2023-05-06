import { combineReducers } from "@reduxjs/toolkit";

import { profileReducer} from "./userReducer";

const reducers = combineReducers({
    profile: profileReducer,
})

export default reducers