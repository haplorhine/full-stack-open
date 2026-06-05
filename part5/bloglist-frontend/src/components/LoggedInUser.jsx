const LoggedInUser = ({ user, onLogout }) => {
  if (!user) {
    return null
  }

  return (
    <p>
      {user.name} logged in <button onClick={onLogout}>logout</button>
    </p>
  )
}

export default LoggedInUser
