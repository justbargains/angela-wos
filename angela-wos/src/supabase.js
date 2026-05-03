import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// ── STORAGE HELPERS ───────────────────────────────────────────────────────
// All data is stored in a single "wos_data" table with key/value pairs.
// The user_id is a stable anonymous ID stored in localStorage.

function getUserId() {
  let id = localStorage.getItem('angela_wos_uid');
  if (!id) {
    id = 'user_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('angela_wos_uid', id);
  }
  return id;
}

export async function dbGet(key) {
  try {
    const { data, error } = await supabase
      .from('wos_data')
      .select('value')
      .eq('user_id', getUserId())
      .eq('key', key)
      .single();
    if (error || !data) return null;
    return JSON.parse(data.value);
  } catch {
    return null;
  }
}

export async function dbSet(key, value) {
  try {
    const { error } = await supabase
      .from('wos_data')
      .upsert({
        user_id: getUserId(),
        key,
        value: JSON.stringify(value),
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,key' });
    if (error) console.error('DB write error:', error);
  } catch (e) {
    console.error('DB error:', e);
  }
}
