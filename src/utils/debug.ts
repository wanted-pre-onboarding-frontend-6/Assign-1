const debug = (data: any) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(data);
    }
};
export default debug;
