interface BrandingCardProps {
  title: string;
  price: string;
  description?: string;
}

export default function BrandingCard({ title, price, description }: BrandingCardProps) {
  return (
    <div className="branding-card">
      <div className="branding-card__body">
        <h4 className="branding-card__title">{title}</h4>
        {description && <p className="branding-card__desc">{description}</p>}
      </div>
      <div className="branding-card__price">
        <div className="branding-card__amount">{price}</div>
        <p className="branding-card__period">one-time</p>
      </div>
    </div>
  );
}
