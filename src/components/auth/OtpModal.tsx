import React from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { otpSchema } from "../../utils/validation/schemas";
import { signup } from "../../service/client/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { clearSignupData } from "../../redux/slices/authSlice";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ToDO: Implement OtpModal ------------------------------------------

export const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const signupData = useSelector((state: RootState) => state.auth.signupData);

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      if (!signupData) return;
      try {
        const response = await signup({ ...signupData, otp: values.otp });
        if (response.success) {
          alert("Signup successful!");
          dispatch(clearSignupData());
          onClose();
        }
      } catch (error: any) {
        formik.setErrors({
          otp: error.response?.data?.message || "Invalid OTP",
        });
      }
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] dark:bg-black dark:text-white">
        <DialogHeader>
          <DialogTitle>Verify OTP</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <Input
              id="otp"
              name="otp"
              placeholder="Enter 6-digit OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full"
            />
            {formik.touched.otp && formik.errors.otp && (
              <span className="text-red-500 text-sm">{formik.errors.otp}</span>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-black text-white dark:bg-white dark:text-black"
          >
            Verify & Sign Up
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
