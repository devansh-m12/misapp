'use client'

import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z  from 'zod'
import  {   verifySchema }  from '@/Schema/verifySchema'
import axios, { AxiosError } from 'axios'
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
import Link from 'next/link'

const VerifyAccount = () => {
    const router = useRouter()
    const {toast} = useToast()
    const params = useParams<{username: string}>()

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
                    description: 'Your account has been verified, Please login to continue',
                    variant: 'default',
                })
            }
            router.replace('/sign-in')
        } catch (error) {
            console.log("Error while verifying code",error)
            const axiosError = error as AxiosError<ApiResponse>
            toast({
                title: 'Error while verifying code',
                description: axiosError.response?.data.message ?? "Please try again later",
                variant: 'destructive'
            })
        }
    }

    return (
    <>
        <div>
            <div>
                <h1>Verify Account</h1>
                <p>Enter the code sent to your email to verify your account</p>
            </div>
            <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* username field */}
            
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Otp Code</FormLabel>
                  <FormControl>
                    <Input placeholder="email"
                    {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" >
              Submit
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
    </>
    )
}

export default VerifyAccount