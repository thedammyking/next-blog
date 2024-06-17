import { createClient } from '@supabase/supabase-js';

import * as env from '@/env';

const setup = () => {
  if (!(env.SUPABASE_URL && env.SUPABASE_ANON_KEY)) {
    throw new Error('Please provide SUPABASE_URL and SUPABASE_ANON_KEY');
  }

  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
};

export default setup();
