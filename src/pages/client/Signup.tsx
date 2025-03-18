import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { signupSchema } from "@/utils/validation/schemas";
import { Input } from "@/components/ui/input";
import { sendOtp } from "@/service/client/api/authApi";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { SocialButton } from "@/components/shared/SocialButton";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData } from "@/redux/slices/authSlice";
import { OtpModal } from "@/components/shared/OtpModal";
import { Navbar } from "@/components/client/layouts/Navbar";
import { Logo } from "@/components/shared/Logo";
import { RootState } from "@/redux/store";
import { Footer } from "@/components/client/layouts/Footer";

export default function Signup() {
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const signupData = useSelector((state: RootState) => state.auth.signupData);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        if (signupData) {
          setIsOtpModalOpen(true);
          return;
        }
        const response = await sendOtp(values.email, "otp");
        if (response.success) {
          dispatch(
            setSignupData({
              name: values.name,
              email: values.email,
              password: values.password,
              otpShared: true,
            })
          );
          setIsOtpModalOpen(true);
        }
      } catch (error: any) {
        formik.setErrors({
          email: error.response?.data?.message || "Failed to send OTP",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 grid md:grid-cols-2 gap-8 p-6 md:p-12 dark:bg-black dark:text-white">
          <div className="md:flex hidden flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Join ByteStack —<br />
              From Bits to Epic Bytes!
            </h1>
            <p className="text-base mb-6">
              Become part of the ultimate tech community! Sign up to explore
              premium blogs on cybersecurity, AI, software, hardware, and
              beyond. Share your expertise, engage in real-time discussions, and
              start earning Bits for your contributions. With a 7-day free
              trial, there's no better time to stack your tech wisdom. Let's get
              started!
            </p>
            <p className="text-sm italic mb-4">
              Enjoy a 7-day free trial with full access—subscribe later for
              $15/month or $120/year!
            </p>
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Log In
              </Link>{" "}
              to continue!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <div className="flex flex-col items-center mb-6">
                <Logo width="150px" height="35px" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Create Your ByteStack Account
                </p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-4 w-full">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border rounded-md p-2"
                    disabled={isLoading}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <span className="text-red-500 text-sm">
                      {formik.errors.name}
                    </span>
                  )}
                </div>

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
                    disabled={isLoading}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="text-red-500 text-sm">
                      {formik.errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1"
                  >
                    Password
                  </label>
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                </div>

                <LoadingButton
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  isLoading={isLoading}
                  loadingText="Creating Account..."
                >
                  Create Account
                </LoadingButton>

                <div className="flex gap-4 mt-4">
                  <SocialButton
                    icon={<Github className="h-5 w-5" />}
                    text="GitHub"
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                </div>
              </form>

              <OtpModal
                isOpen={isOtpModalOpen}
                onClose={() => setIsOtpModalOpen(false)}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
