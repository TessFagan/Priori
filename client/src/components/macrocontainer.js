import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Example from './example';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import API from "../API";

class Addtodo extends Component {
    state = {
        newToDo: ""
    }

    handleClick = (e) => {
        e.preventDefault();
        console.log("add clicked =>" + document.getElementById("addtodo").value);
        console.log(document.getElementById("addtodo").value)

        this.setState({
            newtodo: document.getElementById("addtodo").value
        });

        var userData = this.state.newToDo

        API.createUser(userData)

    }

    handleChange = (e) => {
        const val = e.target.value;

        this.setState({
            newToDo: val
        })
    }

    render() {
        return (

            <Col md={6}>
                <Jumbotron>
                    <Form>
                        <Form.Group controlId="Addtodo">
                            <Form.Label> <h3>Add a To-do:</h3></Form.Label>
                            <Form.Control type="add" placeholder="Add your to-do here"
                                name="addtodo"
                                id="addtodo"
                                value={this.state.newToDo}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" id="submitbutton" onClick={this.handleClick} key={0}>
                            Add
              </Button>
                    </Form>
                </Jumbotron>
            </Col>
        )
    }
}


class Lifepriorities extends React.Component {

    state = {
        Lifepriorities: [
            {
                id: 1,
                text: 'Write a cool JS library',
            },
            {
                id: 2,
                text: 'Make it generic enough',
            },
            {
                id: 3,
                text: 'Write README',
            },
            {
                id: 4,
                text: 'Create some examples',
            },
            {
                id: 5,
                text:
                    'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
            },
            {
                id: 6,
                text: '???',
            },
            {
                id: 7,
                text: 'PROFIT',
            },
            {
                id: 8,
                text: 'Tess is da bomb',
            },
        ]
    }

    render() {

        return (

            <Col md={6}>
                <Jumbotron>
                    <h3>Life Priorities:</h3>
                    <Example items={this.state.Lifepriorities} />
                </Jumbotron>
            </Col>

        )
    }

}


class Todolist extends React.Component {
    state = {
        Todolist: [
            {
                id: 1,
                text: 'Buy Cat Food',
            },
            {
                id: 2,
                text: 'Take out garbage',
            },
            {
                id: 3,
                text: 'Do Laundry',
            },
            {
                id: 4,
                text: 'Work on coding homework intensely for a long long time so that i get better',
            },
            {
                id: 5,
                text:
                    'Smile more',
            },
            {
                id: 6,
                text: '?',
            },
            {
                id: 7,
                text: 'Save for a house',
            },
            {
                id: 8,
                text: 'Call mom',
            },
        ]

    }

    render() {
        return (

            <Col md={6}>
                <Jumbotron>
                    <h3>To Do:</h3>
                    <Example items={this.state.Todolist} />
                </Jumbotron>
            </Col>
        )
    }

}

class Macrocontainer extends React.Component {

    state = {
        User: "",
        Newpriority: "",
        Addtodo: [],
        Currentlifepriorities: [],
        Currenttodolist: []
    }

    loadUser = () => {
        API.getUser()
            .then(res => this.setState({ User: res.data }))
            .catch(err => console.log(err));
    };

    handleClick = (e) => {
        e.preventDefault();
        console.log("add clicked =>" + document.getElementById("addpriority").value);
        console.log(document.getElementById("addpriority").value)

        this.setState({
            Newpriority: document.getElementById("addpriority").value
        });
        console.log(this.state.Newpriority);

    }


    // https://reactjs.org/docs/lifting-state-up.html READ THIS TESS!!

    render() {
        return (
            <div>
                <Navbar>
                    <h1>PRIORITIZE</h1>
                    <div className="collapse navbar-collapse" id="navbarMenu">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">List Placeholder</a>
                            </li>
                        </ul>
                    </div>
                </Navbar>
                <Container>
                    <Row>
                        <Col md={6}>
                            <Jumbotron>
                                <Form>
                                    <Form.Group controlId="Addpriority">
                                        <Form.Label> <h3>Add a Priority:</h3></Form.Label>
                                        <Form.Control type="add" placeholder="Add your priority here"
                                            name="addpriority"
                                            id="addpriority"
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="add" id="addpriority" onClick={this.handleClick} key={0}>
                                        Add
                  </Button>
                                </Form>
                            </Jumbotron>
                        </Col>
                        <Addtodo />
                    </Row>
                    <Row>
                        <Lifepriorities />
                        <Todolist />
                    </Row>
                </Container>
            </div>

        )
    }
}

export default Macrocontainer;
