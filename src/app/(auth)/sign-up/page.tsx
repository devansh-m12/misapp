'use client'
import React, { useState, useEffect } from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'
import Link from 'next/link'
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/Schema/signUpSchema'
import axios , { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
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

const page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const debounced = useDebounceCallback(setUsername, 3000)
  const { toast } = useToast()
  const router = useRouter()

  // zod implementation

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      setIsCheckingUsername(true)
      setUsernameMessage('')
      try {
        const res = await axios.get(`/api/check-username-unique?username=${username}`)
        setUsernameMessage(res.data.message)
      }
      catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        setUsernameMessage(axiosError.response?.data.message ?? "Something went wrong while checking username")
      }
      finally {
        setIsCheckingUsername(false)
      }
    }
    checkUsernameUnique()
  }, [username])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
      const res = await axios.post('/api/sign-up', data)
      toast({
        title: 'Account created successfully',
        description: 'Please check your email for verification',
        variant: 'default'
      })
      router.replace(`/verify/${username}`)
      setIsSubmitting(false)
    }
    catch (error) {
      console.log("Error while signing up",error)
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: 'Something went wrong',
        description: axiosError.response?.data.message ?? "Please try again later",
        variant: 'destructive'
      })
    }
    finally {
      setIsSubmitting(false)
    }
  }

  

  return (
    <div>
      <div>
        <div>
          <h1>Sign Up</h1>
          <p>Create an account to get started</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* username field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username"
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e)
                      debounced(e.target.value)
                    }}
                    />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <p
                      className={`text-sm ${
                        usernameMessage === 'Username is unique'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email"
                    {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password"
                    type="password"
                    {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page