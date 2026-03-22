import { RewardsFlow } from "@/components/flow/rewards-flow"

// Configure your CTA destination URL here
const CTA_URL = "https://checkout.example.com/google-rewards/claim?ref=vsl"

export default function LandingPage() {
  return <RewardsFlow ctaUrl={CTA_URL} />
}
