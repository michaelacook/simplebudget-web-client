import React, { useState } from "react"
import { Icon, Message } from "semantic-ui-react"

export default function ProTip({ text }) {
  const [message, setMessage] = useState(true)

  function handleDismiss() {
    setMessage(false)
  }

  return message ? (
    <Message onDismiss={handleDismiss} info className="mt-2">
      <Message.Header>
        <Icon name="idea" /> Pro Tip
      </Message.Header>
      <p>{text}</p>
    </Message>
  ) : null
}
