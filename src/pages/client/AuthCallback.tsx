import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { gitHubOAuthLogin } from "@/service/client/api/clientApi";
import { googleOAuthLogin } from "@/service/client/api/clientApi";
import { setUser } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Loader } from "@/components/shared/Loader";
import { ErrorResponse } from "@/types/error";
import { toast } from "sonner";

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  const googleOAuthMutation = useMutation({
    mutationFn: googleOAuthLogin,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      navigate("/", { replace: true });
    },
    onError: (error: ErrorResponse) => {
      console.error("Google login error:", error);
      if (error.response?.data?.message === "Your account has been banned") {
        toast.error(error.response?.data?.message);
        navigate("/login", { replace: true });
      }
      setError(error.message || "Google OAuth login failed");
    },
  });

  const gitHubOAuthMutation = useMutation({
    mutationFn: gitHubOAuthLogin,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      navigate("/", { replace: true });
    },
    onError: (error: ErrorResponse) => {
      if (error.response?.data?.message === "Your account has been banned") {
        toast.error(error.response?.data?.message);
        navigate("/login", { replace: true });
      }
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
        googleOAuthMutation.mutate(code);
      } else {
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
