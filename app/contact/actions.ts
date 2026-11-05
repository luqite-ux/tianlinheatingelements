'use server'

import { createClient } from '@supabase/supabase-js'
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from '@/lib/inquiry-captcha'

export type InquiryState = { ok:boolean; message:string; refreshKey:number }
export async function submitInquiry(_: InquiryState, formData: FormData): Promise<InquiryState> {
  const value=(key:string)=>String(formData.get(key)??'').trim()
  const tenantId=process.env.NEXT_PUBLIC_TENANT_ID?.trim()??''
  const secret=process.env.CAPTCHA_SECRET?.trim()??''
  try {
    const captcha=await verifyCaptchaSubmission({secret,...createSupabaseCaptchaContextFromEnv(),scope:value('captchaScope'),token:value('captchaToken'),answer:value('captchaAnswer')})
    if (!captcha.ok) return {ok:false,message:'The verification code is invalid or expired. Please try the new image.',refreshKey:Date.now()}
    const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!,{auth:{persistSession:false}})
    const subject=`RFQ: ${value('product')||'Heating element'}${value('company')?` — ${value('company')}`:''}`
    const message=[value('message'),'',`Voltage: ${value('voltage')||'-'}`,`Power: ${value('power')||'-'}`,`Size / shape: ${value('size')||'-'}`,`Material: ${value('material')||'-'}`,`Operating temperature: ${value('temperature')||'-'}`,`Lead configuration: ${value('leads')||'-'}`,`Order volume: ${value('volume')||'-'}`].join('\n')
    const {error}=await supabase.from('inquiries').insert({tenant_id:tenantId,name:value('name'),email:value('email'),phone:value('phone')||null,company:value('company')||null,subject,message,status:'new'})
    if(error) throw error
    return {ok:true,message:'Thank you. Your RFQ has been recorded. Our team will reply by email.',refreshKey:Date.now()}
  } catch {
    return {ok:false,message:'The inquiry could not be recorded. Please review the form and try again.',refreshKey:Date.now()}
  }
}
