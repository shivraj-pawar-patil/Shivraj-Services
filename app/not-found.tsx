import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center space-y-4 bg-background p-4 text-center">
            <div className="rounded-full bg-muted p-4">
                <FileQuestion className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Page Not Found</h2>
                <p className="text-muted-foreground max-w-[500px]">
                    Could not find the requested resource. It might have been moved or deleted.
                </p>
            </div>
            <Link href="/">
                <Button variant="default">Return Home</Button>
            </Link>
        </div>
    )
}
