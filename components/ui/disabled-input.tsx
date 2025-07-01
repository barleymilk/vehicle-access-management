"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DisabledInputProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  required?: boolean;
}

export function DisabledInput({
  id,
  label,
  placeholder,
  value,
  required = false,
}: DisabledInputProps) {
  return (
    <div className="flex gap-2 mb-6">
      <Label htmlFor={id} className="w-22 flex-shrink-0 text-md font-semibold">
        {label}
        {required && "*"}
      </Label>
      <Input
        disabled
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        className="rounded-full"
      />
    </div>
  );
}
