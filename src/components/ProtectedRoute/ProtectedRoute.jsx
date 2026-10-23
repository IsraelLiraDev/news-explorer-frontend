import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

// Quem não está logado volta para a página inicial e o login é aberto.
function RedirectToLogin({ onUnauthorized }) {
  useEffect(() => {
    onUnauthorized();
  }, [onUnauthorized]);

  return <Redirect to="/" />;
}

// HOC: renderiza o componente só para usuários autorizados.
function ProtectedRoute({
  component: Component, path, exact, isLoggedIn, isCheckingAuth, onUnauthorized, ...props
}) {
  function renderRoute() {
    if (isCheckingAuth) {
      return null;
    }
    return isLoggedIn ? <Component {...props} /> : <RedirectToLogin onUnauthorized={onUnauthorized} />;
  }

  return <Route path={path} exact={exact} render={renderRoute} />;
}

export default ProtectedRoute;
