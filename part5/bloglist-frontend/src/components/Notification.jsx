import { Alert } from '@mui/material'

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return <Alert severity={className}>{message}</Alert>
}

export default Notification
