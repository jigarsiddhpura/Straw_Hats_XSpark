"use client";
import { useState, type FC } from "react";
import { signIn } from "next-auth/react";
import { Icons } from "../icons/index";
import { Button, Spinner } from "@nextui-org/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const loginWithGoogle = async () => {
    console.log("loginWithGoogle");
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        fullWidth
        onClick={loginWithGoogle}
        disabled={isLoading}
        startContent={
          isLoading ? (
            <Spinner className="h-4 w-4 mr-2" />
          ) : (
            <Icons.google className="h-4 w-4 mr-2" />
          )
        }
      >
        Google
      </Button>
    </>
  );
};

export default UserAuthForm;
