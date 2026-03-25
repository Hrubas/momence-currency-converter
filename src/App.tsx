import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExchangeRatesPage } from "./components/ExchangeRatesPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ExchangeRatesPage />
    </QueryClientProvider>
  );
};

export default App;
