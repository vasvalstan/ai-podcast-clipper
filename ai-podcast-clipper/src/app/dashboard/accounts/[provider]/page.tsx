export default async function ProviderConnectPage({
  params,
}: {
  params: Promise<{ provider: string }>;
}) {
  const { provider } = await params;
  const name = provider.charAt(0).toUpperCase() + provider.slice(1);
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold tracking-tight">Connect {name}</h1>
      <p className="text-muted-foreground mt-2">
        Integration setup coming soon.
      </p>
    </div>
  );
}
