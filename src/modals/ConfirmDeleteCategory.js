import React, { useState } from "react"
import { Button, Confirm, Icon } from "semantic-ui-react"

export default function ConfirmDeleteCategory({ onConfirm, buttonColour }) {
  const [open, setOpen] = useState(false)

  function handleConfirm() {
    onConfirm()
    setOpen(false)
  }

  function handleCancel() {
    setOpen(false)
  }

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        color={buttonColour}
        icon="trash"
      ></Button>
      <Confirm open={open} onConfirm={handleConfirm} onCancel={handleCancel} />
    </div>
  )
}
