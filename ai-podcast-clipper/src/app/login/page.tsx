"use server";

import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "~/components/login-form";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
