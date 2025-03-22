import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "sonner";
import { forgotPassword } from "@/service/client/api/authApi";
import { forgotPasswordSchema } from "@/utils/validation/schemas";
import { Navbar } from "@/components/client/layouts/Navbar";
import { Footer } from "@/components/client/layouts/Footer";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/Logo";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      if (response.success) {
        toast.success(
          response.message || "Password reset link sent to your email"
        );
        setTimeout(() => navigate("/login"), 3000);
      }
    },
    onError: (error: any) => {
      formik.setErrors({
        email: error.response?.data?.message || "Failed to send reset email",
      });
      toast.error(
        error.response?.data?.message || "Failed to send reset email"
      );
    },
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      forgotPasswordMutation.mutate(values.email);
    },
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col dark:bg-black dark:text-white">
        <main className="flex-1 grid md:grid-cols-2 gap-8 p-6 md:p-12 dark:bg-transparent dark:text-white">
          <div className="md:flex hidden flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Forgot Your Password? <br /> We’ve Got You Covered!
            </h1>
            <p className="text-base mb-6">
              Enter your email below, and we’ll send you a secure link to reset
              your password. Get back to exploring ByteStack’s tech blogs,
              discussions, and more in no time!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <div className="flex flex-col items-center mb-6">
                <Logo width="150px" height="35px" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Reset Your ByteStack Password
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
                    disabled={forgotPasswordMutation.isPending}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="text-red-500 text-sm">
                      {formik.errors.email}
                    </span>
                  )}
                </div>

                <LoadingButton
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  isLoading={forgotPasswordMutation.isPending}
                  loadingText="Sending Reset Link..."
                >
                  Send Reset Link
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
