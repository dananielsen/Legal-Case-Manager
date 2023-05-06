import React, { useState } from 'react'
import axios from "axios"
import cookie from 'js-cookie'
import { parseCookies } from 'nookies';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from 'next/router'
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import { loadUser } from '../redux/userAction';


import { createTheme, ThemeProvider } from "@mui/material/styles"
const theme = createTheme()

const useLogin = () => {
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
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={SubmitHandler} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
              onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
              onChange={(e) => setPassword(e.target.value)}
        />
      
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
    
  </Container>
  )
}
export async function getServerSideProps(context){
  const session = await getSession(context)

  return {
    props: {
      session,
    }
  }
}

export default useLogin