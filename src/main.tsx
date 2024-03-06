import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SkeletonTheme } from "react-loading-skeleton";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="837816988358-6pnenta8qa1hma94dp1uar3dhqoi8sv8.apps.googleusercontent.com">
      <SkeletonTheme baseColor="#808080" highlightColor="#525252">
        <App />
      </SkeletonTheme>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
