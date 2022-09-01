import Router from 'router';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router />
        </ThemeProvider>
    );
}

export default App;
