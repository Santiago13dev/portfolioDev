"use client";

import { useState } from "react";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/ui/terminal";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/section-heading";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const canSend = email.trim().length > 3 && message.trim().length > 4;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    
    try {
      setStatus("sending");
      
      const subject = `Contacto desde Portfolio - ${name || "Visitante"}`;
      const body = `Hola Kevin,

Me gustaría ponerme en contacto contigo.

Nombre: ${name || "No proporcionado"}
Email: ${email}

Mensaje:
${message}

---
Enviado desde tu portafolio web`;

      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      setTimeout(() => {
        setStatus("sent");
      }, 500);
    } catch {
      setStatus("error");
    }
  };

  const onReset = () => {
    setStep(0);
    setEmail("");
    setName("");
    setMessage("");
    setStatus("idle");
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setStep((step) => step + 1);
    }
  };

  return (
    <SectionHeading
      id="contact"
      text="Contacto"
      className="px-4 py-12 md:px-8"
    >
      <div className="absolute inset-0 size-full">
        <div className="before:bg-border after:bg-border relative h-full w-full before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-full after:absolute after:top-0 after:left-1/2 after:h-full after:w-0.5" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <form onSubmit={onSubmit} className="w-full">
          <Terminal className="max-h-none w-full max-w-none">
            {step >= 0 && (
              <>
                <div className="text-foreground/90 flex items-start gap-2 font-mono">
                  <span className="text-emerald-400">$</span>
                  <TypingAnimation startOnView duration={26}>
                    ¿Podrías compartir tu email?
                  </TypingAnimation>
                </div>
                <AnimatedSpan className="grid gap-2">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-emerald-400">↪</span>
                    <input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={handleEnter}
                      disabled={status === "sending" || status === "sent"}
                      autoComplete="email"
                      className="border-foreground/20 text-foreground placeholder:text-foreground/40 w-full rounded-md border bg-transparent px-3 py-2 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
                    />
                  </div>
                </AnimatedSpan>
              </>
            )}

            {step >= 1 && (
              <>
                <div className="text-foreground/90 flex items-start gap-2 font-mono">
                  <span className="text-sky-400">$</span>
                  <TypingAnimation duration={26}>
                    ¡Genial! ¿Y tu nombre?
                  </TypingAnimation>
                </div>
                <AnimatedSpan className="grid gap-2">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-sky-400">↪</span>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={handleEnter}
                      autoComplete="name"
                      className="border-foreground/20 text-foreground placeholder:text-foreground/40 w-full rounded-md border bg-transparent px-3 py-2 outline-none focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/30"
                    />
                  </div>
                </AnimatedSpan>
              </>
            )}

            {step >= 2 && (
              <>
                <div className="text-foreground/90 flex items-start gap-2 font-mono">
                  <span className="text-amber-400">$</span>
                  <TypingAnimation duration={26}>
                    Perfecto, ahora cuéntame sobre tu proyecto.
                  </TypingAnimation>
                </div>
                <AnimatedSpan className="grid gap-2">
                  <div className="flex items-start gap-2 font-mono">
                    <span className="mt-2 text-amber-400">↪</span>
                    <textarea
                      required
                      rows={4}
                      placeholder="Háblame sobre tu proyecto, timeline y objetivos..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="border-foreground/20 text-foreground placeholder:text-foreground/40 w-full resize-y rounded-md border bg-transparent px-3 py-2 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/30"
                    />
                  </div>
                </AnimatedSpan>
                <AnimatedSpan className="mt-2">
                  <div className="border-foreground/20 border-t border-dashed pt-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onReset}
                        className="border-foreground/20 bg-foreground/5 hover:bg-foreground/10 font-mono text-xs"
                      >
                        <X className="mr-1 h-3.5 w-3.5" />
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        disabled={
                          message.trim().length < 4 || status === "sending"
                        }
                        className="border-foreground/20 bg-primary/10 text-foreground hover:bg-primary/20 border-2 font-mono text-xs disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Send className="mr-1 h-3.5 w-3.5" />
                        {status === "sending"
                          ? "Enviando…"
                          : status === "sent"
                            ? "¡Enviado!"
                            : "Enviar"}
                      </Button>
                    </div>
                  </div>
                </AnimatedSpan>
              </>
            )}

            {status === "sent" && (
              <AnimatedSpan className="font-mono text-emerald-400/90">
                ✓ Mensaje enviado. Tu cliente de email se abrirá.
              </AnimatedSpan>
            )}
            {status === "error" && (
              <AnimatedSpan className="font-mono text-red-400/90">
                ⚠ Algo salió mal. Por favor intenta de nuevo.
              </AnimatedSpan>
            )}
          </Terminal>
        </form>
      </div>
    </SectionHeading>
  );
}
