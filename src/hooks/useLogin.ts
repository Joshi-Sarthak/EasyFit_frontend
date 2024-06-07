import {useState} from "react"
import {useAuthContext} from "./useAuthContext"
import {baseURL} from "../url"
import type {Endpoint, Session} from "../types"

export const useLogin = () => {
	const [error, setError] = useState<string | undefined>(undefined)
	const [isLoading, setIsLoading] = useState(false)
	const {dispatch} = useAuthContext()

	const login = async (email: string, password: string) => {
		setIsLoading(true)
		setError(undefined)

		const response = await fetch(`${baseURL}/api/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({email, password}),
		})

		const data: Endpoint<Session> = await response.json()
		console.log(data)

		if (!response.ok) {
			setIsLoading(false)
			setError(data.error)
		}

		if (response.ok) {
			setIsLoading(false)
			setError(undefined)
			localStorage.setItem("user", JSON.stringify(data))

			dispatch({type: "LOGIN", payload: data})
		}
	}
	return {error, isLoading, login}
}
