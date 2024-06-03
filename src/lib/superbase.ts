import { createClient } from '@supabase/supabase-js';
import apiEnv from '@/data/apiEnv';

const setup = () => {
	if (!(apiEnv.SUPABASE_URL && apiEnv.SUPABASE_ANON_KEY)) {
		throw new Error('Please provide SUPABASE_URL and SUPABASE_ANON_KEY');
	}

	return createClient(apiEnv.SUPABASE_URL, apiEnv.SUPABASE_ANON_KEY);
};

export default setup();
