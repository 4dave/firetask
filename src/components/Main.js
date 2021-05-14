import React, { useContext } from "react"
import { AuthContext } from "./Auth"

export default function Main() {
  const { currentUser } = useContext(AuthContext)
  const displayName = currentUser ? currentUser.displayName : ""
  const email = currentUser ? currentUser.email : ""

  return (
    <>
      <div>
        <span className="name">
          {displayName
            ? displayName.split(" ")[0].trim() + `'s tasks (` + email + `)`
            : ""}
        </span>
        {/* <span>{displayName ? `Welcome, ` : ""}</span>
        <span style={{ fontWeight: "bold" }}>
          {displayName ? `${displayName}` : ""}
        </span> */}
      </div>
    </>
  )
}
