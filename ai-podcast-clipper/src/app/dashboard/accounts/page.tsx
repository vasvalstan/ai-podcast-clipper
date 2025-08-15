import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  AtSign,
  Pin,
  Feather,
  Music2,
} from "lucide-react";

const providers = [
  { name: "Instagram", href: "/dashboard/accounts/instagram", Icon: Instagram },
  { name: "Twitter", href: "/dashboard/accounts/twitter", Icon: Twitter },
  { name: "Youtube", href: "/dashboard/accounts/youtube", Icon: Youtube },
  { name: "Tiktok", href: "/dashboard/accounts/tiktok", Icon: Music2 },
  { name: "Facebook", href: "/dashboard/accounts/facebook", Icon: Facebook },
  { name: "Linkedin", href: "/dashboard/accounts/linkedin", Icon: Linkedin },
  { name: "Bluesky", href: "/dashboard/accounts/bluesky", Icon: Feather },
  { name: "Threads", href: "/dashboard/accounts/threads", Icon: AtSign },
  { name: "Pinterest", href: "/dashboard/accounts/pinterest", Icon: Pin },
];

export default function AccountsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            {providers.map(({ name, href, Icon }) => (
              <div
                key={name}
                className="flex w-full max-w-md items-center justify-center gap-3"
              >
                <div className="flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <Button asChild className="min-w-[220px] justify-center">
                  <Link href={href}>Connect {name}</Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
