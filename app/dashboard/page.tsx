import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  // This page is protected by the layout.tsx
  // The layout checks for authentication before rendering this page.

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  // Although the layout protects this, getting the user here is useful
  // for displaying user-specific information if needed.
  // If user is null here, it means the layout check failed or was bypassed,
  // though the redirect in layout.tsx should prevent reaching here without a user.

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to the Dashboard!
        </h1>

        <p className="text-xl mb-8">
          You are logged in as {user?.email}.
        </p>

        {/* TODO: Add a logout button here */}
        {/* You'll need a client component or a form action to handle logout */}
        <form action="/auth/sign-out" method="post">
          <button type="submit" className="px-4 py-2 border rounded-md bg-red-500 text-white hover:bg-red-600">
            Logout
          </button>
        </form>

      </main>
    </div>
  );
} 