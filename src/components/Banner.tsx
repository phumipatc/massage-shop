'use client'

import Image from 'next/image'
import SignupModal from '@/components/SignupModal'
import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import ModalNoBtn from './ModalNoBtn'

export default function Banner(){
    const {data:session} = useSession()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShow, setIsShow] = useState(false)
    const [isOk, setIsOk] = useState(false)

    if(session) return (
        <div className='mt-14'></div>
    )

    const handleLogin = async () => {
        setIsShow(false);
        const res = await signIn('credentials', {
            username: email,
            password: password,
            redirect: false,
        }).then(res => {
            if(res?.ok){
                setIsOk(true)
                window.location.href = '/'
            }else{
                throw new Error("Failed to login")
            }
        }).catch(err => {
            setIsOk(false)
        })
        setIsShow(true);
    }

    return (
        <>
        <ModalNoBtn isShow={isShow} modalTitle={isOk? "Sign in complete": "Sign in error"}>
            {isOk?
            `Sign in complete.`
            : "An error has occured. Please recheck your information and try again."
            }
        </ModalNoBtn>
        <div className="w-full h-[calc(100vh-5rem)] mt-20 relative flex flex-row-reverse items-center justify-center lg:justify-normal">
            <Image src='/img/banner1.jpg' alt='banner1' width={0} height={0} layout="fill" objectFit="cover" className='pointer-events-none'/>
            <div className='relative w-full lg:w-2/5 h-full md:h-[90%] md:mx-5 bg-[#3F3F3F]/40 z-40 rounded-3xl flex flex-col items-center overflow-hidden'>
                <div className='flex flex-col items-center mt-10 gap-2 z-50' style={{'textShadow': '2px 2px 5px black'}}>
                    <h1 className='text-5xl font-bold text-white'>Discover Your</h1>
                    <h1 className='text-5xl font-bold text-white'>Ultimate</h1>
                    <h1 className='text-5xl font-bold text-white'>Relaxation Oasis</h1>
                </div>
                <span className='aspect-square w-[30rem] lg:w-[30rem] bg-[#F09F9C] rounded-[50%] absolute bottom-0 -mb-20 z-40'>
                    <div className='w-full h-full flex flex-col items-center justify-center gap-3 '>
                        <input className='border-2 border-gray-300 rounded-md px-2 w-7/12' type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                        <input className='border-2 border-gray-300 rounded-md px-2 w-7/12' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                        <button className='bg-[#C76B98] text-white px-5 leading-10 rounded-xl' onClick={()=>{handleLogin();}} >Login</button>
                        <div className='flex w-full items-center justify-between px-10'>
                            <span className='h-1 w-1/3 bg-black'/>
                            <h1 className='text-xl font-bold'>or</h1>
                            <span className='h-1 w-1/3 bg-black'/>
                        </div>
                        <SignupModal/>
                    </div>
                </span>
            </div>
        </div>
        </>
    )
}