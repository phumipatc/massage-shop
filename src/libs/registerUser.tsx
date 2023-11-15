import user from "@/types/user";

export default async function (user: user) {
	const res = await fetch('http://localhost:5000/api/v1/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: user.name,
			email: user.email,
			tel: user.tel,
			role: user.role,
			password: user.password,
			createdAt: user.createdAt
		})
	})

	if(!res.ok){
		throw new Error("Failed to register user")
	}

	return await res.json()
}