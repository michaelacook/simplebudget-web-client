import React, { useState } from "react"
import Switch from "react-switch"

/**
 * func prop is a function passed to run onChange
 */
export default ({ func }) => {
  const [on, setOn] = useState(false)

  const handleChange = () => {
    setOn(!on)
    if (func) {
      func()
    }
  }

  return (
    <Switch
      checked={on}
      onChange={handleChange}
      uncheckedIcon={false}
      checkedIcon={false}
      width={35}
      height={21}
    />
  )
}
