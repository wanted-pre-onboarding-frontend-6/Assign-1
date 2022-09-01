import { useEffect, useState } from 'react';

const useRegExp = (email: string, passowrd: string) => {
    // result state
    const [emailResult, setEmailResult] = useState<boolean>(false);
    const [passwordResult, setPasswordResult] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(true);

    // email onChange
    useEffect(() => {
        const emailRegexp = email.includes('@');
        if (email === '') {
            setEmailResult(false);
        } else {
            if (emailRegexp) {
                setEmailResult(true);
            } else {
                setEmailResult(false);
            }
        }
    }, [email]);

    // password onChange
    useEffect(() => {
        const passwordRegexp = passowrd.length > 7;
        if (passowrd === '') {
            setPasswordResult(false);
        } else {
            if (passwordRegexp) {
                setPasswordResult(true);
            } else {
                setPasswordResult(false);
            }
        }
    }, [passowrd]);

    // email & passowrd result
    useEffect(() => {
        if (emailResult && passwordResult) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [emailResult, passwordResult]);

    // return
    return disabled;
};
export default useRegExp;
