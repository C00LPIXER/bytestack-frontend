import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { resetPassword } from "@/service/api/clientApi";
import { resetPasswordSchema } from "@/utils/validation/schemas";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { Logo } from "@/components/shared/Logo";
import { ErrorResponse } from "@/types/error";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tokenFromUrl = query.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  const resetPasswordMutation = useMutation({
    mutationFn: (data: { token: string; newPassword: string }) =>
      resetPassword(data),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Password reset successful");
        navigate("/login");
      }
    },
    onError: (error: ErrorResponse) => {
      formik.setErrors({
        newPassword:
          error.response?.data?.message || "Failed to reset password",
      });
    },
  });

  const formik = useFormik({
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      if (token) {
        resetPasswordMutation.mutate({
          token,
          newPassword: values.newPassword,
        });
      }
    },
  });

  if (!token) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col dark:bg-black dark:text-white">
          <main className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col dark:bg-black dark:text-white">
        <main className="flex-1 grid md:grid-cols-2 gap-8 p-6 md:p-12 dark:bg-transparent dark:text-white">
          <div className="md:flex hidden flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Reset Your Password <br /> Securely with ByteStack
            </h1>
            <p className="text-base mb-6">
              Enter your new password below to regain access to your ByteStack
              account. Make sure it’s strong and unique to keep your account
              secure!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <div className="flex flex-col items-center mb-6">
                <Logo width="150px" height="35px" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Set a New Password
                </p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-4 w-full">
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium mb-1"
                  >
                    New Password
                  </label>
                  <PasswordInput
                    id="newPassword"
                    name="newPassword"
                    placeholder="••••••••"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.newPassword && formik.errors.newPassword
                        ? formik.errors.newPassword
                        : ""
                    }
                    disabled={resetPasswordMutation.isPending}
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium mb-1"
                  >
                    Confirm Password
                  </label>
                  <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? formik.errors.confirmPassword
                        : ""
                    }
                    disabled={resetPasswordMutation.isPending}
                  />
                </div>

                <LoadingButton
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  isLoading={resetPasswordMutation.isPending}
                  loadingText="Resetting Password..."
                >
                  Reset Password
                </LoadingButton>
              </form>

              <p className="text-sm pt-4 text-center">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
