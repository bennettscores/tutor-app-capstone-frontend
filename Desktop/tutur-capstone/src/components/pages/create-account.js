import React from 'react';
import axios from "axios"
import Select from "react-select"


class CreateAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            role: "",
            university: "",
            subject: "",
            isLoading: false
        }

        this.roleOptions = [
            { value: "tutor", label: 'Tutor' },
            { value: "student", label: 'Student' }
        ]

        this.universityOptions = [
            { value: "Arizona State University", label: "Arizona State University" },
            { value: "Brigham Young University", label: "Brigham Young University" },
            { value: "Utah Valley University", label: "Utah Valley University" }
        ]

        this.subjectOptions = [
            { value: "Math", label: "Math" },
            { value: "Biology", label: "Biology" },
            { value: "Computer programming", label: "Computer programming" },
            { value: "History", label: "History" }
        ]
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            errorText: ""
        })
    }

    handleChangeRole = (optionSelected) => {
        this.setState({
            role: optionSelected.value
        })
    }

    handleChangeUniversity = (optionSelected) => {
        this.setState({
            university: optionSelected.value
        })

    }

    handleChangeSubject = (optionSelected) => {
        this.setState({
            subject: optionSelected.value
        })
    }

    handleSubmit = (e) => {
        this.setState({
            isLoading: true
        })
        axios({
            method: "post",
            url: "https://tutor-app-capstone.herokuapp.com/api/register",
            data:
            {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password2: this.state.password2,
                role: this.state.role,
                university: this.state.university,
                subject: this.state.subject
            }
        })
            .then(response => {
                if (response.data.role) {
                    this.props.history.push('/login')
                }
            }).catch(err => {
                this.setState({
                    errorText: "Please try again"
                })
            })
        this.setState({
            isLoading: false
        })
        e.preventDefault();
    }



    render() {
        return (
            <div className="create-an-account-page-wrapper" >
                {this.state.isLoading ? (
                    <div className="content-loader">
                        <h1>LOADING...</h1>
                    </div>
                ) : null}
                <form onSubmit={this.handleSubmit}>
                    <div className="top-row-input">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />

                        <input
                            type="password"
                            name="password2"
                            placeholder="Confirm password"
                            value={this.state.password2}
                            onChange={this.handleChange}
                        />
                    </div>
                    <Select
                        name="role"
                        options={this.roleOptions}
                        onChange={this.handleChangeRole}
                        placeholder="Choose one"

                    />

                    <Select
                        name="university"
                        options={this.universityOptions}
                        onChange={this.handleChangeUniversity}
                        placeholder="Choose Your Univeristy"
                    />

                    <Select
                        name="subject"
                        options={this.subjectOptions}
                        onChange={this.handleChangeSubject}
                        placeholder="Choose a subject"
                    />

                    <button type="submit">Create Account</button>

                </form>
            </ div>
        )
    }
}

export default CreateAccount