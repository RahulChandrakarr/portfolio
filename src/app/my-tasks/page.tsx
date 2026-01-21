import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import MyTasksLayout from '@/app/components/my-tasks/MyTasksLayout';

const allowedEmail = process.env.NEXT_PUBLIC_ALLOWED_EMAIL || '';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export default async function MyTasksPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient(
    { cookies: () => cookieStore },
    { supabaseUrl, supabaseKey }
  );

  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Supabase session fetch error', error);
  }

  const sessionEmail = data.session?.user.email;
  if (!sessionEmail || sessionEmail !== allowedEmail) {
    redirect('/login');
  }

  return (
    <MyTasksLayout />
  );
}
