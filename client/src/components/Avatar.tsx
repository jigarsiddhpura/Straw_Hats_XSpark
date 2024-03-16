import { Avatar } from "@nextui-org/avatar";
import { User2 } from "lucide-react";

type UserAvatarProps = {
  userImage?: string;
};

export default function UserAvatar({ userImage }: UserAvatarProps) {
  return (
    <div className="flex gap-4 items-center">
      <Avatar
        showFallback
        src={userImage}
        fallback={
          <User2
            className="animate-pulse w-6 h-6 text-default-500"
            fill="currentColor"
            size={20}
          />
        }
      />
    </div>
  );
}
