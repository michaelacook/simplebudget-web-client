import React, { useState } from "react"
import { Button, Header, Modal, Icon } from "semantic-ui-react"

export default () => {
  const [open, setOpen] = React.useState(false)

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
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}
