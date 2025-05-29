import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: async (name: string) => (await cookieStore).get(name)?.value,
        set: async (name: string, value: string, options: CookieOptions) => {
          try {
            (await cookieStore).set({ name, value, ...options })
          } catch (error) {
            // The `cookies()` helper only works in a Server Component or Route Handler.
            // We're attempting to set a cookie in a Client Component
            // but we're using a Server Component client.
            // This CookieOptions type tells us to ignore it.
          }
        },
        remove: async (name: string, options: CookieOptions) => {
          try {
            (await cookieStore).set({ name, value: '', ...options })
          } catch (error) {
            // The `cookies()` helper only works in a Server Component or Route Handler.
            // We're attempting to remove a cookie in a Client Component
            // but we're using a Server Component client.
            // This CookieOptions type tells us to ignore it.
          }
        },
      },
    }
  )
} 