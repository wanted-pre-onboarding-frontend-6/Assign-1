import { UserDataType } from 'types/db/user';
import { axiosApiInstance } from 'utils/axios';

export default class UserSerivce {
    public static login(data: UserDataType) {
        return axiosApiInstance.post('/auth/signin', data);
    }

    public static signUp(data: UserDataType) {
        return axiosApiInstance.post('/auth/signup', data);
    }
}
