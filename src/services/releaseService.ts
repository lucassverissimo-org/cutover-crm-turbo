import { supabase } from '../supabase/client'

export const getReleases = async () => {
  return await supabase!
    .from('releases')
    .select('*')
    .order('data_gmud', { ascending: false })
}
