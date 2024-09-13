'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signInSchema } from '@/Schema/SignInSchema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export default function SignInAccount() {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    }
  })

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const response = await signIn('credentials', {
      identifier: values.identifier,
      password: values.password,
      redirect: false,
    })
    if (response?.error) {
      toast({
        title: 'Sign in failed',
        description: response.error,
        variant: 'destructive',
      })
    }
    if (response?.url) {
      toast({
        title: 'Welcome back!',
        description: `You&apos;ve successfully signed in.`,
        variant: 'default',
      })
      router.replace('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Sign In</h1>
          <p className="text-gray-400">Welcome back to the future</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Username or Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="cooluser123 or you@example.com"
                      className="bg-gray-700 border-gray-600 focus:border-cyan-500 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Password</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="password" 
                      placeholder="••••••••"
                      className="bg-gray-700 border-gray-600 focus:border-cyan-500 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}