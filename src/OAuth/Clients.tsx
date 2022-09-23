import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	'https://byiqcuumvldnufjkprxe.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5aXFjdXVtdmxkbnVmamtwcnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM1NTY2MjYsImV4cCI6MTk3OTEzMjYyNn0.Pzj5ySnxVkdCDD38z90dcPuAT5OGuDmAq_EfrUecF7o'
);

export { supabase };
