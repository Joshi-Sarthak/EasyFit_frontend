import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import "./index.css"
import {WorkoutsContextProvider} from "./context/WorkoutContext.js"
import {AuthContextProvider} from "./context/AuthContext.js"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthContextProvider>
			<WorkoutsContextProvider>
				<App />
			</WorkoutsContextProvider>
		</AuthContextProvider>
	</React.StrictMode>,
)
