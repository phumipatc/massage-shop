import user from "@/types/user";

export default async function login(email:string, password:string) {
	const res = await fetch('http://localhost:5000/api/v1/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			password: password,
		})
	})

	if(!res.ok){
		throw new Error("Failed to login")
	}

	return await res.json()
}