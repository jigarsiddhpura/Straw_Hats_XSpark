"use client";
import React from "react";
import ColorModeSwitchButton from "./ColorModeSwitchButton";
import UserDropdown from "./UserDropdown";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icons/EyeSlashFilledIcon";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  cn,
  Divider,
} from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/NavigationMenu";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Icons } from "./icons/index";
import { link as linkStyles } from "@nextui-org/theme";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import { AirplayIcon } from "lucide-react";
import UserAuthForm from "@/components/auth/UserAuthForm";

import NextLink from "next/link";
import clsx from "clsx";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
} from "@nextui-org/react";
import {
  TwitterIcon,
  GithubIcon,
  InstaIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons/icons";
import { Logo } from "@/components/icons/icons";
import { useSession } from "next-auth/react";
import SignIn from "@/components/auth/SignInWrapper";
import { Sign } from "crypto";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:opacity-80 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-zinc-400 ">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export const Navbar = () => {
  const { status, data } = useSession();
  const navItems = [
  ];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const generateMeet = async () => {
    const promiseToast = toast.loading("Generating meeting...");
    const uuid = uuidv4();
    try {
      await new Promise((resolve) => setTimeout(resolve, 6000)); // 1 second delay
      // Resolve the loading toast
      toast.dismiss(promiseToast);

      toast.success("Success! Copied to clipboard");
    } catch (error) {
      // Handle any errors that occur during the process
      toast.error("Failed to meeting.");
    } finally {
      router.push(`/meet/0db6b655-f17c-4a14-ac97-cb3bf3d98f88`);
      navigator.clipboard.writeText("0db6b655-f17c-4a14-ac97-cb3bf3d98f88");
    }
  };

  const joinMeet = async (
    e: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent
  ) => {
    if (e.key !== "Enter") {
      return;
    }
    const promiseToast = toast.loading("Joining meeting...");
    const uuid = uuidv4();
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
      // Resolve the loading toast
      toast.dismiss(promiseToast);

      toast.success("Meeting joined successfully!");
    } catch (error) {
      // Handle any errors that occur during the process
      toast.error("Failed to join meeting.");
    } finally {
      console.log("asdasd");
      router.push(`/meet/0db6b655-f17c-4a14-ac97-cb3bf3d98f88`);
    }
  };

  const searchInput = (
    <Input
      aria-label="Search"
      onKeyDown={(e) => joinMeet(e)}
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Enter meet link..."
      startContent={
        <div className="cursor-pointer">
          <SearchIcon className="text-base text-zinc-400 hover:scale-105  flex-shrink-0" />
        </div>
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" shouldHideOnScroll isBordered className="mb-2 w-full">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ReferMe</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-normal"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
        <NavbarItem className="hidden lg:flex">
          {!data?.user || data?.user?.role === "student"
            ? searchInput
            : pathname !== "/meet/0db6b655-f17c-4a14-ac97-cb3bf3d98f88" && (
                <Button onClick={generateMeet}>Generate meet</Button>
              )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
   
        <NavbarItem className="hidden sm:flex gap-2 ">
          <Link isExternal href={""} aria-label="Twitter">
            <TwitterIcon className="text-default-500 hover:text-blue-400" />
          </Link>
          <Link isExternal href={""} aria-label="Discord">
            <InstaIcon className="text-default-500 hover:text-pink-400" />
          </Link>
          <ColorModeSwitchButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link>{item.label}</Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>

      <NavbarItem className="ml-10">
        {status === "authenticated" ? (
          <UserDropdown />
        ) : (
          <div>
            <Button as={Link} onPress={onOpen} variant="faded" className="mx-3">
            Login
          </Button>
            <Button as={Link} onPress={onOpen} variant="faded">
            Sign up
          </Button>
          </div>
        )}
      </NavbarItem>

      {/* login modal below */}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="container mx-auto flex my-5 py-3 w-full flex-col justify-center space-y-6 sm:w-[400px]">
                  <div className="flex flex-col space-y-2 text-center">
                    <AirplayIcon className="mx-auto h-6 w-6" />
                    <h1 className="text-2xl font-semibold tracking-tight">
                      Welcome back
                    </h1>
                    <p className="text-sm max-w-xs pb-3 mx-auto">
                      By continuing, you are setting up an account and agree to
                      our User Agreement and Privacy Policy.
                    </p>
                  </div>
                </div>
                <Input
                  autoFocus
                  // endContent={
                  //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  labelPlacement="outside"
                />
                <Input
                  // endContent={
                  //   <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Password"
                  placeholder="Enter your password"
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  labelPlacement="outside"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link className="text-purple-500" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
                <Divider className="text-lime-400" />
                <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                  <UserAuthForm />
                  
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </NextUINavbar>
  );
};
