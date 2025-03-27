import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "sonner";
import { setAdmin } from "@/redux/slices/adminAuthSlice";
import { adminSignin } from "@/service/admin/api/adminApi";
import { loginSchema } from "@/utils/validation/schemas";
import { Navbar } from "@/components/client/layouts/Navbar";
import { Footer } from "@/components/client/layouts/Footer";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/Logo";
import { ErrorResponse } from "@/types/error";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signinMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      adminSignin(email, password),
    onSuccess: (response) => {
      if (response.success && response.admin) {
        dispatch(setAdmin(response.admin));
        toast.success(response.message);
        navigate("/admin");
      }
    },
    onError: (error: ErrorResponse) => {
      formik.setErrors({
        email: error.response?.data?.message || "Admin login failed",
      });
      toast.error(error.response?.data?.message || "Admin login failed");
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
        <main className="flex-1 grid  p-6 dark:bg-transparent dark:text-white">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <div className="flex flex-col items-center mb-6">
                <Logo width="150px" height="35px" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Log in to Your ByteStack Admin Account
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
                    placeholder="admin@example.com"
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
                  Log In as Admin
                </LoadingButton>
              </form>
              <p className="text-sm pt-4 text-center">
                Not an admin?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Log in as a user
                </Link>{" "}
                instead!
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
