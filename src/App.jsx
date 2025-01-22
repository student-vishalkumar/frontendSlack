import { Route, Routes } from "react-router-dom";
import { Auth } from "@/pages/Auth/Auth";

import { SigninCard } from "@/components/organisms/Auth/SigninCard";
import { Notfound } from "@/pages/Notfound/Notfound";
import { SignupContainer } from "@/components/organisms/Auth/SignupContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/auth/signup" element={<Auth><SignupContainer /></Auth>}/>
        <Route path="/auth/signin"element={<Auth><SigninCard /></Auth>}/>
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
