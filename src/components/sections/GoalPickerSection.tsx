'use client'
import { useParams } from 'next/navigation'
export default function GoalPickerSection() {
  const locale = useParams().locale as string
  return (
    <section className="v2-section" id="ai">
      <div className="v2-container">
        <p className="v2-eyebrow">{locale === 'ar' ? 'ابدأ بهدفك' : 'START WITH YOUR GOAL'}</p>
        <h2 className="v2-title">{locale === 'ar' ? 'ماذا تريد أن تحقق؟' : 'WHAT DO YOU WANT TO ACHIEVE?'}</h2>
      </div>
    </section>
  )
}