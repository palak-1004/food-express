import { supabase } from '../lib/supabaseClient'

export const getRestaurantsWithFoods = async () => {
  const { data, error } = await supabase
    .from('restaurants')
    .select(`
      id,
      name,
      location,
      foods ( name, price )
    `)

  if (error) {
    console.error('Error fetching data:', error)
    return []
  }

  return data
}