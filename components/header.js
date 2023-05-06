import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { parseCookies } from "nookies";
import Link from "next/link"
import { useSession } from "next-auth/react"
import cookie from "js-cookie"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export default function ButtonAppBar() {
    const cookies = parseCookies()
    const router = useRouter()
    const [userState, setUserState] = useState("")

    
    
    const { data: session } = useSession()
    console.log(session)
    const user = cookies?.user ? JSON.parse(cookies.user) : ""
    console.log(userState)
    useEffect(() => {
      setUserState(user)
    }, [router])

    const logoutHandler = async () => {
      if(session) {
        signOut()
      }
      cookie.remove('token')
      cookie.remove('user')
      setUserState("")
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
           
          </IconButton>
          <Typography variant="h6" component="div"  sx={{ flexGrow: 1 }}>
            AVIATO
          </Typography>
          <Typography variant="h6" component="div">
            {userState && userState.email}
          </Typography>


          <Box sx={{ml: 2 }}>
          {user ? (
          <> 
          <Button color="inherit" onClick={logoutHandler}>Logout</Button>
         
          </>
          ) :  (
          <><Link href = "/login">
          <Button color="inherit">Login</Button>
          </Link> <Link href = "/register">
          <Button color="inherit">Register</Button>
          </Link>
          </>)}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}