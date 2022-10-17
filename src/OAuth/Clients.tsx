import { createClient } from '@supabase/supabase-js';
const Url =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_SUPABASE_URL
		: process.env.REACT_APP_SUPABASE_DEV_URL;

const key =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_SUPABASE_TOKEN
		: process.env.REACT_APP_SUPABASE_DEV_TOKEN;

const supabase = createClient(Url as string, key as string);

export { supabase };
