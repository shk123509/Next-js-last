'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { signIn } from "next-auth/react";
import { signInSchema } from "@/schema/singinSchem";

const LoginPage = () => {
  const router = useRouter();

  const [userMessages, setUserMessages] = useState("");
  const [isSubmitButton, setIsSubmitButton] = useState(false);

  // Zod + react-hook-form
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      setIsSubmitButton(true);
      setUserMessages("");

      // ⚡ NextAuth credentials provider call
      const res = await signIn("credentials", {
        redirect: false,
        identifier: data.email,   // backend expects identifier (email/username)
        password: data.password,
      });

      if (res?.error) {
        setUserMessages(res.error || "Invalid email or password.");
        setIsSubmitButton(false);
        return;
      }

      // success
      setUserMessages("Login successful!");
      router.push("/dashbord");
      router.refresh();

    } catch (error) {
      setUserMessages("Something went wrong.");
      setIsSubmitButton(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-gray-900">
            Join True Feedback
          </h1>
          <p className="mb-4 text-gray-600">
            Sign in to start your anonymous adventure
          </p>

          {userMessages && (
            <div
              className={`p-3 rounded-md mb-4 text-sm font-medium ${
                userMessages.includes("successful")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {userMessages}
            </div>
          )}
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-gray-900"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email or Username</FormLabel>
                  <Input
                    placeholder="Enter email or username"
                    className="text-black"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="text-black"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitButton}>
              {isSubmitButton ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4 text-gray-600">
          <p>
            Not a member?{" "}
            <Link
              href="/sign-up"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
