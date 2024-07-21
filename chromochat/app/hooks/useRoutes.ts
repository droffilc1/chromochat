import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";

import { MdLogout } from "react-icons/md";
import { PiUsersBold, PiChatCircleDotsBold } from "react-icons/pi";

import useConversation from "@/app/hooks/useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: PiChatCircleDotsBold,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: PiUsersBold,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: MdLogout,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
