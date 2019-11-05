import React, { Component } from 'react'

class TutorItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { id, name, university, subject, email } = this.props.tutor
        return (
            <div className="tutor-item-wrapper">
                <div className="tutor-name">
                    <h1>{name}</h1>
                </div>
                <div className="tutor-university">
                    <h1>{university}</h1>
                </div>
                <div className="tutor-subject">
                    <h1> {subject}</h1>
                </div>
                <div className="tutor-email">
                    <h1>{email}</h1>
                </div>
            </div>
        )
    }
}
export default TutorItem