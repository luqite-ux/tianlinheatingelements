'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { InquiryCaptchaField } from '@/components/inquiry/inquiry-captcha-field'
import { submitInquiry, type InquiryState } from '@/app/contact/actions'

interface ProductOption {
  slug: string
  label: string
}

interface RfqFormProps {
  products: ProductOption[]
  defaultProduct?: string
  drawingIntent?: boolean
}

const parameterFields = [
  { name: 'voltage', label: 'Voltage', placeholder: 'e.g. 220 V' },
  { name: 'power', label: 'Power', placeholder: 'e.g. 150 W or 20 W/m' },
  { name: 'size', label: 'Size / shape', placeholder: 'Length × width, or bend pattern' },
  { name: 'material', label: 'Material', placeholder: 'e.g. 304 stainless steel' },
  { name: 'temperature', label: 'Operating temperature', placeholder: 'e.g. -30 to 60 °C' },
  { name: 'leads', label: 'Lead configuration', placeholder: 'Wire type, length, termination' },
  { name: 'volume', label: 'Order volume', placeholder: 'Sample / trial / annual quantity' },
] as const

const labelClass = 'block text-sm font-medium text-navy-deep'
const selectClass =
  'mt-2 block min-h-11 w-full rounded-sm border border-input bg-white px-3 text-base text-navy-deep focus-visible:border-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/40 md:text-sm'

export function RfqForm({ products, defaultProduct, drawingIntent }: RfqFormProps) {
  const initialState: InquiryState = { ok:false, message:'', refreshKey:0 }
  const [state, action, pending] = useActionState(submitInquiry, initialState)

  return (
    <form action={action} className="space-y-8" aria-describedby="rfq-note">
      <fieldset className="space-y-5">
        <legend className="eyebrow text-electric">Contact</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="rfq-name" className={labelClass}>
              Name <span aria-hidden="true">*</span>
            </label>
            <Input id="rfq-name" name="name" required autoComplete="name" className="mt-2 min-h-11" />
          </div>
          <div>
            <label htmlFor="rfq-company" className={labelClass}>
              Company <span aria-hidden="true">*</span>
            </label>
            <Input id="rfq-company" name="company" required autoComplete="organization" className="mt-2 min-h-11" />
          </div>
          <div>
            <label htmlFor="rfq-email" className={labelClass}>
              Work email <span aria-hidden="true">*</span>
            </label>
            <Input id="rfq-email" name="email" type="email" required autoComplete="email" className="mt-2 min-h-11" />
          </div>
          <div>
            <label htmlFor="rfq-phone" className={labelClass}>
              Phone
            </label>
            <Input id="rfq-phone" name="phone" type="tel" autoComplete="tel" className="mt-2 min-h-11" />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="eyebrow text-electric">Product and parameters</legend>
        <div>
          <label htmlFor="rfq-product" className={labelClass}>
            Product family
          </label>
          <select id="rfq-product" name="product" defaultValue={defaultProduct ?? ''} className={selectClass}>
            <option value="">Not sure yet</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {parameterFields.map((f) => (
            <div key={f.name}>
              <label htmlFor={`rfq-${f.name}`} className={labelClass}>
                {f.label}
              </label>
              <Input id={`rfq-${f.name}`} name={f.name} placeholder={f.placeholder} className="mt-2 min-h-11" />
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="rfq-message" className={labelClass}>
            Application and notes
          </label>
          <Textarea
            id="rfq-message"
            name="message"
            rows={5}
            placeholder={
              drawingIntent
                ? 'Describe the drawing you will send and where the element is installed.'
                : 'Where is the element installed, and what must it heat?'
            }
            className="mt-2"
          />
        </div>
      </fieldset>

      <InquiryCaptchaField refreshKey={state.refreshKey} className="border-t border-line pt-6" />

      <div className="space-y-4">
        <p id="rfq-note" className="text-sm leading-relaxed text-muted-foreground">
          Your request is recorded in Tianlin&apos;s customer enquiry system. We use the technical fields above to route it for review.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-electric px-6 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#1450b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {pending ? 'Submitting…' : 'Submit RFQ'}
        </button>
        <p role="status" aria-live="polite" className={`min-h-6 text-sm ${state.ok ? 'text-emerald-700' : 'text-red-700'}`}>
          {state.message}
        </p>
      </div>
    </form>
  )
}
