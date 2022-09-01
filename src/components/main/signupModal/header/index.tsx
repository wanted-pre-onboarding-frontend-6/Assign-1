import { Dispatch, SetStateAction, FC } from 'react';
import styled from 'styled-components';
import { StyleProps } from 'types/style/style.types';

// type
interface SignModalHeaderProp {
    setModal: Dispatch<SetStateAction<boolean>>;
}

// fc
const SignModalHeader: FC<SignModalHeaderProp> = ({ setModal }) => {
    // render
    return (
        <SignHeaderTemp>
            <div>회원가입</div>
            <button onClick={() => setModal(false)}>x</button>
        </SignHeaderTemp>
    );
};
export default SignModalHeader;

// style
const SignHeaderTemp = styled.div<StyleProps>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    height: 32px;
    font-size: 14px;
    background-color: ${props => props.theme.mainColor};
`;
