'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useSendMessage } from '@/lib/hooks/useContact';

import { Textarea } from '../ui/textarea';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function ContactForm({ isOpen, setIsOpen }: Props) {
  const [message, setMessage] = useState('');
  const { mutateAsync: sendMessage, isPending: isSending } = useSendMessage();

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setIsOpen(false);
    setMessage('');
    toast.success('We have received your message. Thank you!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription className="text-orange-200">
            You have exceeded your auto-tag limit. Please contact us explaining
            how your experience has been so far to increase your limit.
          </DialogDescription>
        </DialogHeader>

        <div className="">
          <Label htmlFor="message" className="text-right">
            Message
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button
            disabled={isSending || !message}
            onSubmit={handleSubmit}
            onClick={handleSubmit}
            type="submit"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
