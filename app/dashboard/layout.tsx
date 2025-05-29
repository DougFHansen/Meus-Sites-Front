import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <>
      {/* You can add shared UI for the dashboard here, like a navbar */}
      {children}
    </>
  )
} 