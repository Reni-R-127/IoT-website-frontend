export default function PricingCard({ plan = {} }) {
  return <article className="pricing-card"><h3>{plan.name}</h3><strong>{plan.price}</strong><p>{plan.duration}</p><ul>{(plan.features||[]).map(feature=><li key={feature}>{feature}</li>)}</ul></article>;
}
