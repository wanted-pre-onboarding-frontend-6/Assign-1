import { FC, SetStateAction, useCallback, Dispatch, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan, faPen } from '@fortawesome/free-solid-svg-icons';
import useInput from 'hooks/useInput';
import CommonButton from 'components/common/button';
import TodoService from 'services/todoServeice';
import debug from 'utils/debug';
import { TodoDataType } from 'types/db/todo';
import styled from 'styled-components';
import { StyleProps } from 'types/style/style.types';
import { flexCenter } from 'styles/common';

interface TodoListProps {
    todos: TodoDataType[];
    todo: TodoDataType;
    setTodos: Dispatch<SetStateAction<TodoDataType[]>>;
}

const TodoList: FC<TodoListProps> = ({ todos, todo, setTodos }) => {
    // state
    const [eidtTodo, setEditTodo] = useState(false);
    const [newTodo, onChangeTodo] = useInput(todo.todo);

    // state update handler
    const onCompleteUpdate = useCallback(async () => {
        // data
        const data = {
            id: todo.id,
            data: {
                todo: todo.todo,
                isCompleted: !todo.isCompleted,
            },
        };
        // sync
        try {
            const response = await TodoService.update(data);
            alert('상태가 변경되었습니다');
            const Todos = [...todos];
            const todoIndex = Todos.findIndex(v => v.id === todo.id);
            Todos[todoIndex].isCompleted = response.data.isCompleted;
            setTodos(Todos);
        } catch (err) {
            debug(err);
            alert('상태 업데이트에 실패하였습니다');
        }
    }, [todo]);

    // todo update handler
    const onTodoUpdate = useCallback(async () => {
        if (newTodo === todo.todo) {
            setEditTodo(false);
        } else {
            // data
            const data = {
                id: todo.id,
                data: {
                    todo: newTodo,
                    isCompleted: todo.isCompleted,
                },
            };
            // sync
            try {
                const response = await TodoService.update(data);
                alert('투두리스트가 변경되었습니다');
                const Todos = [...todos];
                const todoIndex = Todos.findIndex(v => v.id === todo.id);
                Todos[todoIndex].todo = response.data.todo;
                setTodos(Todos);
                setEditTodo(false);
            } catch (err) {
                debug(err);
                alert('상태 업데이트에 실패하였습니다');
            }
        }
    }, [todo, newTodo]);

    // remove hadnler
    const onTodoDelete = useCallback(async () => {
        try {
            await TodoService.delete(todo.id);
            alert('투두리스트가 삭제되었습니다');
            const Todos = todos.filter(v => v.id !== todo.id);
            setTodos(Todos);
        } catch (err) {
            debug(err);
            alert('투두리스트가 삭제에 실패하였습니다');
        }
    }, [todos, todo]);

    // render
    return (
        <TodoListCard isCompleted={todo.isCompleted}>
            <div className="todoTitle">
                List
                <div className="updateBtn" onClick={onCompleteUpdate}>
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            </div>
            <div className="todoCotent">
                {eidtTodo ? (
                    <>
                        <input type="text" value={newTodo} onChange={onChangeTodo} />
                        <CommonButton
                            size="small"
                            fontSzie="10px"
                            type="button"
                            onClick={onTodoUpdate}
                        >
                            수정하기
                        </CommonButton>
                        <CommonButton
                            size="small"
                            fontSzie="10px"
                            type="button"
                            onClick={() => setEditTodo(false)}
                        >
                            돌아가기
                        </CommonButton>
                    </>
                ) : (
                    <>
                        {todo.todo}
                        <span onClick={() => setEditTodo(true)}>
                            <FontAwesomeIcon icon={faPen} />
                        </span>
                    </>
                )}
            </div>
            <div className="deletBtn" onClick={onTodoDelete}>
                <FontAwesomeIcon icon={faBan} />
            </div>
        </TodoListCard>
    );
};
export default TodoList;

// style
const TodoListCard = styled.div<StyleProps>`
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.mainColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 24px 0;

    & > .todoTitle {
        background-color: ${props => props.theme.mainColor};
        width: 100%;
        text-align: center;
        position: relative;
        padding: 8px 0;
        & > .updateBtn {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: ${props => (props.isCompleted ? '#fff' : '#eee')};
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: -10px;
            left: -10px;
            cursor: pointer;
            color: ${props => (props.isCompleted ? '#3CB371' : '#999')};
        }
    }
    & > .todoCotent {
        width: 90%;
        text-align: center;
        padding: 16px;
        display: flex;
        justify-content: center;
        align-items: center;

        & > input[type='text'] {
            width: 60%;
            margin: 4px;
            text-align: center;
            color: #999;
            border-radius: 8px;
            border: 1px solid ${props => props.theme.mainColor};
        }
        & > span {
            margin-left: 16px;
            cursor: pointer;
            color: #d070fb;
        }
    }
    & > .deletBtn {
        color: #ff0000;
        padding: 8px;
        width: 100%;
        text-align: center;
        border-top: 1px solid ${props => props.theme.mainColor};
        cursor: pointer;
    }
`;
