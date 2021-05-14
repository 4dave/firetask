import React from "react"
import firebase from "../firebase"
import "firebase/auth" //firebase authentication
import { useAuthState } from "react-firebase-hooks/auth"
import { Button } from "@chakra-ui/react"

const auth = firebase.auth()

export default function Login() {
  const [user] = useAuthState(auth)

  return (
    <div>
      <SignOut />
      <section>{user ? "" : <SignIn />}</section>
    </div>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <Button size="sm" onClick={signInWithGoogle}>
        <img src="g.png" alt="" />
        &nbsp; Login
      </Button>
    </>
  )
}

function SignOut() {
  return (
    auth.currentUser && (
      <Button size="sm" onClick={() => auth.signOut()}>
        <img src="g.png" alt="" />
        &nbsp; Logout
      </Button>
    )
  )
}
