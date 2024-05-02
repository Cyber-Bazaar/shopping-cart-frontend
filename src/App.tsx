import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./components/PageLoader";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AuthenticationGuard } from "./components/auth/AuthenticationGuard";
import { Store } from "./pages/Store";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Navbar } from "./components/Navbar";
import { Container } from "react-bootstrap";
import { routes } from "./utilities/constants";


export const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
      <Routes>
        <Route path={routes.home} element={<Store />} />
        <Route path={routes.store} element={<Store />} />
        {/* <Route
        path="/profile"
        element={<AuthenticationGuard component={ProfilePage} />}
      />
      <Route path="/public" element={<PublicPage />} />
      <Route
        path="/protected"
        element={<AuthenticationGuard component={ProtectedPage} />}
      /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Container>
    </ShoppingCartProvider>
  );
};
