import React from 'react';
import './patientPage.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


class PatientPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            patients: [] 
        }
    }

    componentDidMount = () => {
        fetch("http://127.0.0.1:8000/quest/patients/")
            .then( data => data.json())
            .then( data => {
                this.setState({patients: data})
            })
    }

    render() {

        if (this.props.isUserLoggedIn === true){
            const patients = this.state.patients;
        }

        let isUserloggedIn = this.props.isUserLoggedIn;

        return (
            isUserloggedIn ? (
            <div>
                {this.state.patients.length === 0 && (
                    <div className="text-center">
                        <h2>No patients found at the moment</h2>
                    </div>
                )}
                <div id="content" className="container">
                    <div id="wrapper" className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">PESEL</th>
                                    <th scope="col">Firstname</th>
                                    <th scope="col">Lastname</th>
                                    <th scope="col">Date of birth</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Sex</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.patients && this.state.patients.map(patient =>
                                    <tr key={patient.id}>
                                        <td>{patient.pesel}</td>
                                        <td>{patient.first_name}</td>
                                        <td>{patient.last_name}</td>
                                        <td>{patient.date_of_birth}</td>
                                        <td>{patient.age}</td>
                                        <td>{patient.sex}</td>

                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            ) : (
                    <Redirect to="/"></Redirect>
                )
        )
    }
    
}

export default PatientPage;