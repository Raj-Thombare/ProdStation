"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

interface CustomToasterProps extends ToasterProps {}

const Toaster: React.FC<CustomToasterProps> = (props) => {
  const { theme: currentTheme = "system" } = useTheme();

  // Ensure the theme is one of the allowed values
  const theme: "system" | "light" | "dark" | undefined =
    currentTheme === "light" || currentTheme === "dark"
      ? currentTheme
      : "system";

  return (
    <Sonner
      theme={theme}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            "group border-2 border-b-4 border-r-4 border-black rounded-none toast group-[.toaster]:bg-primary group-[.toaster]:text-foreground group-[.toaster]:border-black group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
