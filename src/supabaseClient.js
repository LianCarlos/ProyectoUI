import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'TU_URL_AQUÍ'
const supabaseAnonKey = 'TU_API_KEY_AQUÍ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)