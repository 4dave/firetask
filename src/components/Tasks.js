import React, { useState, useEffect, useContext } from "react"
import firebase from "../firebase"
import { v4 as uuidv4 } from "uuid"
import { AuthContext } from "./Auth"
import {
  Input,
  Box,
  Button,
  SimpleGrid,
  CircularProgress,
} from "@chakra-ui/react"
import Popper from "./Popper"

export default function Tasks() {
  const { currentUser } = useContext(AuthContext)
  const displayName = currentUser ? currentUser.displayName : ""
  const currentUserId = currentUser ? currentUser.uid : null
  const [jots, setJots] = useState([])
  const [loading, setLoading] = useState(false)
  const [note, setNote] = useState("")
  const ref = firebase.firestore().collection("notes")

  function getJots() {
    setLoading(true)
    ref
      .where("owner", "==", currentUserId)
      .orderBy("createdAt", "desc") // needed an index
      //.where('title', '==', 'Jot1') // does not need index
      //.where('score', '<=', 10)    // needs index
      //.orderBy('owner', 'asc')
      //.limit(3)
      .onSnapshot((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          items.push(doc.data())
        })
        setJots(items)
        setLoading(false)
      })
    console.log(jots)
  }

  useEffect(() => {
    getJots()
    // eslint-disable-next-line
  }, [currentUser])

  // ADD FUNCTION
  function addJot() {
    const owner = currentUser ? currentUser.uid : "unknown"
    const ownerEmail = currentUser ? currentUser.email : "unknown"
    const newJot = {
      note,
      id: uuidv4(),
      owner,
      ownerEmail,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
      displayName,
      notebg: "#ffffff",
    }

    ref
      .doc(newJot.id)
      .set(newJot)
      .catch((err) => {
        console.error(err)
      })
    setNote("")
  }

  //DELETE FUNCTION
  function deleteJot(jot) {
    ref
      .doc(jot.id)
      .delete()
      .catch((err) => {
        console.error(err)
      })
  }

  // // EDIT JOT
  // function editJot(jot) {
  //   const updatedJot = {
  //     note: note,
  //     lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
  //   }
  //   setLoading()
  //   ref
  //     .doc(jot.id)
  //     .update(updatedJot)
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }

  // UPDATE COLOR - RED
  function editBG1(jot) {
    const updateBG = {
      notebg: "#fc8181",
    }
    setLoading()
    ref
      .doc(jot.id)
      .update(updateBG)
      .catch((err) => {
        console.error(err)
      })
  }

  // UPDATE COLOR - GREEN
  function editBG2(jot) {
    const updateBG = {
      notebg: "#67d391",
    }
    setLoading()
    ref
      .doc(jot.id)
      .update(updateBG)
      .catch((err) => {
        console.error(err)
      })
  }

  // UPDATE COLOR - BLUE
  function editBG3(jot) {
    const updateBG = {
      notebg: "#C4DEF6",
    }
    setLoading()
    ref
      .doc(jot.id)
      .update(updateBG)
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      {currentUser ? (
        <div className="form">
          <Input
            placeholder="add task"
            onChange={(e) => setNote(e.target.value)}
            value={note}
            maxlength="120"
          />
          <Button onClick={() => addJot()}>Add</Button>
        </div>
      ) : (
        <div>Please sign in to view your notes!</div>
      )}
      {loading ? <CircularProgress isIndeterminate color="green.300" /> : null}
      {currentUser ? (
        <>
          <SimpleGrid minChildWidth="250px" spacing="20px">
            {jots.map((jot) => (
              <div className="note-container" key={jot.id}>
                <Box
                  boxShadow="lg"
                  height="175px"
                  p="6"
                  rounded="md"
                  bg={jot.notebg}
                >
                  <div className="note">
                    <Popper
                      deleteJot={deleteJot}
                      editBG1={editBG1}
                      editBG2={editBG2}
                      editBG3={editBG3}
                      jot={jot}
                    />
                    {jot.note}
                  </div>
                </Box>
              </div>
            ))}
          </SimpleGrid>
        </>
      ) : null}
    </>
  )
}
