import {
  SiGoogle,
  SiMeta,
  SiShopify,
  SiSalesforce,
  SiSamsung,
  SiNetflix,
  SiSpotify,
  SiAirbnb,
  SiSlack,
  SiStripe,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

const CLIENTS: { name: string; Icon: IconType }[] = [
  { name: 'Google',    Icon: SiGoogle    },
  { name: 'Meta',      Icon: SiMeta      },
  { name: 'Shopify',    Icon: SiShopify    },
  { name: 'Salesforce', Icon: SiSalesforce },
  { name: 'Samsung',   Icon: SiSamsung   },
  { name: 'Netflix',   Icon: SiNetflix   },
  { name: 'Spotify',   Icon: SiSpotify   },
  { name: 'Airbnb',    Icon: SiAirbnb    },
  { name: 'Slack',     Icon: SiSlack     },
  { name: 'Stripe',    Icon: SiStripe    },
];

const ROW1 = CLIENTS.slice(0, 5);
const ROW2 = CLIENTS.slice(5);

function Chip({ name, Icon }: { name: string; Icon: IconType }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 18px',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      background: 'var(--surface)',
      whiteSpace: 'nowrap',
      cursor: 'default',
      transition: 'border-color 200ms, background 200ms',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--line-strong)';
      (e.currentTarget as HTMLDivElement).style.background = 'var(--background)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--line)';
      (e.currentTarget as HTMLDivElement).style.background = 'var(--surface)';
    }}
    >
      <Icon size={18} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        letterSpacing: '0.06em',
        color: 'var(--muted-foreground)',
        textTransform: 'uppercase',
      }}>
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({ items, direction }: { items: typeof CLIENTS; direction: 'left' | 'right' }) {
  const repeated = [...items, ...items, ...items, ...items];
  const animName = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to right, var(--background) 0%, transparent 10%, transparent 90%, var(--background) 100%)',
      }} />
      <div
        className={animName}
        style={{ display: 'flex', gap: '12px', width: 'max-content', padding: '4px 0' }}
      >
        {repeated.map((c, i) => <Chip key={i} name={c.name} Icon={c.Icon} />)}
      </div>
    </div>
  );
}

export function ClientsMarquee() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <MarqueeRow items={ROW1} direction="left" />
      <MarqueeRow items={ROW2} direction="right" />
    </div>
  );
}
