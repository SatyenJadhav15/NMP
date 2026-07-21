import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Heart,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { contactSchema, submitContact, type ContactInput } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact NMP+ | Get in Touch" },
      {
        name: "description",
        content:
          "Reach the Network of Maharashtra People with HIV. Ask about services, volunteering, TAAL+ Pharmacy, or how to donate.",
      },
      { property: "og:title", content: "Contact NMP+" },
      {
        property: "og:description",
        content: "Get in touch with NMP+ for support, volunteering, or donations.",
      },
    ],
  }),
  component: ContactPage,
});

const DETAILS = [
  {
    icon: MapPin,
    label: "Visit us",
    value: "401–404 Ganga Prestige Arcade, Laxmi Road, Nana Peth, Pune - 411002",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+91 20 - 2633 6087",
    href: "tel:+912026336087",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "info@nmpplus.net",
    href: "mailto:info@nmpplus.net",
  },
];

function ContactPage() {
  const send = useServerFn(submitContact);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    try {
      await send({ data: values });
      setSent(true);
      reset();
      toast.success("Message sent — we'll be in touch soon.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <main className="min-h-screen bg-hero-mesh">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left: intro + details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
              <Heart className="h-4 w-4" fill="currentColor" /> We're here to help
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
              Questions about our services, volunteering, TAAL+ Pharmacy, or
              donations? Send us a message and our team will respond with care.
            </p>

            <div className="mt-10 space-y-4">
              {DETAILS.map((d) => (
                <div
                  key={d.label}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="mt-1 block font-semibold text-foreground transition-colors hover:text-primary"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-semibold text-foreground">{d.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-9"
          >
            {sent ? (
              <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-9 w-9" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-extrabold text-foreground">
                  Thank you for reaching out
                </h2>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Your message has reached the NMP+ team. We'll get back to you as
                  soon as we can.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition-transform hover:scale-105"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" error={errors.name?.message}>
                    <input
                      {...register("name")}
                      className={`${inputBase} ${errors.name ? "border-destructive" : "border-input"}`}
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input
                      {...register("email")}
                      type="email"
                      className={`${inputBase} ${errors.email ? "border-destructive" : "border-input"}`}
                      placeholder="you@example.com"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Phone (optional)" error={errors.phone?.message}>
                    <input
                      {...register("phone")}
                      className={`${inputBase} ${errors.phone ? "border-destructive" : "border-input"}`}
                      placeholder="+91 ..."
                    />
                  </Field>
                  <Field label="Subject" error={errors.subject?.message}>
                    <input
                      {...register("subject")}
                      className={`${inputBase} ${errors.subject ? "border-destructive" : "border-input"}`}
                      placeholder="How can we help?"
                    />
                  </Field>
                </div>

                <Field label="Message" error={errors.message?.message}>
                  <textarea
                    {...register("message")}
                    rows={6}
                    className={`${inputBase} resize-none ${errors.message ? "border-destructive" : "border-input"}`}
                    placeholder="Tell us a little more..."
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send message <Send className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-foreground">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-sm text-destructive">{error}</span>}
    </label>
  );
}
