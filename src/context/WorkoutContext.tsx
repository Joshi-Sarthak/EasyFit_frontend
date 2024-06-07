import {createContext, useReducer, type Dispatch, type ReactNode} from "react"

export type Workout = {
	_id: string
	title: string
	reps: number
	load: number
}

export type WorkoutsValue = {
	workouts: Workout[]
	dispatch: Dispatch<WorkoutsAction>
}

export type WorkoutsAction =
	| {
			type: "SET_WORKOUTS"
			payload: Workout[]
	  }
	| {
			type: "CREATE_WORKOUT"
			payload: Workout
	  }
	| {
			type: "DELETE_WORKOUT"
			payload: Workout
	  }
	| {
			type: "EDIT_WORKOUT"
			payload: Workout
	  }

export const WorkoutsContext = createContext<WorkoutsValue | undefined>(undefined)

export const workoutsReducer = (
	state: Omit<WorkoutsValue, "dispatch">,
	action: WorkoutsAction,
) => {
	switch (action.type) {
		case "SET_WORKOUTS":
			return {
				workouts: action.payload,
			}
		case "CREATE_WORKOUT":
			return {
				workouts: [action.payload, ...state.workouts],
			}
		case "DELETE_WORKOUT":
			return {
				workouts: state.workouts.filter((w) => w._id !== action.payload._id),
			}
		case "EDIT_WORKOUT":
			const works = state.workouts.map((w) => {
				if (w._id === action.payload._id) {
					return action.payload
				} else {
					return w
				}
			})
			return {workouts: works}
		default:
			return state
	}
}

export const WorkoutsContextProvider = ({children}: {children: ReactNode}) => {
	const [state, dispatch] = useReducer(workoutsReducer, {workouts: []})

	return (
		<WorkoutsContext.Provider value={{...state, dispatch}}>
			{children}
		</WorkoutsContext.Provider>
	)
}
