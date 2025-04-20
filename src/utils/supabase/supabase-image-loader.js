const projectId = 'jkdoeswbtmnkhowizonx' // your supabase project id

export default function supabaseLoader({ src, width, height, quality }) {
  return `https://${projectId}.supabase.co/storage/v1/object/public/yk-project-images//${src}?width=${width}&height=${height}&quality=${quality || 75}`
}

//https://jkdoeswbtmnkhowizonx.supabase.co/storage/v1/object/public/yk-project-images//subletinn_2.png