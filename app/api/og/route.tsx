import { ImageResponse } from 'next/og'

export const runtime = "edge"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const hasTitle = searchParams.has('title')
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100):'APP'
        return new ImageResponse(
        <div tw='flex flex-col w-full h-full items-center justify-center'>
             <h1 tw='text-3xl text-gray-900 font -bold'>{title}</h1>
        </div>
        )
    } catch (error) {
        return new Response("Error in GET og/route.tsx", { status: 500 })
    }
}