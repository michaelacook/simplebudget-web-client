import React, { useState } from "react"
import { Icon, Message } from "semantic-ui-react"

export default function Reminder({ text }) {
  const [message, setMessage] = useState(true)

  function handleDismiss() {
    setMessage(false)
  }

  return message ? (
    <Message onDismiss={handleDismiss} color="green" floating className="mt-2">
      <Message.Header>
        <Icon name="bullhorn" /> Reminder
      </Message.Header>
      <p>{text}</p>
    </Message>
  ) : null
}
