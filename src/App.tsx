import { useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
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

function App() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const auditFormRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-background text-slate-100">
      {/* Navigation Header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="sticky top-0 z-50 w-full border-b border-slate-800 bg-background/95 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            <span className="text-lg font-medium text-slate-100">
              Synthesis Automation
            </span>
          </div>
          <button
            onClick={scrollToAuditForm}
            className="text-slate-400 hover:text-cyan-400 text-sm underline underline-offset-4 transition-colors duration-200"
          >
            Request Audit
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 leading-tight mb-8"
          >
            We design custom AI workflows to stabilize and scale your
            operations.
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
            className="bg-surface border border-slate-700 p-8 md:p-10 rounded-none text-left max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-slate-100 mb-4">
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
                      className="w-full bg-background border border-slate-700 focus:border-cyan-500 text-slate-100 px-4 py-3 outline-none transition-colors duration-200 rounded-none"
                    />
                  </div>
                  <div className="flex items-end">
                    <motion.button
                      type="submit"
                      variants={buttonVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 transition-colors duration-200 rounded-none whitespace-nowrap"
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
          </motion.div>
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28 px-6 border-t border-slate-800">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
              WHAT HAPPENS NEXT
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              A transparent, zero-pressure sequence
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              from first contact to final deliverable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-surface border border-slate-800 p-8"
              >
                <span className="text-5xl font-bold text-cyan-500/30 mb-4 block">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold text-slate-100 mb-3">
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
      <section className="py-20 md:py-28 px-6 border-t border-slate-800">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
              COMMON QUESTIONS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
              Frequently asked questions
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-0">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left py-6 flex items-center justify-between gap-4 group"
                >
                  <span className="text-lg font-medium text-slate-100 group-hover:text-cyan-400 transition-colors duration-200">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
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
          </motion.div>
        </motion.div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-20 md:py-28 px-6 border-t border-slate-800">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center bg-surface border border-slate-700 p-12 md:p-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
            Ready to see what's possible?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            The audit is free, the blueprint is yours, and the next step takes
            30 seconds.
          </p>
          <motion.button
            onClick={scrollToAuditForm}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-semibold px-10 py-4 transition-all duration-200 inline-flex items-center gap-2 rounded-none"
          >
            Secure Your Free Automation Audit
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center">
        <p className="text-slate-600 text-sm">
          © 2025 Synthesis Automation. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
