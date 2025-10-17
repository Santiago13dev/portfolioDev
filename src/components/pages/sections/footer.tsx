"use client";

import { Logo } from "@/components/ui/logo";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import dayjs from "dayjs";
import { motion } from "motion/react";
import { siteConfig } from "@/config/site";

const Footer = () => {
  const socialLinks = [
    {
      icon: Github,
      href: siteConfig.github,
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: siteConfig.linkedin,
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: siteConfig.twitter,
      label: "X (Twitter)",
    },
    {
      icon: Mail,
      href: `mailto:${siteConfig.email}`,
      label: "Email",
    },
  ];

  return (
    <footer className="border-t px-4 py-3.5 md:px-8">
      <div className="text-foreground/70 flex flex-col items-center justify-between gap-3 text-sm md:flex-row">
        <div className="inline-flex items-center gap-2">
          <Logo className="w-10" />
          <span>© {dayjs().year()} Kevin Rodriguez</span>
        </div>

        <div className="inline-flex items-center gap-4">
          <div className="inline-flex overflow-hidden rounded-md border *:size-8 *:border-r last:*:border-r-0">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-foreground/60 hover:bg-muted/30 hover:text-foreground inline-flex items-center justify-center transition-colors"
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <motion.a
            href="#home"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="hover:bg-foreground/5 rounded-md border px-2 py-1 transition-all"
          >
            Volver arriba
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
