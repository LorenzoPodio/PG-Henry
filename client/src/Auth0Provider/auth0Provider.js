import React from 'react';
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {

 
  const domain = "manucrespo.us.auth0.com"
  const clientId = "u3usE0qWKmVngK7ycT9vjcrc9oGBuWvv"
  
  const history = useNavigate();

  const onRedirectCallback = appState => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.href= "/excursiones"
    );
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
