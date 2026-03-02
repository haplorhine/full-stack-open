const LoginForm = ({
  username,
  password,
  onLogin,
  setUsername,
  setPassword,
}) => (
  <form onSubmit={onLogin}>
    <label>
      username{' '}
      <input
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
    </label>
    <br />
    <label>
      password{' '}
      <input
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
    </label>
    <div>
      <button type="submit">login</button>
    </div>
  </form>
)

export default LoginForm
