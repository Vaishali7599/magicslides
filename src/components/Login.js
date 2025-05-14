import { useEffect } from 'react';

const Login = ({ onLoginSuccess }) => {
  useEffect(() => {
    const initializeGoogle = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: "739609607482-1596gs0vpa7kab0sl34r2on2ub1nj48q.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin"),
          { theme: "outline", size: "large" }
        );
      } else {
        // Wait and retry
        setTimeout(initializeGoogle, 100);
      }
    };

    initializeGoogle();
  }, []);

  const handleCredentialResponse = (response) => {
    onLoginSuccess(response.credential);
  };

  return <div id="google-signin"></div>;
};

export default Login;
