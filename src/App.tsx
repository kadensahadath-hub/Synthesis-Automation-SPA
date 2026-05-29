import { useState, useRef, useEffect } from 'react';
import { motion, Variants, useInView, animate } from 'framer-motion';
import { Zap, ChevronDown, ArrowRight } from 'lucide-react';

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

const buttonVariants: Variants = {
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

interface CounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
}

function Counter({ value, suffix = '', decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2.0,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setCount(latest);
      },
    });

    return () => controls.stop();
  }, [value, isInView]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

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

function App() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const auditFormRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const scrollToAuditForm = () => {
    auditFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (isGenericDomain(email)) {
      setError('Please use your company email address.');
      return;
    }

    setSuccess(true);
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
    <div ref={containerRef} className="relative min-h-screen bg-background text-slate-100 overflow-hidden">
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
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-background/90 backdrop-blur-md"
      >
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
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 md:py-32 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-100 leading-tight mb-8 tracking-tight"
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

          {/* Lead Magnet Card */}
          <motion.div
            ref={auditFormRef}
            id="audit-form"
            variants={itemVariants}
            className="glowing-border-container max-w-2xl mx-auto"
          >
            <div className="glowing-border-inner bg-surface/95 backdrop-blur-sm p-8 md:p-10 text-left border border-slate-800/80">
              <h2 className="text-2xl font-bold text-slate-100 mb-4 tracking-tight">
                Free Automation Audit
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                We review your current software stack and manual workflows to
                identify every viable integration opportunity. The resulting
                engineering blueprint belongs to you — regardless of whether we
                work together.
              </p>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-cyan-500/10 border border-cyan-500/30 p-6"
                >
                  <p className="text-cyan-400 font-medium">
                    You're confirmed. We'll be in touch within one business day to
                    schedule your 15-minute intro call.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-400 mb-2"
                      >
                        Business Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full bg-background border border-slate-700 focus:border-cyan-500 text-slate-100 px-4 py-3 outline-none transition-colors duration-200 rounded-none focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>
                    <div className="flex items-end">
                      <motion.button
                        type="submit"
                        variants={buttonVariants}
                        whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 transition-all duration-200 rounded-none whitespace-nowrap"
                      >
                        Request Audit
                      </motion.button>
                    </div>
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-3"
                    >
                      {error}
                    </motion.p>
                  )}
                </form>
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
            <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold font-mono">
              AI Workflows Deployed
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border-y md:border-y-0 md:border-x border-slate-800/50 py-6 md:py-0">
            <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 font-mono mb-2">
              <Counter value={99.9} suffix="%" decimals={1} />
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold font-mono">
              System Uptime
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 font-mono mb-2">
              <Counter value={10} suffix="k+" />
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold font-mono">
              Hours Saved
            </span>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative z-10 py-20 md:py-28 px-6 border-t border-slate-800/50">
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
                <p className="text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 md:py-28 px-6 border-t border-slate-800/50">
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
                  <p className="text-slate-400 leading-relaxed">
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
            <motion.button
              onClick={scrollToAuditForm}
              whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(6, 182, 212, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-semibold px-10 py-4 transition-all duration-200 inline-flex items-center gap-2 rounded-none cursor-pointer"
            >
              Secure Your Free Automation Audit
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </section>

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
