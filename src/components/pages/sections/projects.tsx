"use client";

import SectionHeading from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HeadingLine from "@/components/ui/heading-line";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Github, ArrowUpRight, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

const Projects = () => {
  const projects = [
    {
      title: "Crypto Search",
      description:
        "Terminal retro de criptomonedas con red social integrada para traders y entusiastas del crypto.",
      tags: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
      github: "https://github.com/Santiago13dev/crypto-search",
      image: "/projects/crypto-search.png",
      live: null,
      date: "Mayo-2025",
      status: "completed",
    },
    {
      title: "Premium Catalogo IA 🚀",
      description:
        "Una plataforma moderna y completa para descubrir, evaluar y utilizar componentes de IA — frontend en React + Vite y backend en Node/Express con integración para modelos y APIs de terceros.",
      tags: ["React", "Node.js", "MongoDB", "JavaScript"],
      github: "https://github.com/Santiago13dev/premiumcatalogoia",
      image: "/projects/catalogo-IA.Premium.png",
      live: null,
      date: "Agosto-2025",
      status: "completed",
    },
    {
      title: "SismoView",
      description:
        "Página web para visualizar simulaciones sísmicas y de tsunami en un globo 3D con estadísticas en tiempo real.",
      tags: ["React", "Next.js", "Three.js", "Spring Boot", "Java", "TypeScript"],
      github: "https://github.com/Santiago13dev/SismoView",
      image: "/projects/SismoView.png",
      live: null,
      date: "Agosto-2024",
      status: "completed",
    },
    {
      title: "crypto-Chat",
      description:
        "plataforma de mensajería segura que implementa encriptación de extremo a extremo (E2E) con arquitectura Zero-Knowledge.",
      tags: ["Jest", "Next.js", "Express", "Spring Boot", "Docker", "TypeScript"],
      github: "https://github.com/Santiago13dev/criptochat",
      image: "/projects/cryptoChat.png",
      live: null,
      date: "Junio-2025",
      status: "completed",
    },
    {
      title: "DeepShop",
      description:
        "plataforma de e-commerce completa y profesional construida con las últimas tecnologías web.",
      tags: ["Angular", "Next.js", "Node.js", "Swagger ", "Supabase", "TypeScript"],
      github: "https://github.com/Santiago13dev/DeepShop",
      image: "/projects/DeepShop.png",
      live: null,
      date: "Octubre-2025",
      status: "completed",
    },
  ];

  const tagColors = {
    "Next.js": "bg-blue-500/10 text-blue-600 border-blue-500/30",
    TypeScript: "bg-orange-500/10 text-orange-600 border-orange-500/30",
    Tailwind: "bg-cyan-500/10 text-cyan-600 border-cyan-500/30",
    PostgreSQL: "bg-purple-500/10 text-purple-600 border-purple-500/30",
    React: "bg-blue-400/10 text-blue-500 border-blue-400/30",
    "Node.js": "bg-green-500/10 text-green-600 border-green-500/30",
    MongoDB: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    JavaScript: "bg-yellow-400/10 text-yellow-500 border-yellow-400/30",
    "Three.js": "bg-black/10 text-gray-700 border-black/30 dark:text-gray-300",
    "Spring Boot": "bg-green-600/10 text-green-700 border-green-600/30",
    Java: "bg-red-500/10 text-red-600 border-red-500/30",
    Express: "bg-gray-500/10 text-gray-600 border-gray-500/30",
    Python: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
    Django: "bg-green-600/10 text-green-700 border-green-600/30",
    Firebase: "bg-amber-500/10 text-amber-600 border-amber-500/30",
    API: "bg-indigo-500/10 text-indigo-600 border-indigo-500/30",
  };

  return (
    <SectionHeading id="projects" text="Proyectos">
      <div className="divide-y">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="grid lg:grid-cols-2">
              {/* Image Side  */}
              <div className="bg-muted/20 relative overflow-hidden border-b lg:border-r lg:border-b-0">
                {/* Cross pattern */}
                <div className="absolute inset-0">
                  <div className="before:bg-border after:bg-border relative h-full w-full before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-full after:absolute after:top-0 after:left-1/2 after:h-full after:w-0.5" />
                </div>

                {/* Image Container */}
                <div className="relative inset-0 z-10 p-8 md:p-12 lg:p-16">
                  <div className="group/image relative">
                    {/* Frame corners */}
                    <div className="border-foreground/20 absolute -top-2 -left-2 h-8 w-8 border-t-2 border-l-2 transition-all group-hover:-top-3 group-hover:-left-3" />
                    <div className="border-foreground/20 absolute -top-2 -right-2 h-8 w-8 border-t-2 border-r-2 transition-all group-hover:-top-3 group-hover:-right-3" />
                    <div className="border-foreground/20 absolute -bottom-2 -left-2 h-8 w-8 border-b-2 border-l-2 transition-all group-hover:-bottom-3 group-hover:-left-3" />
                    <div className="border-foreground/20 absolute -right-2 -bottom-2 h-8 w-8 border-r-2 border-b-2 transition-all group-hover:-right-3 group-hover:-bottom-3" />

                    {/* Main image */}
                    <div className="bg-background relative overflow-hidden border-2">
                      <div className="relative h-[400px] overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Overlay gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side  */}
              <div className="relative flex flex-col justify-center overflow-hidden p-8 md:p-12 lg:p-16">
                {/* Date & Status */}
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <time className="text-muted-foreground font-mono text-xs">
                    {project.date}
                  </time>
                  <div className="bg-border h-4 w-px" />
                  <div className="inline-flex items-center gap-1.5">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        project.status === "completed"
                          ? "animate-pulse bg-green-500"
                          : "animate-pulse bg-yellow-500",
                      )}
                    />
                    <span className="text-muted-foreground font-mono text-xs uppercase">
                      {project.status === "completed" ? "Completado" : "En Progreso"}
                    </span>
                  </div>
                </div>

                {/* Title  */}
                <div className="mb-6">
                  <h3 className="font-incognito text-3xl font-bold lg:text-4xl">
                    {project.title}
                  </h3>
                  <HeadingLine className="mt-3" />
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed md:text-base">
                  {project.description}
                </p>

                {/* Tags  */}
                <div className="mb-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={cn(
                        "border font-mono text-xs",
                        tagColors[tag as keyof typeof tagColors],
                      )}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/*  Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    variant="default"
                    size="lg"
                    className="group/btn relative border-2 font-medium"
                    disabled={!project.github}
                  >
                    <a
                      href={project.github || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Ver Código
                      <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </Button>

                  {project.live && (
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="group/btn border-2 font-medium"
                    >
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Ver Demo
                        <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    </Button>
                  )}
                </div>

                {/*  slanted lines */}
                <div className="absolute -right-4 -bottom-32 w-full translate-x-1/4 translate-y-1/4 rotate-[-30deg]">
                  {/* 1st Line */}
                  <div className="to-background border-primary/80 from-primary via-primary/90 -ml-[4px] h-12 w-full border-t bg-linear-to-r via-30% transition-transform duration-300 group-hover:-translate-y-1" />

                  {/* 2nd Line */}
                  <div className="to-background border-primary/80 from-primary via-primary/90 -ml-[8px] h-12 w-full border-t bg-linear-to-r via-30% transition-transform duration-300 group-hover:-translate-y-3" />

                  {/* 3rd Line */}
                  <div className="to-background border-primary/80 from-primary via-primary/90 -ml-[12px] h-12 w-full border-t bg-linear-to-r via-30% transition-transform duration-300 group-hover:-translate-y-5" />

                  {/* 4th Line */}
                  <div className="to-background border-primary/80 from-primary via-primary/90 -ml-[16px] h-12 w-full border-t bg-linear-to-r via-30% transition-transform duration-300 group-hover:-translate-y-7" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Projects */}
      <div className="border-t">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-12 text-center"
        >
          <Button asChild variant="ghost" size="lg" className="group font-mono">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="bg-foreground/40 mr-2 inline-block h-px w-8 transition-all group-hover:w-12" />
              VER TODOS LOS PROYECTOS EN GITHUB
              <span className="bg-foreground/40 ml-2 inline-block h-px w-8 transition-all group-hover:w-12" />
            </a>
          </Button>
        </motion.div>
      </div>
    </SectionHeading>
  );
};

export default Projects;
