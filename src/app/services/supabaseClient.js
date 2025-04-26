import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL='https://uxjexzrjwtsakbqespil.supabase.co'
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4amV4enJqd3RzYWticWVzcGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTUyMzEsImV4cCI6MjA2MTE3MTIzMX0._0xlEPdiAnOKQ6XCUjX_IigqNiPKhTAu1_1EegdueGk'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

