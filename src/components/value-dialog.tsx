"use client";

import { Calculator } from "lucide-react";
import { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface ValueDialogProps {
  currency: string;
  currencyUnit: string;
  value: number;
  onChange: (value: number) => void;
}

export default function ValueDialog({
  currency,
  currencyUnit,
  value,
  onChange,
}: ValueDialogProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseFloat(e.target.value));
    },
    [onChange]
  );

  return (
    <Dialog>
      <DialogTrigger>
        <Calculator className="hover:bg-muted hover:text-muted-foreground size-10 rounded-lg p-2 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Currency Value</DialogTitle>
          <DialogDescription>
            Put the value of the currency {currency} in the input field.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={value.toString()}
            onChange={handleChange}
          />
          <span className="text-muted-foreground font-semibold">
            {currencyUnit}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
