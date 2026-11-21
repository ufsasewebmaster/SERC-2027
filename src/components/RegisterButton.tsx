"use client";

import { openTicket } from "./ticket-events";

export default function RegisterButton({
  children = "Register now",
  className = "bg-star",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={openTicket} className={`btn text-lg ${className}`}>
      {children}
    </button>
  );
}
