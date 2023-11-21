import Banner from '@/components/Banner'
import ShopList from '@/components/ShopList'
import getShops from '@/libs/getShops'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import getUserProfile from '@/libs/getUserProfile'
export default async function Home() {

  const shops = await getShops()
	const session = await getServerSession(authOptions)
	let profile = null
	if(session && session.user.token){
		profile = await getUserProfile(session.user.token)
		console.log(profile)
	}

  return (
    <main className='w-full h-full'>
      <Banner/>
      <div className='px-7 md:px-20 pt-10'>
        <h1 className='text-5xl m-5 font-bold'>Shop List</h1>
        <ShopList profile={profile} shops={shops}/>
      </div>
    </main>
  )
}
