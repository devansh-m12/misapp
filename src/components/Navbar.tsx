'use client'

import React from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { User } from 'next-auth'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User as UserIcon, MessageCircle, Menu } from "lucide-react"

export default function Navbar() {
  const { data: session } = useSession()
  const user = session?.user as User
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "FAQ", href: "/#faq" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm border-b border-gray-800 py-4 z-50"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <MessageCircle className="h-8 w-8 text-blue-400" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Mis Message
          </span>
        </Link>

        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-gray-300 hover:text-white transition-colors">
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
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
            <>
              <Link href="/sign-in" passHref>
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up" passHref>
                <Button variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white">
                  Sign up
                </Button>
              </Link>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-gray-800 px-4 py-2"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {!session && (
            <>
              <Link href="/sign-in" className="block py-2 text-gray-300 hover:text-white transition-colors">
                Sign in
              </Link>
              <Link href="/sign-up" className="block py-2 text-blue-400 hover:text-blue-300 transition-colors">
                Sign up
              </Link>
            </>
          )}
        </motion.div>
      )}
    </motion.nav>
  )
}