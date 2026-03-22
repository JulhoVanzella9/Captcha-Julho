"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is this free to join?",
    answer: "Yes, participation is 100% free. You earn money simply by answering surveys about products and services.",
  },
  {
    question: "How do I receive my earnings?",
    answer: "Once you reach the minimum balance of $10, you can request a withdrawal via PayPal or Google Play credit. Funds are typically available within 24 hours.",
  },
  {
    question: "How long does each survey take?",
    answer: "Most surveys take between 30 seconds and 2 minutes. They consist of simple questions about products and services.",
  },
  {
    question: "Can I participate from anywhere?",
    answer: "Yes! All you need is internet access. You can participate from your phone, tablet, or computer.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use end-to-end encryption and follow all privacy regulations to protect your information.",
  },
]

export function FAQSection() {
  return (
    <section className="flex flex-col gap-5 opacity-0 animate-fade-in-up animation-delay-400">
      <h2 className="text-center text-lg font-semibold text-gray-900">
        Frequently Asked Questions
      </h2>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-gray-200">
            <AccordionTrigger className="text-left text-sm font-medium text-gray-900 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
