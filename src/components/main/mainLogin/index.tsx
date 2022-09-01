import { useCallback } from 'react';
import useInput from 'hooks/useInput';
import useRegExp from 'hooks/useRegExp';
import debug from 'utils/debug';
import { useNavigate } from 'react-router-dom';
import UserSerivce from 'services/userService';
import TokenService from 'services/tokenService';
import CommonButton from 'components/common/button';
import { UserDataType } from 'types/db/user';
import styled from 'styled-components';

const MainLogin = () => {
    // state
    const [email, onChangeEmail] = useInput<string>('');
    const [password, onChangePassword] = useInput<string>('');

    // util
    const naviagte = useNavigate();

    // regExp result hooks
    const disabled = useRegExp(email, password);

    // onLoginHandler
    const onLoginHandler = useCallback(() => {
        const data: UserDataType = {
            email: email,
            password: password,
        };
        if (email === '' && password === '') {
            alert('아이디와 비밀번호를 입력해주세요');
            return;
        } else {
            UserSerivce.login(data)
                .then(response => {
                    TokenService.set({
                        key: process.env.REACT_APP_TOEKN_KEY as string,
                        value: response.data.access_token,
                    });
                    if (TokenService.get(process.env.REACT_APP_TOEKN_KEY as string)) {
                        naviagte('/todo', { replace: true });
                    }
                })
                .catch(err => {
                    debug(err);
                    alert('이메일 혹은 비밀번호를 확인해주세요');
                });
        }
    }, [email, password]);

    // render
    return (
        <LoginFormTemp>
            <p>사전과제 확인하기</p>
            <p>사전과제 확인을 위해 로그인 해주세요</p>
            <div>
                <input type="text" placeholder="이메일" value={email} onChange={onChangeEmail} />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={onChangePassword}
                />
            </div>
            <CommonButton
                size="full"
                mainColor="#D070FB"
                subColor="#fff"
                height="48px"
                disabled={disabled}
                onClick={onLoginHandler}
            >
                과제 확인하기
            </CommonButton>
        </LoginFormTemp>
    );
};
export default MainLogin;

// style
const LoginFormTemp = styled.div`
    margin: 0 auto;
    height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    & input[type='text'],
    input[type='password'] {
        display: block;
        margin: 8px 0;
        padding: 10px 8px 10px 32px;
        border-radius: 8px;
        border: 1px solid rgba(118, 118, 118, 0.5);
        width: 440px;
        ::placeholder {
            color: rgba(118, 118, 118, 0.5);
        }
    }
    & > p:nth-of-type(1) {
        font-size: 24px;
        font-weight: bold;
    }
    & > div {
        margin-top: 16px;
    }
`;
