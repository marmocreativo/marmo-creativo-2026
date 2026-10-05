"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface NavDropdownItem {
  label: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: NavDropdownItem[];
}

export function NavDropdown({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors">
        {label}
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute left-0 top-full pt-2 w-60">
          <div className="border border-white/15 bg-black shadow-xl p-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}