'use client';

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { RefreshCcw, Loader2, Copy, Inbox, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import MessageCard from "@/components/MessageCrads";
import { Apiresponse } from "@/types/ApiResponse";
import { AcceptMessageSchema } from "@/schema/acceptedmessageSchem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type MessageType = {
  _id: string;
  content: string;
  createdAt: string | Date;
};

export default function DashboardPage() {
  const { data: session } = useSession();

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  /* ✅ FIX 1: defaultValues added */
  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
    defaultValues: {
      acceptedMessage: false,
    },
  });

  const { watch, setValue } = form;
  const acceptMessages = watch("acceptedMessage");

  const fetchAcceptMessageStatus = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const res = await axios.get<Apiresponse>("/api/accepted-message-get-chk");
      setValue("acceptedMessage", res.data.isAcceptingMessages ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to fetch settings"
      );
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(async (refresh?: boolean) => {
    setIsLoading(true);
    try {
      const res = await axios.get<Apiresponse>("/api/get-message");
      setMessages(res.data.messages || []);
      if (refresh) toast.success("Refreshed messages");
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to load messages"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg._id !== id));
  };

  /* ✅ FIX 2: checked value use */
  const handleSwitchChange = async (checked: boolean) => {
    setIsSwitchLoading(true);
    try {
      const res = await axios.post<Apiresponse>("/api/accepted-messages", {
        acceptMessages: checked,
      });

      setValue("acceptedMessage", checked);
      toast.success(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to update status"
      );
    } finally {
      setIsSwitchLoading(false);
    }
  };

  useEffect(() => {
    if (!session?.user) return;
    fetchAcceptMessageStatus();
    fetchMessages();
  }, [session, fetchAcceptMessageStatus, fetchMessages]);

  if (!session?.user) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground">
            Please login to view your dashboard.
          </p>
        </div>
      </div>
    );
  }

  const { username } = session.user;
  const profileUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/u/${username}`
      : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <LayoutDashboard className="w-8 h-8" />
          User Dashboard
        </h1>

        <Button
          variant="outline"
          size="icon"
          onClick={() => fetchMessages(true)}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Unique Feedback Link</CardTitle>
          <CardDescription>
            Share this link to receive anonymous messages
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <input
            readOnly
            value={profileUrl}
            className="flex-1 border px-3 py-2 rounded"
          />
          <Button onClick={copyToClipboard}>
            <Copy className="h-4 w-4 mr-1" /> Copy
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center p-4 border rounded mb-6">
        <div>
          <h3 className="font-semibold">Accepting Messages</h3>
          <p className="text-sm text-muted-foreground">
            {acceptMessages
              ? "People can send you messages."
              : "Not accepting new messages."}
          </p>
        </div>

        <Switch
          checked={acceptMessages}
          disabled={isSwitchLoading}
          onCheckedChange={handleSwitchChange}
        />
      </div>

      <Separator className="my-6" />

      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Inbox className="h-6 w-6" />
        Inbox
      </h2>

      {messages.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {messages.map(msg => (
            <MessageCard
              key={msg._id}
              message={msg}
              onMessageDelete={handleDeleteMessage}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center">
          No messages yet
        </p>
      )}
    </div>
  );
}
