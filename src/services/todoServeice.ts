import { TodoPostType, TodoUpdateType } from 'types/db/todo';
import { axiosApiInstance } from 'utils/axios';

export default class TodoService {
    public static create(data: TodoPostType) {
        return axiosApiInstance.post('/todos', data);
    }
    public static async read() {
        return axiosApiInstance.get('/todos');
    }
    public static update(data: TodoUpdateType) {
        return axiosApiInstance.put(`/todos/${data.id}`, data.data);
    }
    public static delete(id: number) {
        return axiosApiInstance.delete(`/todos/${id}`);
    }
}
