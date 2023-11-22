import getUserProfile from '@/libs/getUserProfile'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dayjs from 'dayjs'

export default async function UserDashboard() {
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const user = await getUserProfile(session.user.token)
    var createdAt = new Date(user.data.createdAt)

    return (
        <main className='bg-slate-100 m-5 p-5'>
            <div className='text-2xl'>{user.data.name}</div>
            <table className='table-auto border-separate border-spacing-2'><tbody>
                <tr><td>Email</td><td>{user.data.email}</td></tr>
                <tr><td>Tel.</td><td>{user.data.tel}</td></tr>
                <tr><td>Member Since</td><td>{dayjs(createdAt).toString()}</td></tr>
            </tbody></table>
        </main>
    )
}