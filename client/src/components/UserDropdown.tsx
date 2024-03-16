"use client";

import { cn } from "@/lib/utils/ui";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { LogOutIcon, Settings, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function UserDropdown() {
  const iconClasses =
    "text-xl h-5 w-15 text-default-500 pointer-events-none flex-shrink-0";
  const { data } = useSession();

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            isBordered
            showFallback
            as="button"
            size="sm"
            className="transition-transform flex place-items-center justify-center hover:scale-105"
            src={data?.user?.image || undefined}
            fallback={<User2 />}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Dropdown menu with description">
          <DropdownSection title="Actions" showDivider>
            <DropdownItem
              key="edit"
              shortcut="⌘⇧E"
              description="Edit account details"
              startContent={<User name="" className={iconClasses} />}
            >
              Profile
            </DropdownItem>
            <DropdownItem
              key="settings"
              shortcut="⌘⇧S"
              description="Change preferences"
              startContent={
                <Settings
                  name=""
                  className={cn(iconClasses, "ml-2 mr-5 text-5xl")}
                />
              }
            >
              Settings
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Danger zone">
            <DropdownItem
              key="delete"
              className="text-danger-200"
              color="danger"
              shortcut="⌘⇧D"
              description="Sign out from your account"
              startContent={<LogOutIcon className={iconClasses} />}
              onClick={() =>
                signOut({ callbackUrl: `${window.localStorage[origin]}/login` })
              }
            >
              Logout
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
