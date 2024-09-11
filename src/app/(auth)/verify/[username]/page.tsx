'use client'

import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { verifySchema } from '@/Schema/verifySchema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
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

export default function VerifyAccount() {
  const router = useRouter()
  const { toast } = useToast()
  const params = useParams<{ username: string }>()

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: '',
    }
  })

  const onSubmit = async (values: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post('/api/verify-code', {
        username: params.username,
        code: values.code,
      })
      if (response.data.success) {
        toast({
          title: 'Account verified',
          description: 'Your account has been verified. Please login to continue',
          variant: 'default',
        })
      }
      router.replace('/sign-in')
    } catch (error) {
      console.error("Error while verifying code", error)
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: 'Error while verifying code',
        description: axiosError.response?.data.message ?? "Please try again later",
        variant: 'destructive'
      })
    }
  }

  const quotes = [
    "The future belongs to those who believe in the beauty of their dreams.",
    "Innovation distinguishes between a leader and a follower.",
    "The only way to do great work is to love what you do.",
  ]

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100">
      {/* Quotes Section */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="max-w-md">
          {quotes.map((quote, index) => (
            <div key={index} className="mb-8">
              <p className="text-xl font-light italic text-gray-300">"{quote}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* OTP Verification Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">Verify Account</h1>
            <p className="text-gray-400">Enter the code sent to your email to verify your account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">OTP Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your OTP"
                        {...field}
                        className="bg-gray-800 border-gray-700 focus:border-green-500 text-white placeholder-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Account'
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center mt-4">
            <p className="text-gray-400">
              Already verified?{' '}
              <Link href="/sign-in" className="text-green-400 hover:text-green-300 transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}