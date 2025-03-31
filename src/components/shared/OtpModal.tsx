import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { otpSchema } from "../../utils/validation/schemas";
import { sendOtp, signup } from "../../service/client/api/clientApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { clearSignupData } from "../../redux/slices/authSlice";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "@/types/error";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const signupData = useSelector((state: RootState) => state.auth.signupData);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      if (!signupData) return;
      try {
        const response = await signup({ ...signupData, otp: values.otp });
        if (response.success) {
          toast.success("Signup successful!");
          dispatch(clearSignupData());
          onClose();
          navigate("/login");
        }
      } catch (error: unknown) {
        formik.setErrors({
          otp: (error as ErrorResponse).response?.data?.message || "Invalid OTP",
        });
      }
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      setTimer(30);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isResendDisabled, timer]);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (/\d/.test(value) || value === "") {
      const otpArray = formik.values.otp.split("").slice(0, 6);
      otpArray[index] = value;
      const newOtp = otpArray.join("");
      formik.setFieldValue("otp", newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !formik.values.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      formik.setFieldValue("otp", pasteData);
      pasteData.split("").forEach((char, i) => {
        if (inputRefs.current[i]) {
          inputRefs.current[i]!.value = char;
        }
      });
    }
  };

  const handleResendOtp = async () => {
    if (!signupData?.email) return;

    try {
      const resendPromise = sendOtp(signupData.email, "resend-otp");

      const response = await toast.promise(resendPromise, {
        loading: "Sending OTP...",
        success: "New OTP has been sent to your email.",
        error: (err) => err.response?.data?.message || "Failed to resend OTP",
      });

      console.log(response);
      if (response) {
        setIsResendDisabled(true);
      }
    } catch (error: unknown) {
      console.error("Resend OTP error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] dark:bg-black dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-center">Verify OTP</DialogTitle>
          <DialogDescription className="text-xs pt-4 text-center text-gray-500 dark:text-gray-400">
            We’ve sent a 6-digit OTP to{" "}
            <span className="font-semibold">
              {signupData?.email || "your email"}
            </span>
            .<br />
            This OTP is valid for{" "}
            <span className="font-semibold">3 minutes</span>
            <br />
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex justify-center space-x-2" onPaste={handlePaste}>
            {[...Array(6)].map((_, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-xl border rounded-md dark:bg-black dark:text-white"
                value={formik.values.otp[index] || ""}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          {formik.touched.otp && formik.errors.otp && (
            <span className="text-red-500 text-sm">{formik.errors.otp}</span>
          )}
          <Button
            type="submit"
            className="w-full bg-black text-white dark:bg-white dark:text-black"
          >
            Verify & Sign Up
          </Button>
          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={handleResendOtp}
              disabled={isResendDisabled}
              className="text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Resend OTP {isResendDisabled && `(${timer}s)`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
