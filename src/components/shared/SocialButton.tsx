import React from "react";
import { Button } from "@/components/ui/button";

interface SocialButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  disabled: boolean;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  text,
  disabled,
  onClick,
}) => (
  <Button
    variant="outline"
    disabled={disabled}
    className="flex-1 flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
    onClick={onClick}
  >
    {icon}
    {text}
  </Button>
);
