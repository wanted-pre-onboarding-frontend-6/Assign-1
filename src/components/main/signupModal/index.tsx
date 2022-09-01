import { Dispatch, SetStateAction, FC } from 'react';
import CommonButton from 'components/common/button';
import { BlackBackGroundTemp } from 'styles/common';
import useInput from 'hooks/useInput';
import useRegExp from 'hooks/useRegExp';
import { useEffect, useState, useCallback } from 'react';
import UserSerivce from 'services/userService';
import debug from 'utils/debug';
import SignModalHeader from './header';
import styled from 'styled-components';
import { UserDataType } from 'types/db/user';

// type
interface SignModalProp {
    setModal: Dispatch<SetStateAction<boolean>>;
}

// fc
const SignModal: FC<SignModalProp> = ({ setModal }) => {
    // state
    const [email, onChangeEmail] = useInput<string>('');
    const [password, onChangePassword] = useInput<string>('');

    // regExp result hooks
    const disabled = useRegExp(email, password);

    // onSignInhandler
    const onSignInhandler = useCallback(() => {
        const data: UserDataType = {
            email: email,
            password: password,
        };
        if (email === '' && password === '') {
            alert('아이디와 비밀번호를 입력해주세요');
            return;
        } else {
            UserSerivce.signUp(data)
                .then(() => {
                    alert('축하합니다. 회원가입에 성고하셨습니다');
                    setModal(false);
                })
                .catch(err => {
                    debug(err);
                    alert('회원가입에 실패하셨습니다');
                });
        }
    }, [email, password]);

    // render
    return (
        <BlackBackGroundTemp>
            <SignModalTemp>
                <SignModalHeader setModal={setModal} />
                <SignForm>
                    <input
                        type="text"
                        placeholder="이메일"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호 8자 이상"
                        value={password}
                        onChange={onChangePassword}
                    />
                    <CommonButton
                        size="full"
                        mainColor="#D070FB"
                        subColor="#fff"
                        height="35px"
                        disabled={disabled}
                        onClick={onSignInhandler}
                    >
                        가입하기
                    </CommonButton>
                </SignForm>
            </SignModalTemp>
        </BlackBackGroundTemp>
    );
};
export default SignModal;

// style
const SignModalTemp = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    background-color: #eee;
`;

const SignForm = styled.div`
    width: 90%;
    padding: 24px 16px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    & input[type='text'],
    input[type='password'] {
        display: block;
        margin: 4px 0;
        padding: 4px 0;
        border-radius: 8px;
        border: 1px solid rgba(118, 118, 118, 0.5);
        width: 100%;
        font-size: 14px;
        text-align: center;
        ::placeholder {
            color: rgba(118, 118, 118, 0.5);
        }
    }
    & > p {
        width: 100%;
        font-size: 10px;
        text-align: center;
        color: #ff0000;
    }
    & > button {
        margin-top: 8px;
    }
`;
