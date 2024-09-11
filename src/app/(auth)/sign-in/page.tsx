'use client'

import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z  from 'zod'
import  {   signInSchema }  from '@/Schema/SignInSchema'
import {
    Form,
    FormControl,
    FormDescription,
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
const SignInAccount = () => {
  const router = useRouter()
  const {toast} = useToast()

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
        description: response?.error,
      })
    }
    if (response?.url) {
      toast({
        title: 'Sign in successful',
        description: 'You have been signed in',
      })
      router.replace('/dashboard')
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or Email</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4">Sign In</Button>
        </form>
      </Form>
      <div className="mt-4 text-sm text-gray-500">
        Don't have an account? <Link href="/sign-up" className="text-blue-500 hover:text-blue-600">Sign Up</Link>
      </div>
    </div>
  )
}

export default SignInAccount