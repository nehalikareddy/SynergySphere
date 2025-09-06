import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// To get these values:
// 1. Go to https://supabase.com/dashboard
// 2. Select your project
// 3. Navigate to Settings > API
// 4. Copy the Project URL and anon/public key
// 5. Add them to your .env file as VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)