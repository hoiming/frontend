import React, {useState} from 'react'
import TodoDataService from '../services/todo'
import {Link, useLocation} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const AddTodo = props => {
    let editing = false;
    let initialTodoTitle = "";
    let initialTodoMemo = "";
    let {state} = useLocation();

    if(state && state.currentTodo){
        editing = true;
        initialTodoTitle = state.currentTodo.title;
        initialTodoMemo = state.currentTodo.memo;
    }

    const [title, setTitle] = useState(initialTodoTitle);
    const [memo, setMemo] = useState(initialTodoMemo);
    const [submitted, setSubmitted] = useState(false);

    const onChangeTitle = e => {
        const title = e.target.value;
        setTitle(title);
    }

    const onChangeMemo = e => {
        const memo = e.target.value;
        setMemo(memo);
    }

    const saveTodo = () =>{
        var data = {
            title: title,
            memo: memo,
            completed: false
        }

        if(editing){
            TodoDataService.updateTodo(state.currentTodo.id, data, state.token)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data)
                }).catch(e => {
                    console.log(e)
            })
        }else{
            TodoDataService.createTodo(data, state.token).then(response => {
                setSubmitted(true);
            }).catch(e => {
                console.log(e)
            })
        }
    }
    return (
        <Container>
            {submitted ? (
                <div>
                    <h4>待办事项提交成功</h4>
                    <Link to="/">返回列表</Link>
                </div>
            ): (
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>{editing ? "编辑" : "新建"}待办事项</Form.Label>
                        <Form.Control type="text" required placeholder="例如：明天买礼物" value={title}
                                      onChange={onChangeTitle}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>内容</Form.Label>
                        <Form.Control as="textarea" rows={3} value={memo} onChange={onChangeMemo}/>
                    </Form.Group>
                    <Button variant="info" onClick={saveTodo}>{editing ? "编辑" : "新建"}待办事项</Button>
                </Form>
            )}
        </Container>
    )
}


export default AddTodo
