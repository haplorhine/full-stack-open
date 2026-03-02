const LoggedInUser = ({ user, onLogout }) => (
  <p>
    {user.name} logged in <button onClick={onLogout}>logout</button>
  </p>
)

export default LoggedInUser
