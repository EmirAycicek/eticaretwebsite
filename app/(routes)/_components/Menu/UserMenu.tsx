"use client";

import useAuthStore from "@/hooks/useAuth";
import React, { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, UserCircle2Icon, UserCircleIcon } from "lucide-react";
import Link from "next/link";

const UserMenu = () => {
  const { jwt, setJwt } = useAuthStore();
  useEffect(() => {
    if (typeof window != "undefined") {
      const jwt = localStorage.getItem("jwt");
      const user = localStorage.getItem("user");
      if (jwt && user) {
        const userObj = JSON.parse(user);
        setJwt(jwt);
      }
    }
  }, []);

  const onSignOut = () => {
    if (typeof window != "undefined") {
      const jwt = localStorage.removeItem("jwt");
      const user = localStorage.removeItem("user");
      setJwt("");
    }
  };
  return (
    <>
      {jwt ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserCircleIcon className="h-6 w-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account cartcurt</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <User />
        </Link>
      )}
    </>
  );
};

export default UserMenu;
