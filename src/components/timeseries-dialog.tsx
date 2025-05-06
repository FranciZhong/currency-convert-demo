"use client";

import { TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface TimeseriesDialogProps {
  currency: string;
}

export default function TimeseriesDialog({ currency }: TimeseriesDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <TrendingUp className="hover:bg-muted hover:text-muted-foreground size-10 rounded-lg p-2 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Trending</DialogTitle>
          <DialogDescription>
            This is the time series of the currency {currency}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex min-h-36 w-full flex-col items-center justify-center gap-4">
          <div>TODO</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
