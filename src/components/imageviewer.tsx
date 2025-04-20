/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SVSYE34NIAD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"

export default function ImageViewer() {
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-background border-b border-border px-4 py-2 flex items-center justify-center gap-4">
                <Button variant="ghost" size="icon">
                    <ZoomInIcon className="w-5 h-5" />
                    <span className="sr-only">Zoom in</span>
                </Button>
                <Button variant="ghost" size="icon">
                    <ZoomOutIcon className="w-5 h-5" />
                    <span className="sr-only">Zoom out</span>
                </Button>
                <Button variant="ghost" size="icon">
                    <MoveLeftIcon className="w-5 h-5" />
                    <span className="sr-only">Rotate left</span>
                </Button>
                <Button variant="ghost" size="icon">
                    <RotateCwIcon className="w-5 h-5" />
                    <span className="sr-only">Rotate right</span>
                </Button>
            </div>
            <div className="flex-1 flex items-center justify-center bg-muted overflow-hidden">
                <img
                    src="images/placeholder.svg"
                    alt="Image"
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain"
                    style={{ aspectRatio: "800/600", objectFit: "cover" }}
                />
            </div>
        </div>
    )
}

function MoveLeftIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 8L2 12L6 16" />
            <path d="M2 12H22" />
        </svg>
    )
}


function RotateCwIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
        </svg>
    )
}


function ZoomInIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
            <line x1="11" x2="11" y1="8" y2="14" />
            <line x1="8" x2="14" y1="11" y2="11" />
        </svg>
    )
}


function ZoomOutIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
            <line x1="8" x2="14" y1="11" y2="11" />
        </svg>
    )
}