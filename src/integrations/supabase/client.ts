import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ghufcfdpqjyendaztvsw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdodWZjZmRwcWp5ZW5kYXp0dnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MDYxMjgsImV4cCI6MjA3OTk4MjEyOH0.XRW3ByTzLR6fz25fltDNWTRfYgV4lqLufDM_hyYuQ2k";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
