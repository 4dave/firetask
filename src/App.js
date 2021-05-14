import "./App.css"
import AuthProvider from "./components/Auth"
import Header from "./components/Header"
import Main from "./components/Main"
import Tasks from "./components/Tasks"
import { ChakraProvider, Container } from "@chakra-ui/react"

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Container maxW="container.xl">
          <Header />
          <Main />
          <Tasks />
        </Container>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default App
