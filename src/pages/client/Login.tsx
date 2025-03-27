import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "sonner";
import { Github } from "lucide-react";
import { setUser } from "@/redux/slices/authSlice";
import { signin } from "@/service/client/api/authApi";
import { loginSchema } from "@/utils/validation/schemas";
import { Navbar } from "@/components/client/layouts/Navbar";
import { Footer } from "@/components/client/layouts/Footer";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { SocialButton } from "@/components/shared/SocialButton";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/Logo";
import { ErrorResponse } from "@/types/error";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signinMutation = useMutation({
    mutationFn: signin,
    onSuccess: (response) => {
      console.log(response);
      if (response.success) {
        dispatch(setUser(response.user));
        toast.success(response.message);
        navigate("/dashboard");
      }
    },
    onError: (error: ErrorResponse) => {
      formik.setErrors({
        email: error.response?.data?.message || "Login failed",
      });
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      signinMutation.mutate(values);
    },
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col dark:bg-black dark:text-white">
        <main className="flex-1 grid md:grid-cols-2 gap-8 p-6 md:p-12 dark:bg-transparent dark:text-white">
          <div className="md:flex hidden flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Welcome Back to <br /> ByteStack!
            </h1>
            <p className="text-base mb-6">
              Ready to dive back into the tech world? Log in to explore
              cutting-edge blogs on cybersecurity, AI, software, hardware, and
              more. Pick up where you left off—share your insights, join
              real-time discussions, and keep earning Bits. Let’s stack those
              epic bytes together!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <div className="flex flex-col items-center mb-6">
                <Logo width="150px" height="35px" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Log in to Your ByteStack Account
                </p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-4 w-full">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border rounded-md p-2"
                    disabled={signinMutation.isPending}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="text-red-500 text-sm">
                      {formik.errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium"
                      >
                        Password
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                  <PasswordInput
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : ""
                    }
                    disabled={signinMutation.isPending}
                  />
                </div>

                <LoadingButton
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  isLoading={signinMutation.isPending}
                  loadingText="Logging In..."
                >
                  Log In
                </LoadingButton>

                <div className="flex gap-4 mt-4">
                  <SocialButton
                    icon={<Github className="h-5 w-5" />}
                    text="GitHub"
                    disabled={signinMutation.isPending}
                  />
                  <SocialButton
                    icon={
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                    }
                    text="Google"
                    disabled={signinMutation.isPending}
                  />
                </div>
              </form>
              <p className="text-sm pt-4 text-center">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Sign Up
                </Link>{" "}
                now!
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
