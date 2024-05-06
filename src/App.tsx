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
import { CheckOut } from "./pages/CheckOut";
import { AllOrders } from "./pages/AllOrders";


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
        <Route
        path={routes.checkOut}
        element={<AuthenticationGuard component={CheckOut} />}
      />
      {/* <Route path="/public" element={<PublicPage />} /> */}
      <Route
        path={routes.allOrders}
        element={<AuthenticationGuard component={AllOrders} />}
      />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Container>
    </ShoppingCartProvider>
  );
};
