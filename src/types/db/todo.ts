export interface TodoDataType {
    id: number;
    todo: string;
    isCompleted: boolean;
    userId: number;
}

export interface TodoPostType {
    todo: string;
}

export interface TodoUpdateType {
    id: number;
    data: {
        todo: string;
        isCompleted: boolean;
    };
}
