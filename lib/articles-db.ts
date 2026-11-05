import { getSupabaseClient } from './supabase'

export type PublishedArticle = { slug:string; title:string; date:string; summary:string; body:string[]; featuredImage?:string }
const tenantId = () => process.env.NEXT_PUBLIC_TENANT_ID
const localized = (row: Record<string, any>, key: string) => row[`${key}_i18n`]?.en || row[`${key}_en`] || row[key] || ''

export async function getPublishedArticles(): Promise<PublishedArticle[]> {
  const supabase=getSupabaseClient(); const tenant=tenantId(); if(!supabase||!tenant)return []
  const {data,error}=await supabase.from('articles').select('*').eq('tenant_id',tenant).eq('is_published',true).order('published_at',{ascending:false})
  if(error||!data)return []
  return data.map(row=>({slug:row.slug,title:localized(row,'title'),date:String(row.published_at||row.created_at||'').slice(0,10),summary:localized(row,'excerpt'),body:[localized(row,'content')],featuredImage:row.featured_image||undefined}))
}
export async function getArticleBySlug(slug:string){return (await getPublishedArticles()).find(article=>article.slug===slug)}
