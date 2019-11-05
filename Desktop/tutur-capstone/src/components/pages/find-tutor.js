import React from "react";
import Select from "react-select"
import axios from "axios";
import TutorItem from "../tutors/tutor-item"

class FindTutor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      university: "",
      subject: "",
      data: []
    }

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

  credentials = () => {
    if (this.props.loggedin == "NOT_LOGGED_IN") {
      this.props.history.push("/login")
    }
  }
  handleChangeUniversity = (optionSelected) => {
    this.setState({
      university: optionSelected.value
    })
    console.log(this.state.university)
  }

  handleChangeSubject = (optionSelected) => {
    this.setState({
      subject: optionSelected.value
    })
  }

  handleFilter = () => {
    this.setState({
      data: this.state.data.filter(tutor => {
        return tutor.university == this.state.university && tutor.subject == this.state.subject
      })
    })
  }

  getTutors = () => {
    axios
      .get('https://tutor-app-capstone.herokuapp.com/api/get-tutors')
      .then(response => {
        this.setState({
          data: response.data.filter(tutor => {
            return tutor.role === "tutor"
          })
        })
      })

      .catch(error => {
        console.log(error)
      })
    console.log(this.state.data)
  }

  tutorItems = () => {
    return this.state.data.map(tutor => {
      return <TutorItem key={tutor.id} tutor={tutor} />
    })
  }


  componentDidMount() {
    this.getTutors();
  }
  render() {
    return (
      <div className="find-tutor-page-wrapper">
        <form>
          <Select
            name="university"
            options={this.universityOptions}
            onChange={this.handleChangeUniversity}
            placeholder="Choose Your University"
          />
          <Select
            name="subject"
            options={this.subjectOptions}
            onChange={this.handleChangeSubject}
            placeholder="Choose a subject"
          />
        </form>
        <button onClick={this.handleFilter}>Search</button>
        <div className="tutor-items-wrapper">
          {this.tutorItems()}
        </div>
      </div>
    );
  }
}

export default FindTutor;
