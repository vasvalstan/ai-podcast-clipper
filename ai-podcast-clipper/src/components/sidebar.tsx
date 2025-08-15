"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Calendar,
  CheckCircle2,
  Clock4,
  FileText,
  LayoutGrid,
  ListChecks,
  PencilLine,
  PlaySquare,
  Settings,
  Upload,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "~/lib/utils";

type SidebarProps = {
  credits: number;
  email: string;
};

export default function Sidebar({ credits, email }: SidebarProps) {
  const pathname = usePathname();

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="mt-6">
      <div className="text-muted-foreground px-3 text-xs font-semibold uppercase">
        {title}
      </div>
      <div className="mt-2 space-y-1">{children}</div>
    </div>
  );

  const NavItem = ({
    href,
    icon: Icon,
    label,
    disabled,
  }: {
    href: string;
    icon: React.ElementType;
    label: string;
    disabled?: boolean;
  }) => {
    const isActive = href !== "#" && pathname.startsWith(href);
    return (
      <Button
        asChild
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "mx-2 w-[calc(100%-1rem)] justify-start gap-2 px-2 py-2 text-xs",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <Link aria-disabled={disabled} href={href}>
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      </Button>
    );
  };

  return (
    <aside className="bg-background flex h-screen w-64 flex-col border-r text-[13px]">
      <div className="flex items-center gap-2 px-4 py-4">
        <Link href="/dashboard" className="flex items-center">
          <div className="font-sans text-xl font-medium tracking-tight">
            <span className="text-foreground">post</span>
            <span className="font-light text-gray-500">/</span>
            <span className="text-foreground font-light">social</span>
          </div>
        </Link>
      </div>

      <div className="px-4">
        <Button className="w-full" variant="default" asChild>
          <Link href="#">Create post</Link>
        </Button>
      </div>

      <nav className="flex-1 px-1 pb-4">
        <Section title="Create">
          <NavItem
            href="/dashboard/new-post"
            icon={PencilLine}
            label="New post"
          />
          <NavItem href="/dashboard/studio" icon={LayoutGrid} label="Studio" />
          <NavItem
            href="/dashboard/bulk-tools"
            icon={Upload}
            label="Bulk tools"
          />
        </Section>

        <Section title="Posts">
          <NavItem
            href="/dashboard/calendar"
            icon={Calendar}
            label="Calendar"
          />
          <NavItem href="/dashboard/all" icon={ListChecks} label="All" />
          <NavItem
            href="/dashboard/scheduled"
            icon={Clock4}
            label="Scheduled"
          />
          <NavItem
            href="/dashboard/posted"
            icon={CheckCircle2}
            label="Posted"
          />
          <NavItem href="/dashboard/drafts" icon={FileText} label="Drafts" />
        </Section>

        <Section title="Podcast Clipper">
          <NavItem href="/dashboard" icon={PlaySquare} label="Clipper" />
        </Section>

        <Section title="Configuration">
          <NavItem
            href="/dashboard/accounts"
            icon={Settings}
            label="Accounts"
          />
        </Section>
      </nav>

      <div className="mt-auto border-t px-3 py-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-2 py-1 text-xs">
            Credits: {credits}
          </Badge>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/billing">Buy More</Link>
          </Button>
        </div>

        <div className="mt-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{email.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="truncate text-sm">{email}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <p className="text-muted-foreground text-xs">{email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/billing">Billing</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ redirectTo: "/login" })}
                className="text-destructive cursor-pointer"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}
