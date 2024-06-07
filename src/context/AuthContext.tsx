import {
	createContext,
	useEffect,
	useReducer,
	type Dispatch,
	type ReactNode,
} from "react"
import type {Session} from "../types"

// This may look like a mess, but in reality you would use a library like Redux.
// I'm keeping the functional code the same, only adding types.

export type AuthAction = {type: "LOGIN"; payload: Session} | {type: "LOGOUT"}

export type AuthContextValue = {
	user: Session | undefined
	dispatch: Dispatch<AuthAction>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const authReducer = (
	state: Omit<AuthContextValue, "dispatch">,
	action: AuthAction,
): Omit<AuthContextValue, "dispatch"> => {
	switch (action.type) {
		case "LOGIN":
			return {user: action.payload}
		case "LOGOUT":
			return {user: undefined}
		default:
			return state
	}
}

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
	const [state, dispatch] = useReducer(authReducer, {user: undefined})

	useEffect(() => {
		const userStored = localStorage.getItem("user")
		let user: Session | undefined
		try {
			if (userStored) {
				user = JSON.parse(userStored)
			}
		} catch (error) {
			console.log("Error parsing user from local storage:", error)
		}
		if (user) {
			dispatch({type: "LOGIN", payload: user})
		}
	}, [])

	console.log("Auth context state:", state)

	return (
		<AuthContext.Provider value={{...state, dispatch}}>
			{children}
		</AuthContext.Provider>
	)
}
