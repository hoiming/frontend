import React, {useState, useEffect} from 'react'
import TodoDataService from '../services/todo'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import moment from 'moment'

const TodoList = props => {
    const [todos, setTodos ] = useState([])

    useEffect(() => {
        retrieveTodos();
    }, props.token)

    const retrieveTodos = () => {
        TodoDataService.getAll(props.token)
            .then(response => {
                setTodos(response.data)
            }).catch(e => {
                console.log(e)
        })
    }

    return (
        <Container>
            {props.token == null || props.token === "" ? (<Alert variant="warning">你未登录，请<Link to="/login">登录</Link>去查看你的待办事项.</Alert>): (
                <div>
                    <Link to="/todos/create">
                        <Button variant="online-info" className="mb-3">
                            添加待办事项
                        </Button>
                    </Link>
                    {todos.map((todo) => {
                        return (
                            <Card key={todo.id} className='mb-3'>
                                <Card.Body>
                                    <div>
                                        <Card.Title>{todo.title}</Card.Title>
                                        <Card.Text><b>Memo:</b>{todo.memo}</Card.Text>
                                        <Card.Text>创建时间：{moment(todo.created).format("YYYY-MM-DD")}</Card.Text>
                                    </div>
                                    <Link to={`/todos/${todo.id}`} state={  {currentTodo: todo, token: props.token}  }>
                                        <Button variant="outline-info" className="me-2">编辑</Button> </Link>
                                    <Button variant="outline-danger">删除</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            )}

        </Container>
    )
}

export default TodoList
