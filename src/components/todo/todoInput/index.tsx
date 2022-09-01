import { SetStateAction, useCallback, Dispatch, FC } from 'react';
import CommonButton from 'components/common/button';
import useInput from 'hooks/useInput';
import TodoService from 'services/todoServeice';
import debug from 'utils/debug';
import { TodoDataType, TodoPostType } from 'types/db/todo';
import styled from 'styled-components';
import { StyleProps } from 'types/style/style.types';

// type
interface TodoInputType {
    todos: Array<TodoDataType>;
    setTodos: Dispatch<SetStateAction<TodoDataType[]>>;
}

// fc
const TodoInput: FC<TodoInputType> = ({ todos, setTodos }) => {
    // state
    const [todoText, onChangeTodoText, setTodoText] = useInput('');

    // create todo func
    const onCreateTodoHandler = useCallback(
        async (e: any) => {
            e.preventDefault();
            if (todoText.trim() === '') {
                return;
            } else {
                const data: TodoPostType = {
                    todo: todoText,
                };

                try {
                    const response = await TodoService.create(data);
                    debug(response);
                    alert('투두리스트가 등록되었습니다');
                    setTodos([response.data, ...todos]);
                    setTodoText('');
                } catch (err) {
                    debug(err);
                    alert('투두리스트 추가에 실패하였습니다');
                }
            }
        },
        [todoText],
    );

    // render
    return (
        <TodoInpuTemp>
            <input type="text" value={todoText} onChange={onChangeTodoText} />
            <CommonButton
                size="full"
                mainColor="#D070FB"
                subColor="#fff"
                height="35px"
                onClick={onCreateTodoHandler}
                type="submit"
            >
                추가하기
            </CommonButton>
        </TodoInpuTemp>
    );
};
export default TodoInput;

const TodoInpuTemp = styled.div<StyleProps>`
    width: 440px;
    padding: 16px;
    position: fixed;
    bottom: 32px;
    background-color: ${props => props.theme.mainColor};
    & input[type='text'] {
        display: block;
        padding: 4px 0;
        border-radius: 8px;
        border: 1px solid rgba(118, 118, 118, 0.5);
        width: 100%;
        font-size: 14px;
        text-align: center;
        margin-bottom: 16px;
        ::placeholder {
            color: rgba(118, 118, 118, 0.5);
        }
    }
`;
