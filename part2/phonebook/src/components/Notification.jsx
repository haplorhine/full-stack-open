const Notification = ({ message }) => {
  console.log('in notifi', message)
  if (message === null) {
    return null
  }

  return <div className={message.type}>{message.text}</div>
}

export default Notification
