import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Header, Modal, Icon } from "semantic-ui-react"

export default ({ deleteUser, userId }) => {
  const [open, setOpen] = React.useState(false)
  const history = useHistory()

  function handleConfirm() {
    deleteUser(userId)
    setOpen(false)
    history.push("/signup?delete_account=true")
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button size="medium" color="red" floated="right">
          <Icon name="warning sign"></Icon>
          Delete Account
        </Button>
      }
    >
      <Modal.Header style={{ color: "red" }}>
        <Icon name="warning sign"></Icon>
        Warning
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            Are you sure you want to delete your account? All your data will be
            lost. This action is permanent.
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Nevermind
        </Button>
        <Button
          content="I understand the consequences"
          labelPosition="right"
          icon="checkmark"
          onClick={handleConfirm}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}
