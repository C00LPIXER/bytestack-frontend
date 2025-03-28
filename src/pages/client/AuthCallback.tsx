import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { gitHubOAuthLogin } from "@/service/client/api/authApi";
import { googleOAuthLogin } from "@/service/client/api/authApi";
import { setUser } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Loader } from "@/components/shared/Loader";

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  const googleOAuthMutation = useMutation({
    mutationFn: googleOAuthLogin,
    onSuccess: (data) => {
      if (data.success) {
        dispatch(setUser(data.user));
        navigate("/", { replace: true });
      } else {
        setError("Google OAuth login failed");
      }
    },
    onError: (error: Error) => {
      console.error("Google login error:", error);
      setError(error.message || "Google OAuth login failed");
    },
  });

  const gitHubOAuthMutation = useMutation({
    mutationFn: gitHubOAuthLogin,
    onSuccess: (data) => {
      if (data.success) {
        dispatch(setUser(data.user));
        navigate("/", { replace: true });
      } else {
        setError("GitHub OAuth login failed");
      }
    },
    onError: (error: Error) => {
      console.error("GitHub login error:", error);
      setError(error.message || "GitHub OAuth login failed");
    },
  });

  useEffect(() => {
    const handleOAuthCallback = () => {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      const state = params.get("state");

      // Determine the provider
      const isGoogleCallback = location.search.includes("scope"); // Google includes scope in the redirect
      const stateKey = isGoogleCallback
        ? "google_oauth_state"
        : "github_oauth_state";

      // Log the state values for debugging
      console.log("Callback state:", state);
      console.log(`Stored ${stateKey}:`, localStorage.getItem(stateKey));

      // Verify the state parameter
      const storedState = localStorage.getItem(stateKey);
      if (!state || state !== storedState) {
        setError("Invalid state parameter. Possible CSRF attack.");
        return;
      }

      if (!code) {
        setError("No authorization code provided");
        return;
      }

      // Clear the state and URL parameters to prevent re-processing
      localStorage.removeItem(stateKey);
      navigate(location.pathname, { replace: true }); // Clear query params

      if (isGoogleCallback) {
        console.log("Google OAuth code:", code);
        googleOAuthMutation.mutate(code);
      } else {
        console.log("GitHub OAuth code:", code);
        gitHubOAuthMutation.mutate(code);
      }
    };

    handleOAuthCallback();
  }, [location, navigate, googleOAuthMutation, gitHubOAuthMutation]);

  if (error) {
    return <Loader />;
  }

  return (
    <div>
      {(googleOAuthMutation.isPending || gitHubOAuthMutation.isPending) && (
        <Loader />
      )}
    </div>
  );
};

export default AuthCallback;
