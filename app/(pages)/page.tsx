import prisma from '../../lib/prisma';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to Shivraj Services</h1>
        <p className="text-muted-foreground text-lg">Your on-demand services platform</p>
      </div>
    </main>
  )
}
