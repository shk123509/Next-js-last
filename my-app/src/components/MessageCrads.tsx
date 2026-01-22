'use client';

import React from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { Trash2, Calendar } from 'lucide-react';
import { toast } from "sonner";
import { motion } from "framer-motion"; // Animation के लिए

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { Apiresponse } from '@/types/ApiResponse';

export default function MessageCard({ message, onMessageDelete }: any) {

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<Apiresponse>(
        `/api/delete-message/${message._id}`
      );
      toast.success(response.data.message);
      onMessageDelete(message._id);
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;
      toast.error(
        axiosError.response?.data.message ?? 'Failed to delete message'
      );
    } 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="p-6">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <p className="text-lg font-medium leading-relaxed text-slate-800 break-words">
                {message.content}
              </p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-slate-400 hover:text-red-500 hover:bg-red-50 shrink-0 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Message?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently remove this message from your dashboard.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteConfirm}
                    className="bg-red-500 hover:bg-red-600 rounded-xl"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <CardFooter className="px-6 py-4 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            {dayjs(message.createdAt).format('MMM D, YYYY • h:mm A')}
          </div>
          
          <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
        </CardFooter>
      </Card>
    </motion.div>
  );
}