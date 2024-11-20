import { createAction, props } from "@ngrx/store";
import { User } from "../model/user.model";

// this file is used to create actions of same types 
// this types are used logically but they are used to seggregate actions
export const login = createAction(
    "[Component Name] Action Name",
    props<{user:User}>()
)

export const logout= createAction(
    "[Menu Bar ] User Logout",
    props<{user:User}>()
)