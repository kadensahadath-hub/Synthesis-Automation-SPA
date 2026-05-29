import { useState, useRef, useEffect } from 'react';
import { motion, Variants, useInView, animate, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  ChevronDown, 
  ArrowRight, 
  Cpu, 
  Database, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Terminal, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Clock, 
  DollarSign, 
  TrendingUp
} from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};



const GENERIC_DOMAINS = [
  'gmail',
  'yahoo',
  'hotmail',
  'outlook',
  'icloud',
  'aol',
  'protonmail',
  'mail',
];

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isGenericDomain(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase().split('.')[0];
  return GENERIC_DOMAINS.includes(domain);
}

// ==========================================
// Brand SVG Icons
// ==========================================

function OpenAIIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.743 12.52a3.844 3.844 0 0 0-.5-1.92 3.896 3.896 0 0 0-.256-.37 3.854 3.854 0 0 0 .5-1.92 3.882 3.882 0 0 0-1.93-3.342 3.842 3.842 0 0 0-1.42-.497A3.88 3.88 0 0 0 14.8.548a3.882 3.882 0 0 0-3.341 1.932 3.842 3.842 0 0 0-.5.143v-.08a3.884 3.884 0 0 0-3.883-3.883C5.64.66 4.3.176 2.87.66c-1.43.48-2.58 1.52-3.18 2.88A3.88 3.88 0 0 0-2.24 4.96v.08a3.84 3.84 0 0 0-1.42.497 3.884 3.884 0 0 0-1.93 3.342 3.854 3.854 0 0 0 .5 1.92c-.092.12-.178.243-.257.37a3.844 3.844 0 0 0-.5 1.92 3.882 3.882 0 0 0 1.93 3.341c.449.26.948.428 1.468.497a3.88 3.88 0 0 0 3.34 1.932c1.23-.016 2.378-.602 3.102-1.59l.018.006c.078.048.158.096.24.14a3.884 3.884 0 0 0 3.883 3.883c1.438-.002 2.775-.79 3.473-2.052a3.876 3.876 0 0 0 1.93-3.34c0-.46-.082-.916-.243-1.348v-.08c.52-.07 1.02-.238 1.468-.497a3.884 3.884 0 0 0 1.93-3.342zm-12.06 6.353a2.385 2.385 0 0 1-1.196.32 2.398 2.398 0 0 1-2.39-2.046l.044-.025 4.708-2.718a.747.747 0 0 0 .373-.646v-5.698l1.79 1.033v6.33a.035.035 0 0 0 .017.03 2.41 2.41 0 0 1-3.346 3.418zm-4.32-3.155a2.388 2.388 0 0 1-.598-1.085 2.398 2.398 0 0 1 .803-3.045l.044.025 4.707 2.718a.748.748 0 0 0 .748 0l4.935-2.85v2.067l-5.483 3.167a.036.036 0 0 0-.018.03 2.41 2.41 0 0 1-5.138-.927zm-1.085-5.518a2.383 2.383 0 0 1 .599-1.085A2.398 2.398 0 0 1 7.28 8.016v5.485l-4.935 2.85a.749.749 0 0 0-.374.647v-5.7l1.79-1.033a.036.036 0 0 0 .018-.032 2.395 2.395 0 0 1 1.085-3.037zm10.598-3.045a2.386 2.386 0 0 1 1.197-.32 2.398 2.398 0 0 1 2.39 2.046l-.044.026-4.708 2.717a.748.748 0 0 0-.373.647v5.697l-1.79-1.032v-6.33a.035.035 0 0 0-.017-.03 2.41 2.41 0 0 1 3.345-3.42zm4.32 3.155c.297.332.502.723.599 1.144a2.398 2.398 0 0 1-.803 2.986l-.044-.025-4.708-2.718a.748.748 0 0 0-.748 0L8.005 13.56v-2.066l5.483-3.167a.035.035 0 0 0 .017-.03 2.41 2.41 0 0 1 5.138.927zm1.085 5.518a2.385 2.385 0 0 1-.599 1.085 2.398 2.398 0 0 1-4.707-.024v-5.485l4.935-2.85a.748.748 0 0 0 .374-.646v5.699l-1.79 1.033a.035.035 0 0 0-.018.03 2.41 2.41 0 0 1-1.085 3.038zM12 10.354l-2.85 1.646v3.292L12 16.938l2.85-1.646v-3.292L12 10.354z" />
    </svg>
  );
}

function SlackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.52-2.522V8.824a2.528 2.528 0 0 1 2.52-2.52h5.043zm10.135 3.761a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.782a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.042zm-3.76 10.134a2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.262a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.52-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v5.043a2.528 2.528 0 0 1-2.52 2.52h-5.043z"/>
    </svg>
  );
}

function HubspotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="5" r="2.5" fill="currentColor" />
      <circle cx="5" cy="17" r="2.5" />
      <circle cx="19" cy="17" r="2.5" />
      <path d="M12 7.5v6.5M5 14.5l5.5-3.5M19 14.5l-5.5-3.5" />
      <circle cx="12" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}

function SalesforceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.5 10c0-1-.3-1.9-.9-2.7C17 6.4 15.6 5.8 14 5.8c-1.1 0-2.1.3-2.9.9C10.3 5.4 8.7 4.7 7 4.7 4 4.7 1.7 7 1.7 10c0 .4.1.8.2 1.2C.8 11.9.2 12.9.2 14.1c0 1.9 1.5 3.4 3.4 3.4h14.9c2.8 0 5-2.2 5-5 0-2.3-1.6-4.2-3.8-4.8c.2-.5.3-1.1.3-1.7" />
    </svg>
  );
}

function StripeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.9 11.2c-1.3-.4-2-.8-2-1.4 0-.5.5-.8 1.4-.8 1.2 0 2.4.3 3.3.9V7.3a8 8 0 0 0-3.6-.8c-2.4 0-4.1 1.2-4.1 3.3 0 2.3 2 3 3.7 3.5 1.5.4 2 .9 2 1.5 0 .6-.7 1-1.6 1-1.4 0-2.8-.5-3.8-1.2v2.7a8.4 8.4 0 0 0 4.1.9c2.4 0 4.3-1.1 4.3-3.4.1-2.2-1.8-3.1-3.7-3.6z" />
    </svg>
  );
}

function AirtableIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M2.5 10.5h19v3H2.5zM7.25 15H21.5v3H7.25zM2.5 6h11.5v3H2.5z" />
    </svg>
  );
}

function ZapierIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.5 1.5h1v6h-1zm5 2.1l.7.7-4.2 4.3-.7-.7zm1.1 6.1v1h-6v-1zm-2.8 5l-.7-.7 4.2-4.2.7.7zm-6.1 1.1h-1v-6h1zm-5-2.1l-.7-.7 4.3-4.2.7.7zm-1.1-6.1v-1h6v1zm2.8-5l.7.7-4.2 4.2-.7-.7z" />
    </svg>
  );
}

function ShopifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 6.5h-3v-1a4 4 0 0 0-8 0v1H5l-1.5 14h17L19 6.5zm-9-1c0-1.1.9-2 2-2s2 .9 2 2v1h-4v-1zm7.7 13.5H6.3l1.1-11.5h9.2l1.1 11.5z" />
    </svg>
  );
}

const INTEGRATIONS = [
  { name: 'OpenAI', icon: <OpenAIIcon className="w-6 h-6" /> },
  { name: 'Slack', icon: <SlackIcon className="w-6 h-6" /> },
  { name: 'HubSpot', icon: <HubspotIcon className="w-6 h-6" /> },
  { name: 'Salesforce', icon: <SalesforceIcon className="w-6 h-6" /> },
  { name: 'Stripe', icon: <StripeIcon className="w-6 h-6" /> },
  { name: 'Airtable', icon: <AirtableIcon className="w-6 h-6" /> },
  { name: 'Zapier', icon: <ZapierIcon className="w-6 h-6" /> },
  { name: 'Shopify', icon: <ShopifyIcon className="w-6 h-6" /> },
];

const WORKFLOWS = [
  {
    id: 'leads',
    title: 'Lead Ingestion & CRM',
    steps: [
      { role: 'TRIGGER', label: 'Form Submission', detail: 'Prospect submits contact request.', icon: <Zap className="w-5 h-5 text-amber-400" /> },
      { role: 'PROCESSOR', label: 'AI Qualifier & Agent', detail: 'GPT scores lead and extracts company metadata.', icon: <Cpu className="w-5 h-5 text-cyan-400" /> },
      { role: 'ACTION', label: 'CRM & Slack Alerts', detail: 'Salesforce logged + instant priority Slack ping.', icon: <Database className="w-5 h-5 text-emerald-400" /> },
    ]
  },
  {
    id: 'billing',
    title: 'Auto-Billing & Sync',
    steps: [
      { role: 'TRIGGER', label: 'Contract Execution', detail: 'DocuSign webhook fires on signature completion.', icon: <Zap className="w-5 h-5 text-amber-400" /> },
      { role: 'PROCESSOR', label: 'Billing Engine', detail: 'Stripe customer record and portal constructed.', icon: <Cpu className="w-5 h-5 text-cyan-400" /> },
      { role: 'ACTION', label: 'ERP & Client Update', detail: 'QuickBooks record updated + setup email dispatched.', icon: <Database className="w-5 h-5 text-emerald-400" /> },
    ]
  },
  {
    id: 'support',
    title: 'AI Support Desk',
    steps: [
      { role: 'TRIGGER', label: 'Ticket Dispatched', detail: 'Customer writes support email requesting assist.', icon: <Zap className="w-5 h-5 text-amber-400" /> },
      { role: 'PROCESSOR', label: 'Semantic Engine', detail: 'Search docs base and pre-compile draft solution.', icon: <Cpu className="w-5 h-5 text-cyan-400" /> },
      { role: 'ACTION', label: 'Queue Draft response', detail: 'Helpdesk draft populated for human editor sign-off.', icon: <Database className="w-5 h-5 text-emerald-400" /> },
    ]
  }
];

const BOTTLENECK_OPTIONS = [
  'Manual Data Entry / Copying',
  'Disconnected SaaS Platforms',
  'Delayed Follow-ups & Lag',
  'Human Input Error Risks'
];

const TOOL_OPTIONS = [
  'Google Workspace / Gmail',
  'Slack',
  'Salesforce',
  'HubSpot',
  'Stripe',
  'Airtable'
];

// ==========================================
// Dynamic Counter Component
// ==========================================

interface CounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
}

function Counter({ value, suffix = '', decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prevValueRef = useRef(0);

  useEffect(() => {
    if (!isInView) {
      setCount(value);
      prevValueRef.current = value;
      return;
    }

    const controls = animate(prevValueRef.current, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setCount(latest);
      },
    });

    prevValueRef.current = value;
    return () => controls.stop();
  }, [value, isInView]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ==========================================
// Floating Background Particles
// ==========================================

function FloatingParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * -20,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            bottom: `-5%`,
          }}
          animate={{
            y: [0, -1200],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// ==========================================
// Integrations Horizontal Scrolling Marquee
// ==========================================

function IntegrationMarquee() {
  const row1 = [...INTEGRATIONS, ...INTEGRATIONS];
  const row2 = [...INTEGRATIONS, ...INTEGRATIONS].reverse();

  return (
    <section id="marquee" className="relative z-10 py-16 overflow-hidden border-b border-slate-800/80 bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-mono">
          Ecosystem Integrations
        </p>
        <h3 className="text-2xl font-bold text-slate-200">
          Seamless API connections with your existing stack
        </h3>
      </div>
      
      {/* Row 1 (Forward) */}
      <div 
        className="relative w-full overflow-hidden py-2 flex select-none mb-6"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <div className="flex gap-6 whitespace-nowrap animate-marquee">
          {row1.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 px-6 py-4 bg-surface/40 hover:bg-surface/80 border border-slate-800/80 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.05)] transition-all duration-300 rounded-none cursor-default group">
              <span className="text-slate-500 group-hover:text-cyan-400 transition-colors duration-300">
                {item.icon}
              </span>
              <span className="text-sm font-semibold text-slate-400 group-hover:text-white transition-colors duration-300 font-mono">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 (Reverse) */}
      <div 
        className="relative w-full overflow-hidden py-2 flex select-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <div className="flex gap-6 whitespace-nowrap animate-marquee-reverse">
          {row2.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 px-6 py-4 bg-surface/40 hover:bg-surface/80 border border-slate-800/80 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.05)] transition-all duration-300 rounded-none cursor-default group">
              <span className="text-slate-500 group-hover:text-cyan-400 transition-colors duration-300">
                {item.icon}
              </span>
              <span className="text-sm font-semibold text-slate-400 group-hover:text-white transition-colors duration-300 font-mono">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// ROI / Savings Calculator Component
// ==========================================

interface CalculatorProps {
  onLockSavings: (hours: number, rate: number) => void;
}

function SavingsCalculator({ onLockSavings }: CalculatorProps) {
  const [hours, setHours] = useState(25);
  const [rate, setRate] = useState(40);
  const [riskFactor, setRiskFactor] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const efficiencyFactor = 0.75; // 75% workflow tasks automated
  const errorMultiplier = riskFactor === 'Low' ? 1.05 : riskFactor === 'Medium' ? 1.25 : 1.5;

  const hoursSavedMonthly = Math.round(hours * 4.33 * efficiencyFactor);
  const capitalSavedMonthly = Math.round(hoursSavedMonthly * rate * errorMultiplier);
  const capitalSavedAnnual = capitalSavedMonthly * 12;

  return (
    <section id="calculator" className="relative z-10 py-20 md:py-28 px-6 border-t border-slate-800/50 bg-slate-950/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-mono">
            Capital Optimization Tool
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
            Calculate your automation ROI
          </h2>
          <p className="text-lg text-slate-400 mt-2 max-w-xl mx-auto">
            Drag the sliders to see monthly hours reclaimed and operational expenditures saved.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Controls */}
          <div className="lg:col-span-6 bg-surface/50 border border-slate-800/80 p-8 flex flex-col justify-between">
            <div className="space-y-8">
              {/* Slider 1: Hours */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Manual Hours / Week
                  </label>
                  <span className="text-xl font-bold text-cyan-400 font-mono">{hours} hrs</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>5 hrs</span>
                  <span>50 hrs</span>
                  <span>100 hrs</span>
                </div>
              </div>

              {/* Slider 2: Rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                    Employee Labor Rate
                  </label>
                  <span className="text-xl font-bold text-cyan-400 font-mono">${rate}/hr</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="150"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>$15/hr</span>
                  <span>$80/hr</span>
                  <span>$150/hr</span>
                </div>
              </div>

              {/* Selector: Risk/Error Level */}
              <div>
                <label className="text-sm font-semibold text-slate-300 mb-3 block flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-cyan-400" />
                  Manual Entry Error Risk
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Low', 'Medium', 'High'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setRiskFactor(level)}
                      className={`py-2 text-xs font-semibold uppercase tracking-wider font-mono transition-all duration-200 border cursor-pointer ${
                        riskFactor === level
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                          : 'border-slate-800 hover:border-slate-700 bg-slate-900/30 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-mono leading-relaxed">
                  *Higher risk accounts for costs linked to manual transcription errors, delays, and task re-runs.
                </p>
              </div>
            </div>

            <button
              onClick={() => onLockSavings(hours, rate)}
              className="mt-8 w-full border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-semibold py-3.5 transition-all duration-200 inline-flex items-center justify-center gap-2 rounded-none cursor-pointer"
            >
              Lock In These Savings
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            {/* Box 1: Hours Reclaimed */}
            <div className="bg-surface/40 border border-slate-800/80 p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-semibold mb-1">
                  Monthly Time Saved
                </p>
                <h4 className="text-lg font-bold text-slate-200">
                  Hours Reclaimed
                </h4>
              </div>
              <span className="text-3xl md:text-4xl font-extrabold text-cyan-400 font-mono">
                <Counter value={hoursSavedMonthly} suffix=" hrs" />
              </span>
            </div>

            {/* Box 2: Monthly Saved */}
            <div className="bg-surface/40 border border-slate-800/80 p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-semibold mb-1">
                  Monthly Capital Saved
                </p>
                <h4 className="text-lg font-bold text-slate-200">
                  Operational Budget Kept
                </h4>
              </div>
              <span className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 font-mono">
                $<Counter value={capitalSavedMonthly} />
              </span>
            </div>

            {/* Box 3: Annual ROI (Callout) */}
            <div className="glowing-border-container flex-1">
              <div className="glowing-border-inner bg-surface/90 border border-slate-800/80 p-8 flex flex-col justify-center h-full">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <p className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold">
                    Projected Annual Return
                  </p>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-slate-100 font-mono">
                  $<Counter value={capitalSavedAnnual} />
                </h3>
                <p className="text-slate-400 text-xs mt-4 leading-relaxed">
                  Based on a typical deploy timelines of 14 days, the automated integrations cover setup overhead and generate positive net-returns within your first 45 operational days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// Interactive Workflow Visualizer
// ==========================================

function WorkflowNode({ step }: { step: { role: string; label: string; detail: string; icon: React.ReactNode } }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="w-full md:w-64 bg-surface/85 backdrop-blur-sm border border-slate-800 p-6 flex flex-col items-center text-center hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.1)] transition-all duration-300 rounded-none cursor-default group"
    >
      <div className="w-12 h-12 bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-cyan-400 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 rounded-none">
        {step.icon}
      </div>
      <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 font-semibold mb-1">
        {step.role}
      </span>
      <h4 className="text-sm font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
        {step.label}
      </h4>
      <p className="text-xs text-slate-400 leading-relaxed">
        {step.detail}
      </p>
    </motion.div>
  );
}

function WorkflowVisualizer() {
  const [activeTab, setActiveTab] = useState<'leads' | 'billing' | 'support'>('leads');
  const activeFlow = WORKFLOWS.find(w => w.id === activeTab)!;

  return (
    <section id="visualizer" className="relative z-10 py-20 md:py-28 px-6 border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-mono">
            Technical Architecture
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
            How we automate operations
          </h2>
          <p className="text-lg text-slate-400 mt-2 max-w-xl mx-auto">
            Choose a pipeline model below to visualize automated pathways between SaaS integration points.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center border-b border-slate-800/80 mb-12 max-w-md mx-auto relative">
          {WORKFLOWS.map((flow) => (
            <button
              key={flow.id}
              onClick={() => setActiveTab(flow.id as 'leads' | 'billing' | 'support')}
              className="relative px-4 py-3 text-xs font-bold tracking-wider uppercase transition-colors duration-200 cursor-pointer flex-1"
            >
              <span className={activeTab === flow.id ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"}>
                {flow.title.split(' & ')[0]}
              </span>
              {activeTab === flow.id && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Canvas Visualizer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 max-w-4xl mx-auto w-full">
          {/* Node 1 */}
          <WorkflowNode step={activeFlow.steps[0]} />

          {/* SVG Connector 1 */}
          <div className="w-12 h-16 md:w-28 md:h-12 flex items-center justify-center pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
              </defs>
              <path d="M 0 50 L 100 50" className="hidden md:block" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
              <motion.path
                d="M 0 50 L 100 50"
                className="hidden md:block"
                stroke="url(#gradient-line)"
                strokeWidth="3"
                strokeDasharray="20 80"
                animate={{ strokeDashoffset: [-100, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
              <path d="M 50 0 L 50 100" className="block md:hidden" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
              <motion.path
                d="M 50 0 L 50 100"
                className="block md:hidden"
                stroke="url(#gradient-line)"
                strokeWidth="3"
                strokeDasharray="20 80"
                animate={{ strokeDashoffset: [-100, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          {/* Node 2 */}
          <WorkflowNode step={activeFlow.steps[1]} />

          {/* SVG Connector 2 */}
          <div className="w-12 h-16 md:w-28 md:h-12 flex items-center justify-center pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0 50 L 100 50" className="hidden md:block" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
              <motion.path
                d="M 0 50 L 100 50"
                className="hidden md:block"
                stroke="url(#gradient-line)"
                strokeWidth="3"
                strokeDasharray="20 80"
                animate={{ strokeDashoffset: [-100, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
              <path d="M 50 0 L 50 100" className="block md:hidden" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
              <motion.path
                d="M 50 0 L 50 100"
                className="block md:hidden"
                stroke="url(#gradient-line)"
                strokeWidth="3"
                strokeDasharray="20 80"
                animate={{ strokeDashoffset: [-100, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          {/* Node 3 */}
          <WorkflowNode step={activeFlow.steps[2]} />
        </div>
      </div>
    </section>
  );
}

// ==========================================
// Before / After Operational Comparison
// ==========================================

function BeforeAfterToggle() {
  return (
    <section id="before-after" className="relative z-10 py-20 md:py-28 px-6 border-t border-slate-800/50 bg-slate-950/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-mono">
            Pipeline Efficiency
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
            Manual delays vs. instant syncs
          </h2>
          <p className="text-lg text-slate-400 mt-2 max-w-xl mx-auto">
            See the performance differences when workflows run automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Manual Card */}
          <div className="border border-red-500/25 bg-red-950/5 p-8 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold font-mono text-red-400 uppercase bg-red-500/10 border border-red-500/20 px-3 py-1">
                  Manual Pipeline
                </span>
                <span className="text-xs font-bold text-red-500/80 font-mono">High-Risk Operations</span>
              </div>
              
              <ul className="space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-200 block mb-0.5">Manual Copy-Paste</span>
                    <p className="text-slate-400 text-xs leading-relaxed">Transcribing text fields from lead emails into CRM forms (15-20 mins per occurrence).</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-200 block mb-0.5">Siloed Database Updates</span>
                    <p className="text-slate-400 text-xs leading-relaxed">No API bridge. Administrative staff copy billing updates manually at the end of each day.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-200 block mb-0.5">Human Transcription Error</span>
                    <p className="text-slate-400 text-xs leading-relaxed">Typos, formatting bugs, duplicate entries, or missing metadata details in CRM pipelines.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-200 block mb-0.5">Operational Slack / Delay</span>
                    <p className="text-slate-400 text-xs leading-relaxed">Form responses sit in inbox logs for hours before reps manually assign priority ratings.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-red-500/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-red-400/80">
              <span>Avg. Duration: <strong>~4.5 Hours</strong></span>
              <span>Process Reliability: <strong>72.5%</strong></span>
            </div>
          </div>

          {/* Automated Card */}
          <div className="glowing-border-container">
            <div className="glowing-border-inner bg-surface/90 border border-slate-800/80 p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold font-mono text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-3 py-1">
                    Synthesis Automations
                  </span>
                  <span className="text-xs font-bold text-cyan-400 font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    Optimized Pipeline
                  </span>
                </div>

                <ul className="space-y-5 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200 block mb-0.5">API Instant Trigger</span>
                      <p className="text-slate-400 text-xs leading-relaxed">System fires webhook triggers matching form triggers instantly (&lt;0.1 sec event resolution).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200 block mb-0.5">AI Triage / LLM Parsing</span>
                      <p className="text-slate-400 text-xs leading-relaxed">Claude/GPT parses, structures, and scores unstructured data segments dynamically in flight.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200 block mb-0.5">Auto CRM & Slack Delivery</span>
                      <p className="text-slate-400 text-xs leading-relaxed">Dynamic writes populate CRM files + instant structured alerts delivered to Slack in real-time.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200 block mb-0.5">24/7/365 Runtime Continuity</span>
                      <p className="text-slate-400 text-xs leading-relaxed">Pipelines run autonomously day and night. Zero queues, zero human delays, zero manual handoffs.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-cyan-400/90">
                <span>Avg. Duration: <strong>&lt;1.8 Seconds</strong></span>
                <span>Process Reliability: <strong>100% Consistent</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// Terminal Console Logging Simulator
// ==========================================

interface TerminalConsoleProps {
  bottlenecks: string[];
  tools: string[];
  email: string;
  onClose: () => void;
}

function TerminalConsole({ bottlenecks, tools, email, onClose }: TerminalConsoleProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = [
      `[sys] Initializing Synthesis Operations Core v2.4.1...`,
      `[sys] Establishing secure handshake with API pathways...`,
      `[sys] Target account compiled: "${email}"`,
      `[sys] Analyzing operational constraints...`,
      ...bottlenecks.map(b => `[param] Bottleneck mapped: "${b}"`),
      ...tools.map(t => `[param] Integration node registered: ${t}`),
      `[sys] Simulating pipeline optimization path...`,
      `[sys] Compiling customized engineering blueprint...`,
      `[sys] Mapping webhook listeners and payload fields...`,
      `[SUCCESS] System architecture mapped. Full documentation compiled.`,
      `[SUCCESS] Deliverable dispatched to "${email}".`
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < lines.length) {
        setLogs(prev => [...prev, lines[currentIdx]]);
        currentIdx++;
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsDone(true);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [bottlenecks, tools, email]);

  return (
    <div className="bg-black/95 text-cyan-400 font-mono p-6 border border-cyan-500/30 rounded-none w-full shadow-[0_0_35px_rgba(6,182,212,0.15)] text-left">
      <div className="flex items-center justify-between border-b border-cyan-950 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-[10px] uppercase tracking-wider text-cyan-500 font-semibold">Synthesis Process Console</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 rounded-full bg-cyan-500/80" />
        </div>
      </div>
      <div ref={containerRef} className="h-64 overflow-y-auto space-y-2 text-xs scrollbar-none">
        {logs.map((log, index) => (
          <div key={index} className={log.includes('[SUCCESS]') ? 'text-emerald-400 font-bold' : log.includes('[param]') ? 'text-slate-400 pl-4' : 'text-cyan-400'}>
            {log}
          </div>
        ))}
        {!isDone && (
          <span className="inline-block w-1.5 h-3.5 bg-cyan-400 animate-pulse ml-0.5 align-middle" />
        )}
      </div>
      {isDone && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-cyan-500 text-black text-xs font-bold px-4 py-2 hover:bg-cyan-400 transition-colors duration-200 cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ==========================================
// Multi-Step Lead Audit Form
// ==========================================

interface MultiStepFormProps {
  prefillData: { hours: number; rate: number } | null;
  onClearPrefill: () => void;
  onSubmitSuccess: (bottlenecks: string[], tools: string[], email: string) => void;
}

function MultiStepAuditForm({ prefillData, onClearPrefill, onSubmitSuccess }: MultiStepFormProps) {
  const [step, setStep] = useState(1);
  const [selectedBottlenecks, setSelectedBottlenecks] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');

  const toggleBottleneck = (option: string) => {
    setSelectedBottlenecks(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const toggleTool = (option: string) => {
    setSelectedTools(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const nextStep = () => {
    setError('');
    if (step === 1 && selectedBottlenecks.length === 0) {
      setError('Please select at least one operational bottleneck to proceed.');
      return;
    }
    if (step === 2 && selectedTools.length === 0) {
      setError('Please select at least one core software application tool.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !company.trim()) {
      setError('Please fill in all contact information fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid business email address.');
      return;
    }

    if (isGenericDomain(email)) {
      setError('Please use your corporate company email domain.');
      return;
    }

    onSubmitSuccess(selectedBottlenecks, selectedTools, email);
  };

  return (
    <div className="w-full text-left">
      {/* Prefill locked banner */}
      {prefillData && (
        <div className="mb-6 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sparkles className="w-4 h-4 animate-pulse flex-shrink-0" />
            <span>Savings Blueprint Locked: <strong>{prefillData.hours} hrs/wk</strong> @ <strong>${prefillData.rate}/hr</strong></span>
          </div>
          <button 
            type="button" 
            onClick={onClearPrefill} 
            className="text-slate-400 hover:text-white underline text-[10px] cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}

      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div className={`h-1 flex-1 transition-colors duration-300 ${s <= step ? 'bg-cyan-500' : 'bg-slate-800'}`} />
            <span className={`text-[10px] font-mono font-bold ${s === step ? 'text-cyan-400' : s < step ? 'text-cyan-600' : 'text-slate-600'}`}>
              0{s}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-slate-100 mb-2 font-sans">
              Identify core operational bottlenecks
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Select all symptoms currently creating overhead inside your daily operations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {BOTTLENECK_OPTIONS.map((opt) => {
                const isSelected = selectedBottlenecks.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleBottleneck(opt)}
                    className={`p-4 border text-left flex items-start gap-3 transition-all duration-200 cursor-pointer rounded-none group ${
                      isSelected 
                        ? 'border-cyan-500 bg-cyan-500/5 shadow-[0_0_15px_rgba(6,182,212,0.05)]' 
                        : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 border flex items-center justify-center mt-0.5 transition-colors ${
                      isSelected ? 'border-cyan-500 bg-cyan-500' : 'border-slate-700'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-black stroke-[3px]" />}
                    </div>
                    <span className={`text-xs font-semibold ${isSelected ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {error && <p className="text-red-400 text-xs mb-4 font-mono">{error}</p>}

            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 transition-colors duration-200 cursor-pointer text-center text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-1"
            >
              Continue to Tech Stack
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-slate-100 mb-2 font-sans">
              Select your active software stack
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Which tools are involved in the manual workflows you wish to automate?
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {TOOL_OPTIONS.map((tool) => {
                const isSelected = selectedTools.includes(tool);
                return (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => toggleTool(tool)}
                    className={`p-3 border text-center flex flex-col items-center gap-2 transition-all duration-200 cursor-pointer rounded-none group ${
                      isSelected 
                        ? 'border-cyan-500 bg-cyan-500/5 shadow-[0_0_15px_rgba(6,182,212,0.05)]' 
                        : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
                    }`}
                  >
                    <span className={`text-xs font-semibold ${isSelected ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                      {tool.split(' / ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {error && <p className="text-red-400 text-xs mb-4 font-mono">{error}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-slate-200 font-bold py-3 transition-colors duration-200 cursor-pointer text-center text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-[2] bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 transition-colors duration-200 cursor-pointer text-center text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-1"
              >
                Continue to Contact
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-slate-100 mb-2 font-sans">
              Enter target business email
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Our engineering blueprints are compiled and delivered directly to verified business domains.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <label htmlFor="company" className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Acme Operations Corp"
                  className="w-full bg-background border border-slate-800 focus:border-cyan-500 text-slate-100 px-4 py-3 outline-none transition-colors duration-200 rounded-none focus:ring-1 focus:ring-cyan-500 text-sm font-sans"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Corporate Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-background border border-slate-800 focus:border-cyan-500 text-slate-100 px-4 py-3 outline-none transition-colors duration-200 rounded-none focus:ring-1 focus:ring-cyan-500 text-sm font-sans"
                />
              </div>

              {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-slate-200 font-bold py-3 transition-colors duration-200 cursor-pointer text-center text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 transition-colors duration-200 cursor-pointer text-center text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-1 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                >
                  Generate Blueprint
                  <Zap className="w-4 h-4 animate-pulse" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// Main App Shell Component
// ==========================================

function App() {
  const [lockedSavings, setLockedSavings] = useState<{ hours: number; rate: number } | null>(null);
  const [formSubmittedData, setFormSubmittedData] = useState<{ bottlenecks: string[]; tools: string[]; email: string } | null>(null);
  const [openFaq, setOpenFaq] = useState(0);
  
  const auditFormRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Coordinates spotlight listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // SEO Scroll Syncer for document title
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'hero', title: 'Synthesis | Custom AI Operations' },
        { id: 'marquee', title: 'Synthesis | Integrations' },
        { id: 'calculator', title: 'Synthesis | Savings Calculator' },
        { id: 'visualizer', title: 'Synthesis | How We Automate' },
        { id: 'before-after', title: 'Synthesis | Impact Case Study' },
        { id: 'process', title: 'Synthesis | Process Roadmap' },
        { id: 'faq', title: 'Synthesis | Common Questions' },
      ];
      
      const scrollPos = window.scrollY + 250;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            document.title = section.title;
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inject JSON-LD Schema markup
  useEffect(() => {
    const schemaId = 'synthesis-automation-schema-data';
    let script = document.getElementById(schemaId);
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.id = schemaId;
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Synthesis Automation",
        "description": "Custom AI workflow automation and systems integration engineering for business operations.",
        "url": "https://synthesisautomation.com",
        "logo": "https://synthesisautomation.com/logo.png",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US"
        },
        "priceRange": "$$$"
      });
      document.head.appendChild(script);
    }
  }, []);

  const scrollToAuditForm = () => {
    auditFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLockSavings = (hours: number, rate: number) => {
    setLockedSavings({ hours, rate });
    scrollToAuditForm();
  };

  const handleFormSubmitSuccess = (bottlenecks: string[], tools: string[], email: string) => {
    setFormSubmittedData({ bottlenecks, tools, email });
  };

  const handleCloseTerminal = () => {
    setFormSubmittedData(null);
    setLockedSavings(null);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const steps = [
    {
      number: '01',
      title: 'Short Introduction Call',
      description:
        'A focused 15-minute conversation to understand your current stack, constraints, and operational bottlenecks. No preparation required on your end.',
    },
    {
      number: '02',
      title: 'Zero Pitch Environment',
      description:
        'No product demonstrations, no urgency tactics, no sales timelines. This call exists solely to understand your situation.',
    },
    {
      number: '03',
      title: 'Clear Recommendations',
      description:
        'You receive a finalized engineering blueprint detailing API sequences, integration architecture, and projected ROI. Documented and yours to keep.',
    },
    {
      number: '04',
      title: 'You Dictate Next Steps',
      description:
        'Implement the roadmap with your internal team, or engage us to deploy it. The decision is entirely yours with no obligation attached.',
    },
  ];

  const faqs = [
    {
      question: 'Will this require us to change our existing software?',
      answer:
        'No. We connect to your existing tools via standard APIs and webhooks. No migrations, no replacements, no disruption to current workflows.',
    },
    {
      question: 'How is our data handled during the audit?',
      answer:
        'The audit is a review of your workflow architecture, not your data. Any automation we design operates entirely within your existing infrastructure. Nothing is extracted or stored externally.',
    },
    {
      question: 'Are we obligated to hire you after the audit?',
      answer:
        'Absolutely not. The engineering blueprint we produce is yours to keep and implement however you choose. There is no retainer, no follow-up pressure, and no obligation of any kind.',
    },
    {
      question: 'What types of businesses benefit most from this?',
      answer:
        'Operations-heavy businesses running 3 or more disconnected SaaS tools with manual handoff steps between them. Common examples include agencies, logistics coordinators, financial operations teams, and B2B service providers.',
    },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-slate-100 overflow-hidden font-sans">
      {/* Background patterns & spotlights */}
      <div className="absolute inset-0 grid-overlay opacity-30 z-0 pointer-events-none" />
      <div className="absolute inset-0 spotlight-overlay z-0 pointer-events-none" />

      {/* Floating Orbs */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none z-0"
      />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400 animate-pulse" />
            <span className="text-lg font-medium text-slate-100 font-sans tracking-wide">
              Synthesis Automation
            </span>
          </div>
          <button
            onClick={scrollToAuditForm}
            className="text-slate-400 hover:text-cyan-400 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer"
          >
            Request Audit
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section id="hero" className="relative z-10 py-20 md:py-32 px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6.5xl font-extrabold text-slate-100 leading-tight mb-8 tracking-tight font-sans"
            >
              We design custom AI workflows to stabilize and scale your operations.
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Eliminate manual data entry and fragmented pipelines. We map,
              engineer, and deploy automation infrastructure built around your
              existing stack.
            </motion.p>

            {/* Lead Magnet Card (Multi-Step Funnel OR Terminal Output) */}
            <motion.div
              ref={auditFormRef}
              variants={itemVariants}
              className="glowing-border-container max-w-2xl mx-auto"
            >
              <div className="glowing-border-inner bg-surface/95 backdrop-blur-sm p-8 md:p-10 text-left border border-slate-800/80">
                {formSubmittedData ? (
                  <TerminalConsole
                    bottlenecks={formSubmittedData.bottlenecks}
                    tools={formSubmittedData.tools}
                    email={formSubmittedData.email}
                    onClose={handleCloseTerminal}
                  />
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-slate-100 mb-4 tracking-tight">
                      Free Automation Audit
                    </h2>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-8">
                      We review your current software stack and manual workflows to
                      identify every viable integration opportunity. The resulting
                      engineering blueprint belongs to you — regardless of whether we
                      work together.
                    </p>
                    
                    <MultiStepAuditForm
                      prefillData={lockedSavings}
                      onClearPrefill={() => setLockedSavings(null)}
                      onSubmitSuccess={handleFormSubmitSuccess}
                    />
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Bar */}
        <section className="relative z-10 border-y border-slate-800/80 bg-surface/40 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 font-mono mb-2">
                <Counter value={500} suffix="+" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold font-mono">
                AI Workflows Deployed
              </span>
            </div>
            <div className="flex flex-col items-center justify-center border-y md:border-y-0 md:border-x border-slate-800/50 py-6 md:py-0">
              <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 font-mono mb-2">
                <Counter value={99.9} suffix="%" decimals={1} />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold font-mono">
                System Uptime
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 font-mono mb-2">
                <Counter value={10} suffix="k+" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold font-mono">
                Hours Saved
              </span>
            </div>
          </div>
        </section>

        {/* Integration Logo Marquee */}
        <IntegrationMarquee />

        {/* ROI Calculator */}
        <SavingsCalculator onLockSavings={handleLockSavings} />

        {/* Workflow Visualizer */}
        <WorkflowVisualizer />

        {/* Before / After Comparison */}
        <BeforeAfterToggle />

        {/* Process Section */}
        <section id="process" className="relative z-10 py-20 md:py-28 px-6 border-t border-slate-800/50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-mono">
                WHAT HAPPENS NEXT
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 tracking-tight">
                A transparent, zero-pressure sequence
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                from first contact to final deliverable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-surface/60 backdrop-blur-sm border border-slate-800/80 p-8 hover:border-cyan-500/30 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] transition-all duration-300 rounded-none cursor-default"
                >
                  <span className="text-5xl font-bold text-cyan-500/10 group-hover:text-cyan-500/25 mb-4 block transition-colors duration-300 font-mono">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 mb-3 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative z-10 py-20 md:py-28 px-6 border-t border-slate-800/50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-mono">
                COMMON QUESTIONS
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
                Frequently asked questions
              </h2>
            </div>

            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-slate-800/80 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left py-6 flex items-center justify-between gap-4 group cursor-pointer"
                  >
                    <span className="text-lg font-medium text-slate-200 group-hover:text-cyan-400 transition-colors duration-200">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-all duration-300 ${
                        openFaq === index ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'max-h-96 pb-6' : 'max-h-0'
                    }`}
                  >
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Closing CTA Section */}
        <section className="relative z-10 py-20 md:py-28 px-6 border-t border-slate-800/50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="glowing-border-container max-w-3xl mx-auto"
          >
            <div className="glowing-border-inner bg-surface/90 backdrop-blur-sm p-12 md:p-16 text-center border border-slate-800/80">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 tracking-tight">
                Ready to see what's possible?
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                The audit is free, the blueprint is yours, and the next step takes
                30 seconds.
              </p>
              <button
                onClick={scrollToAuditForm}
                className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-semibold px-10 py-4 transition-all duration-200 inline-flex items-center gap-2 rounded-none cursor-pointer"
              >
                Secure Your Free Automation Audit
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 py-8 text-center bg-background/80 backdrop-blur-sm">
        <p className="text-slate-600 text-sm">
          © 2025 Synthesis Automation. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
