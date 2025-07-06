"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface ClearableInputProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (inputValue: string) => void;
  type?: "text" | "number" | "email" | "tel";
  disabled?: boolean;
  required?: boolean;
}

export function ClearableInput({
  id,
  label,
  placeholder = "",
  value,
  onChange,
  type = "text",
  disabled = false,
  required = false,
}: ClearableInputProps) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="flex gap-2 mb-2">
      <Label htmlFor={id} className="w-22 flex-shrink-0 text-md font-semibold">
        {label}
        {required && "*"}
      </Label>
      <div className="relative w-full">
        <Input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="rounded-full pr-12 placeholder:text-sm placeholder:text-gray-400"
        />
        {value && !disabled && (
          <Button
            variant="ghost"
            className="absolute right-2 top-0 h-full rounded-full"
            onClick={handleClear}
            tabIndex={-1}
          >
            <X />
          </Button>
        )}
      </div>
    </div>
  );
}
