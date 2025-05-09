import { createClient } from '@supabase/supabase-js';
import { ANON_KEY } from '../../supabaseData';

const supabaseUrl = 'https://udenllqrmnjbjpxoaigb.supabase.co';
const supabaseKey = ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
