'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { messageSchema } from '@/schema/messagesSchem'
import { Apiresponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Loader2, Send, Sparkles } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod';

const PageContent = () => {
  const params = useParams<{ username: string }>();
  const username = params.username;
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSuggestLoading, setIsSuggestLoading] = useState(false)
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([
    "What's your dream job?",
    "Tell me a secret!",
    "How's your day going?"
  ])

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: '' },
  })

  // AI Suggested Messages fetch karne ka function
  const fetchSuggestedMessages = async () => {
    try {
      setIsSuggestLoading(true)
      const response = await fetch('/api/suggest-messages', { method: 'POST' });
      
      if (!response.ok) throw new Error("Failed to fetch suggestions");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullText = "";

      while (!done) {
        const { value, done: doneReading } = await reader!.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        fullText += chunkValue;
      }

      // Backend se questions 'Q1||Q2||Q3' format mein aa rahe hain
      const messagesArray = fullText.split('||').map(msg => msg.trim());
      setSuggestedMessages(messagesArray);
      
    } catch (error) {
      toast.error("Could not get AI suggestions. Try again.");
      console.error("AI Suggestion Error:", error);
    } finally {
      setIsSuggestLoading(false)
    }
  }

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      setIsLoading(true)
      const response = await axios.post('/api/send-message', {
        ...data,
        username
      })
      toast.success(response.data.message || "Message sent successfully!")
      form.reset();
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;
      toast.error(axiosError.response?.data?.message ?? "Failed to send Message");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto my-10 p-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Public Profile Link</h1>
      
      <Card className="shadow-md border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="text-xl">Send Anonymous Message to @{username}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write your anonymous message here..."
                        className="resize-none min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button type="submit" disabled={isLoading || !form.watch('content')}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Send It
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Suggested Messages Section */}
      <div className="mt-12 space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Suggested Messages</h3>
            <Button 
              onClick={fetchSuggestedMessages} 
              variant="outline" 
              size="sm"
              disabled={isSuggestLoading}
              className="bg-secondary/50"
            >
              {isSuggestLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-orange-500" />}
              Ask AI
            </Button>
          </div>
          
          <Card>
            <CardHeader>
                <p className="text-sm text-muted-foreground">Click on any message below to select it.</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {suggestedMessages.map((msg, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="justify-start text-left h-auto py-3 px-4 whitespace-normal"
                  onClick={() => form.setValue('content', msg)}
                >
                  {msg}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PageContent;