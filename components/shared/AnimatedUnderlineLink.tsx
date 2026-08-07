import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedUnderlineLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function AnimatedUnderlineLink({
  href,
  children,
  className,
}: AnimatedUnderlineLinkProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group/link relative inline-block w-fit text-current",
        "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:after:scale-x-100 hover:after:scale-x-100",
        className,
      )}
    >
      {children}
    </Link>
  );
}
