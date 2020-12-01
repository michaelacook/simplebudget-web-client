import React from "react"
import { Breadcrumb, Segment } from "semantic-ui-react"
import { Link } from "react-router-dom"

/**
 * Sections is an array of objects containing name and path values
 */
export default ({ sections, size, ...props }) => {
  return (
    <Segment
      className="mt-1"
      style={{ marginRight: "16px", marginLeft: "16px" }}
    >
      <Breadcrumb size={size}>
        {sections.map((section, i) => (
          <React.Fragment>
            <Breadcrumb.Section as={Link} to={section.path}>
              {section.name}
            </Breadcrumb.Section>
            {i !== sections.length - 1 ? (
              <Breadcrumb.Divider icon="right chevron"></Breadcrumb.Divider>
            ) : null}
          </React.Fragment>
        ))}
      </Breadcrumb>
    </Segment>
  )
}
