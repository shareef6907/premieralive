import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  elevated?: boolean;
  children?: ReactNode;
  className?: string;
};

export default function Section({ id, eyebrow, title, elevated = false, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`v2-section ${elevated ? 'v2-section--elevated' : ''} ${className}`}>
      <div className="v2-container">
        {eyebrow ? <p className="v2-eyebrow">{eyebrow}</p> : null}
        {title ? <h2 className="v2-title">{title}</h2> : null}
        {children}
      </div>
    </section>
  );
}
