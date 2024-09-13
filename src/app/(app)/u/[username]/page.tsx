'use client'

import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { messageSchema } from '@/Schema/messageSchema'
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
import { Loader2, Send, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useCompletion } from 'ai/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function EnhancedMessageForm() {
  const router = useRouter()
  const { toast } = useToast()
  const params = useParams<{ username: string }>()


  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
  } = useCompletion({
    api: '/api/suggest-messages',
    onError: (error) => {
      console.error('Error in useCompletion:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch suggested messages. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const parseStringMessages = (messageString: string): string[] => {
    return messageString.split('||');
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete('');
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch suggested messages. Please try again.',
        variant: 'destructive',
      })
    }
  };

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: '',
    }
  })

  const onSubmit = async (values: z.infer<typeof messageSchema>) => {
    try {
      const response = await axios.post('/api/send-message', {
        username: params.username,
        content: values.content,
      })
      if (response.data.success) {
        toast({
          title: 'Message sent',
          description: 'Your message has been sent. Please wait for a response.',
          variant: 'default',
        })
      }
      router.replace('/u/' + params.username)
    } catch (error) {
      console.error("Error while sending message", error)
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: 'Error while sending message',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex flex-col md:flex-row">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-1/2 p-8 flex flex-col justify-center"
      >
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Inspirational Quotes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded-md border border-gray-700 p-4">
              {quotes.map((quote, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="mb-4"
                >
                  <p className="text-lg font-light italic text-gray-300">&quot;{quote}&quot;</p>
                </motion.div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:w-1/2 p-8 flex items-center justify-center"
      >
        <Card className="w-full max-w-md bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Send Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="compose" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="compose">Compose</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              </TabsList>
              <TabsContent value="compose">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Message</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your message"
                              {...field}
                              className="bg-gray-700 border-gray-600 focus:border-green-500 text-white placeholder-gray-400"
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
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="suggestions">
                <div className="space-y-4">
                  <Button
                    onClick={fetchSuggestedMessages}
                    className="w-full"
                    disabled={isSuggestLoading}
                  >
                    {isSuggestLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Suggest Messages
                  </Button>
                  <ScrollArea className="h-[200px] w-full rounded-md border border-gray-700 p-4">
                    <AnimatePresence>
                      {parseStringMessages(completion).map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                          className="mb-2"
                        >
                          <Badge
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => form.setValue('content', message)}
                          >
                            {message}
                          </Badge>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
            <div className="text-center mt-6">
              <p className="text-gray-400">
                Want to get an account yourself?{' '}
                <Link href={`/sign-up`} className="text-green-400 hover:text-green-300 transition-colors duration-200">
                  Sign Up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}