'use client'

import React from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { User } from 'next-auth'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User as UserIcon } from "lucide-react"

export default function Navbar() {
  const { data: session } = useSession()
  const user = session?.user as User

  return (
    <nav className="bg-gray-900 border-b border-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Mis Message
        </Link>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <UserIcon className="mr-2 h-4 w-4" />
                {user?.username || user?.email}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 text-gray-100 border-gray-700">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-red-400 focus:text-red-400 focus:bg-gray-700"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/sign-in" passHref>
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </nav>
  )
}