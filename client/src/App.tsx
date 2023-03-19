import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ComposeContext from './context/Compose.context';
import { rootContext } from './context/root.context';

import { customTheme } from './theme/customTheme';
import Dashboard from './pages/dashboard/dashboard';

// Create a client
const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ComposeContext components={rootContext}>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <Dashboard />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ComposeContext>
    </QueryClientProvider>
  );
}

export default App;
