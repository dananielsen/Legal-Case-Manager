import React, { useState } from 'react'
import axios from "axios"
import cookie from 'js-cookie'
import { parseCookies } from 'nookies';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'


const login = () => {
    const [email, setEmail ] = useState("")
    const [password, setPassword ] = useState("")
    const { data: session } = useSession()
    const router = useRouter()

  const cookies = parseCookies()


    const SubmitHandler = async (e) => {
        e.preventDefault()

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          }

        const { data } = await axios.post(`/api/login`, {email, password},config)
      
        cookie.set("token", data?.token)
        cookie.set("user", JSON.stringify(data?.user))
        router.push('/')
        console.log(email, password)
      }

      const logoutHandler = async () => {
        if(session) {
          signOut()
        }
        cookie.remove('token')
        cookie.remove('user')
      }
      if (session)  {
        return (
          <>
          Signed in as { session.user.email} <br />
          <button onClick={logoutHandler}>Sign out</button>
          
          </>
        )
      }
       
   
  return (
    <div>
        <form onSubmit={SubmitHandler}>
            LOGIN
    <input value = {email} onChange={(e) => setEmail(e.target.value)}/>
    <input value = {password} onChange={(e) => setPassword(e.target.value)}/>
    <button type="submit">LOGIN</button>
    </form>
    </div>
  )
}

export default login