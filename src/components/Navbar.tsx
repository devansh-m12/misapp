'use client'
import React from "react"
import Link from "next/link"
import {useSession, signOut} from "next-auth/react"
import {User} from 'next-auth'

function Navbar() {
    const {data: session} = useSession()
    const user = session?.user as User
    console.log(user,"user")

    return (
        <nav className="bg-white border-b-2 border-gray-100 py-2.5">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a href="/">
                    Mis Message
                </a>
                {
                    session ? (
                        <div>
                            <p>Hello, {user?.username || user?.email}</p>
                            <button onClick={() => signOut()}>Sign out</button>
                        </div>
                    ) : (
                        <Link href="/sign-in">
                            <button>Sign in</button>
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar
