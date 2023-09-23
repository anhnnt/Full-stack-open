const Notification = ({ message }) => {
	if (message === null) {
		return null
	}

  const style = message.toLowerCase().includes("error")
  ? "error"
  : "success"

  return (
    <div className={style}>{message}</div>
  )
}

export default Notification