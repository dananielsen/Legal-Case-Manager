import Header from "./header"
import { Container } from '@mui/material'

const Layout = ({ children }) =>{
    return (
        <>
        <Container>
    <Header />
    {children}
    </Container>
    </>
    )
}


export default Layout