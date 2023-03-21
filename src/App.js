import React from 'react'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddTodo from './components/add-todo'
import TodoList from './components/todo-list'
import Login from './components/login'
import Signup from './components/signup'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Navbar'
import TodoDataServices from "./services/todo";

function App() {
    const [user, setUser] = React.useState(null)
    const [token, setToken] = React.useState(null);
    const [error, setError] = React.useState('');
    const history = useNavigate();

    async function login(user = null) {
        TodoDataServices.login(user)
            .then(response => {
                setToken(response.data.token)
                setUser(user.username)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', user.username)
                setError('')
            }).catch(e => {
                console.log('login', e)
                setError(e.toString())
        })
    }

    async function logout() {
        setUser(null);
        setToken("");
        localStorage.setItem('token', '');
        localStorage.setItem('user', '');
    }

    async function signup(user = null) {
        TodoDataServices.signup(user)
            .then(response => {
                setToken(response.data.token);
                setUser(user.username);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', user.username);
            }).catch(e => {
                console.log(e);
                setError(e.toString())
        })
    }

    return (
        <div className="App">
            <Navbar bg="primary" variant="dark">
                <div className="container-fluid">
                    <Navbar.Brand>React-boostrap</Navbar.Brand>
                    <Nav className="me-auto">
                        <Container>
                            <Link className="nav-link" to={"/todos"}>Todos</Link>
                            {user ? (<Link className="nav-link" onClick={logout}>Logout({user})</Link>) :
                                (<>
                                        <Link className="nav-link" to="/login">Login</Link>
                                        <Link className="nav-link" to="/signup">Sing Up</Link>
                                    </>
                                )}
                        </Container>
                    </Nav>
                </div>
            </Navbar>
            <div className="container mt-4">
                <Routes>
                    <Route
                        path="/"
                        element={<TodoList history={history} token={token}  />}
                    />
                    <Route path="/todos/create"
                           element={<AddTodo token={token} />}
                           />
                    <Route
                        path="/todos/:id"
                        element={<AddTodo token={token}/>}
                    />
                    {/*<Route path="/login" render={(props) => <Login {...props} login={login}/>}/>*/}
                    <Route
                        path="/login"
                        element={ <Login history={history}  login={login}/>}
                    />
                    <Route path="/signup" render={(props) => <Signup {...props} signup={signup}/>}/>
                </Routes>
            </div>
            <footer className="text-cente text-lg-start bg-light text-muted mt-4">
                <div className="text-center p-4">
                    Author: Haiming Liang
                </div>
        </footer>
        </div>

    );
}

export default App;
