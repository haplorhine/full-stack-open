import { Button, TextField } from '@mui/material'

const LoginForm = ({
  username,
  password,
  onLogin,
  setUsername,
  setPassword,
}) => (
  <form onSubmit={onLogin}>
    <TextField
      id="standard-basic"
      label="username"
      variant="standard"
      value={username}
      onChange={({ target }) => setUsername(target.value)}
    />
    <br />

    <TextField
      id="standard-basic"
      label="password"
      variant="standard"
      type="password"
      value={password}
      onChange={({ target }) => setPassword(target.value)}
      margin="dense"
    />

    <div>
      <Button type="submit" variant="contained">
        login
      </Button>
    </div>
  </form>
)

export default LoginForm
