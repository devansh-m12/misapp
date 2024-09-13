'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { IMessage } from '@/model/User'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { acceptMessageSchema } from '@/Schema/acceptMessageSchema'
import { useSession } from 'next-auth/react'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Loader2, RefreshCcw, Copy, ChevronDown } from 'lucide-react'
import { MessageCard } from '@/components/MessageCard'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Dashboard() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false)
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null)

  const { toast } = useToast()
  const { data: session } = useSession()

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  })

  const { register, watch, setValue } = form
  const acceptMessages = watch('acceptMessages')

  const fetchAcceptMessages = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages')
      setValue('acceptMessages', response.data?.isAcceptingMessages)
    } catch (error) {
      console.error("Error fetching message status :: ", error)
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: 'Error',
        description: axiosError.response?.data?.message || 'Failed to fetch message status',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [setValue, toast])

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true)
    setIsSwitchLoading(false)
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages')
      setMessages(response.data?.messages || [])
      if (refresh) {
        toast({
          title: 'Refreshed Messages',
          description: 'Messages fetched successfully',
        })
      }
    } catch (error) {
      console.error("Error fetching messages :: ", error)
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: 'Error',
        description: axiosError.response?.data?.message || 'Failed to fetch messages',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  }, [toast])

  useEffect(() => {
    if (!session || !session?.user) {
      return
    }
    fetchAcceptMessages()
    fetchMessages()
  }, [session, setValue, toast, fetchAcceptMessages, fetchMessages])

  const handleSwitchChange = async () => {
    setIsSwitchLoading(true)
    try {
      await axios.post<ApiResponse>('/api/accept-messages', { acceptMessages: !acceptMessages })
      setValue('acceptMessages', !acceptMessages);
      toast({
        title: 'Message status changed',
        description: 'You are now ' + (!acceptMessages ? 'accepting' : 'not accepting') + ' messages',
      })
    } catch (error) {
      console.error("Error changing message status :: ", error)
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: 'Error',
        description: axiosError.response?.data?.message || 'Failed to change message status',
        variant: 'destructive',
      })
    } finally {
      setIsSwitchLoading(false)
    }
  }

  const username = session?.user?.username
  const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}` : ''
  const profileUrl = username ? `${baseUrl}/u/${username}` : ''

  const copyToClipboard = () => {
    if (profileUrl) {
      navigator.clipboard.writeText(profileUrl)
      toast({
        title: 'Copied to clipboard',
        description: 'Profile URL copied to clipboard',
      })
    } else {
      toast({
        title: 'Error',
        description: 'Unable to copy profile URL',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
    if (selectedMessage?._id === messageId) {
      setSelectedMessage(null)
    }
  }

  if (!session || !session?.user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p className="text-2xl">Please Sign in to continue</p>
      </div>
    )
  }

  return (
    <div className=" bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">User Dashboard</h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Unique Link</h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={profileUrl}
              readOnly
              className="flex-grow bg-gray-700 text-white p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button
              onClick={copyToClipboard}
              disabled={!profileUrl}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-r-md"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Message Settings</h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Switch
                  {...register('acceptMessages')}
                  checked={acceptMessages}
                  onCheckedChange={handleSwitchChange}
                  className="data-[state=checked]:bg-purple-600"
                  disabled={isSwitchLoading}
                  style={{ display: 'inline-block', verticalAlign: 'middle' }}
                />
                {isSwitchLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
              </div>
              <span>
                Accept Messages: {acceptMessages ? 'On' : 'Off'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Your Messages</h2>
            <Button
              variant="outline"
              onClick={() => fetchMessages(true)}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCcw className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messages.length > 0 ? (
              messages.map((message) => (
                <MessageCard
                  key={message._id as string}
                  message={message}
                  onMessageDelete={handleDeleteMessage}
                />
              ))
            ) : (
              <p className="text-gray-400 col-span-2 text-center">No messages to display.</p>
            )}
          </div>
        </div>

        {selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h3 className="text-2xl font-semibold mb-4">{selectedMessage.content}</h3>
              <div className="flex justify-between items-center">
                {/* <p className="text-sm text-gray-400">From: {selectedMessage.senderName}</p> */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-gray-700 hover:bg-gray-600 text-white">
                      Actions <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-700 text-white">
                    <DropdownMenuItem onClick={() => handleDeleteMessage(selectedMessage._id as string)}>
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedMessage(null)}>
                      Close
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}