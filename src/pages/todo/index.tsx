import { useState, useEffect, useCallback } from 'react';
import MainLayout from 'components/common/layout';
import TodoService from 'services/todoServeice';
import styled from 'styled-components';
import debug from 'utils/debug';
import { TodoDataType } from 'types/db/todo';
import { StyleProps } from 'types/style/style.types';
import TodoInput from 'components/todo/todoInput';
import TodoTItle from 'components/todo/todoTitle';
import TodoList from 'components/todo/todoList';

const TodoPage = () => {
    // state
    const [todos, setTodos] = useState<Array<TodoDataType>>([]);

    // onTodoRead func
    const onTodoRead = useCallback(async () => {
        try {
            const response = await TodoService.read();
            debug(response);
            setTodos(response.data);
        } catch (err) {
            debug(err);
            alert('투두리스트 목록 불러오기에 실패하였습니다');
        }
    }, []);

    // read todo func
    useEffect(() => {
        onTodoRead();
    }, []);

    // render
    return (
        <MainLayout>
            <TodoPageInner>
                <TodoPageForm>
                    <TodoTItle />
                    <div className="listbox">
                        {todos &&
                            todos.map((v: TodoDataType) => (
                                <TodoList todos={todos} key={v.id} todo={v} setTodos={setTodos} />
                            ))}
                    </div>
                    <TodoInput todos={todos} setTodos={setTodos} />
                </TodoPageForm>
            </TodoPageInner>
        </MainLayout>
    );
};
export default TodoPage;

const TodoPageInner = styled.div`
    width: 100%;
    height: calc(100vh - 4rem);
    padding: 2rem 0;
`;

const TodoPageForm = styled.form<StyleProps>`
    position: relative;
    width: 440px;
    height: 100%;
    margin: 0 auto;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 5px 5px 0px 1px #4545, -5px -5px 5px 5px ${props => props.theme.mainColor};
    & > .listbox {
        width: 360px;
        padding-bottom: 120px;
        margin: 0 auto;
    }
    ::-webkit-scrollbar {
        width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
        height: 30%;
        background-color: ${props => props.theme.mainColor};
    }
    ::-webkit-scrollbar-track {
        background: rgba(33, 122, 244, 0.1);
    }
`;
