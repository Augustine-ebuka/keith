
import * as React from "react";
import { XIcon } from "lucide-react";
import * as SheetPrimitive from "@radix-ui/react-dialog";


export function Sheet({
  side = "right",
  trigger,
  children,
}) {
  return (
    <SheetPrimitive.Root>
      <SheetPrimitive.Trigger asChild>
        {trigger}
      </SheetPrimitive.Trigger>
      <SheetPrimitive.Portal>
        <SheetPrimitive.Overlay className="fixed inset-0 z-40 bg-black/50 transition-opacity animate-fadeIn" />
        <SheetPrimitive.Content
          className={`fixed z-50 flex flex-col bg-white shadow-lg transition-transform duration-500 ease-in-out
            ${side === "right" ? "inset-y-0 right-0 w-3/4 sm:max-w-sm" : ""}
            ${side === "left" ? "inset-y-0 left-0 w-3/4 sm:max-w-sm" : ""}
            ${side === "top" ? "inset-x-0 top-0 h-auto border-b" : ""}
            ${side === "bottom" ? "inset-x-0 bottom-0 h-auto border-t" : ""}
          `}
          side={side}
        >
          <SheetPrimitive.Close asChild>
            <button
              className="absolute top-4 right-4 rounded p-2 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </SheetPrimitive.Close>
          {children}
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  );
}

// Sheet Subcomponents
export function SheetHeader({ children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 p-4 ${className}`}>
      {children}
    </div>
  );
}

export function SheetFooter({ children, className = "" }) {
  return (
    <div className={`mt-auto flex flex-col gap-2 p-4 ${className}`}>
      {children}
    </div>
  );
}

export function SheetTitle({ children, className = "" }) {
  return (
    <h2 className={`font-semibold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
}

export function SheetDescription({ children, className = "" }) {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
}

export function SheetContent({ className = "", children, side = "right", ...props }) {
  let sideClasses = "";

  if (side === "right") {
    sideClasses =
      "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm";
  } else if (side === "left") {
    sideClasses =
      "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm";
  } else if (side === "top") {
    sideClasses =
      "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b";
  } else if (side === "bottom") {
    sideClasses =
      "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t";
  }

  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={`bg-background fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 ${sideClasses} ${className}`}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <XIcon className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}