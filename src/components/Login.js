// import { useEffect } from 'react';

// const Login = ({ onLoginSuccess }) => {
//   useEffect(() => {
//     const initializeGoogle = () => {
//       if (window.google && window.google.accounts) {
//         window.google.accounts.id.initialize({
//           client_id: "739609607482-1596gs0vpa7kab0sl34r2on2ub1nj48q.apps.googleusercontent.com",
//           callback: handleCredentialResponse,
//         });

//         window.google.accounts.id.renderButton(
//           document.getElementById("google-signin"),
//           { theme: "outline", size: "large" }
//         );
//       } else {
//         // Wait and retry
//         setTimeout(initializeGoogle, 100);
//       }
//     };

//     initializeGoogle();
//   }, []);

//   const handleCredentialResponse = (response) => {
//     onLoginSuccess(response.credential);
//   };

//   return <div id="google-signin"></div>;
// };

// export default Login;






// src/components/Login.js
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = ({ onLoginSuccess }) => {
  return (
    <GoogleOAuthProvider clientId="739609607482-1596gs0vpa7kab0sl34r2on2ub1nj48q.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const accessToken = credentialResponse.access_token;
          if (accessToken) {
            onLoginSuccess(accessToken);
          } else {
            alert("Access token not received");
          }
        }}
        onError={() => {
          alert("Login Failed");
        }}
        useOneTap={false}
        flow="implicit"
        scope="https://www.googleapis.com/auth/gmail.readonly"
      />
    </GoogleOAuthProvider>
  );
};

export default Login;

