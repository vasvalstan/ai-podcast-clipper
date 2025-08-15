"use server";

import { auth } from "~/server/auth";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import Sidebar from "~/components/sidebar";
import { Toaster } from "~/components/ui/sonner";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await db.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
    select: {
      credits: true,
      email: true,
    },
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar credits={user.credits} email={user.email} />
      <main className="flex-1 px-6 py-6">{children}</main>
      <Toaster richColors />
    </div>
  );
}
