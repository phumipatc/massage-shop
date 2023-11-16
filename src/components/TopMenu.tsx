'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
export default function TopMenu(){
    const {data:session} = useSession()

    return (
        <div className="w-full h-20 flex fixed top-0 z-50">
            <div className='w-1/2 md:w-1/4 h-full bg-[#C76B98] flex items-center px-5'>
                <Link href='/'>
                    <Image src='/img/logo-no-background.png' alt='logo' width={1500} height={647} className='h-12 md:h-14 w-fit'/>
                </Link>
            </div>
            <span className='absolute h-10 w-10 rounded-[50%] left-1/2 md:left-1/4 ml-[-1.25rem] bg-[#C76B98]' />
            <span className='absolute h-10 w-10 rounded-[50%] left-1/2 md:left-1/4 ml-[-1.25rem] top-10 bg-[#632B6C]' />
            <div className='w-1/2 md:w-3/4 h-full bg-[#632B6C] flex flex-row-reverse px-5 items-center '>
                {session? <button className="h-11 bg-white w-fit p-2" onClick={()=>signOut()}>Sign Out of {session.user.name}</button>:null}
                <Link className="h-11 bg-white w-fit p-2" href="/reservations">My reservations</Link>
            </div>
        </div>
    )
}