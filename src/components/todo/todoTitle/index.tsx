import styled from 'styled-components';
import { StyleProps } from 'types/style/style.types';

// fc
const TodoTItle = () => {
    // render
    return <TodoTitleTemp>TO DO LIST</TodoTitleTemp>;
};
export default TodoTItle;

// style
const TodoTitleTemp = styled.div<StyleProps>`
    width: 100%;
    text-align: center;
    height: 40px;
    display: inline-block;
    vertical-align: middle;
    background-color: ${props => props.theme.mainColor};
    font-weight: bold;
`;
