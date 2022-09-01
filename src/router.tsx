import MainPage from 'pages/main';
import TodoPage from 'pages/todo';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from 'styles/global';
import PrivateRoute from 'utils/privateRoute';

const Router = () => {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Suspense fallback={<></>}>
                <Routes>
                    {/* public */}
                    <Route path="/" element={<MainPage />} />
                    {/* praivate */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/todo" element={<TodoPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};
export default Router;
