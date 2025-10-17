"use client";

import { siteConfig } from "@/config/site";
import useScreenSize from "@/hooks/use-screen-size";
import type {  Song } from "@/types";
import { useIsClient } from "@uidotdev/usehooks";
import { Mail, Twitter, Linkedin } from "lucide-react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import React, { useState, useMemo, useRef, useCallback } from "react";
import { BackgroundNoise } from "../shared/backgrounds";
import { Logo } from "../ui/logo";
import { ThemeToggleButton2 } from "../theme-toggle";
import { cn, getRandomElement } from "@/lib/utils";
import env from "@/config/env";
import Link from "next/link";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import PlaydateConsole, {
  DpadButtonLabel,
  ActionButtonLabel,
} from "../ui/playdate-console";
import chunk from "lodash/chunk";
import { useQuery } from "@tanstack/react-query";
import type { SnakeGameHandle } from "@/components/snake-game";
import { Eyes } from "../ui/robot-eyes";
import SpeechBubble from "../ui/speech-bubble";
import { Typewriter } from "../ui/typewriter";
import { IntroSplash } from "../shared/intro-splash";
import { useRouter } from "next/navigation";
import axios from "axios";

// dynamic imports
const Particles = dynamic(() => import("@/components/ui/particles"), {
  ssr: false,
});

const MusicPlayer = dynamic(() => import("@/components/music-player"), {
  ssr: false,
});

const SnakeGame = dynamic(() => import("@/components/snake-game"), {
  ssr: false,
});

// Constants
const MotionLink = motion.create(Link);
const menuItems = ["portfolio", "play", "resume", "music"] as const;
type MenuItem = (typeof menuItems)[number];
type ConsoleNavigation = "main" | "music" | "play" | "portfolio";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.5,
      type: "spring",
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const slideInBottom: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const socialLinks = [
  { icon: Mail, label: "Email", link: `mailto:${siteConfig.email}` },
  { icon: Twitter, label: "Twitter", link: siteConfig.twitter },
  { icon: Linkedin, label: "LinkedIn", link: siteConfig.linkedin },
];

const MainScreen: React.FC<{
  selectedItem: MenuItem;
  onItemSelect: (item: MenuItem) => void;
}> = ({ selectedItem, onItemSelect }) => (
  <motion.div
    key="main"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="size-full"
  >
    {/* Background */}
    <img
      alt="console-background"
      src="/console-background.png"
      className="absolute inset-0 size-full object-cover object-center"
    />

    {/* Robot */}
    <div className="absolute -bottom-2.5 left-4 z-20 w-28 max-sm:w-24">
      <img src="/robot-pixelated.png" alt="robot" className="w-full" />
      <Eyes
        className="absolute top-[28%] left-[35%]"
        classes={{
          eye: "h-[12px] w-2.5 origin-center   max-sm:h-[10px] max-sm:w-2",
        }}
        lookAround={{
          enabled: true,
          sequence: {
            scaleY: [1, 0.1, 1, 1, 1, 0.1, 1, 1, 1, 0.1, 1, 1],
            x: [0, 0, 0, -2, -2, -2, -2, 2, 2, 2, 2, 0],
            times: [
              0, 0.05, 0.1, 0.3, 0.35, 0.4, 0.45, 0.65, 0.7, 0.75, 0.8, 1,
            ],
          },
        }}
      />
    </div>

    {/* Speech Bubbles  */}
    <div className="absolute top-1 right-2 inline-flex flex-col items-start max-md:right-1 max-md:!items-end max-sm:right-0.5 max-sm:text-xs">
      <SpeechBubble className="text-left max-md:self-start" bg="#F6EAC5">
        {selectedItem === "music" ? (
          "Hm..? Play a music?"
        ) : selectedItem === "play" ? (
          "Play snake game!"
        ) : (
          <>
            Hi! , I am{" "}
            <Typewriter
              text={["a developer", "Siddharth", "Stark"]}
              speed={70}
              waitTime={1500}
              deleteSpeed={40}
              cursorChar={"_"}
            />
          </>
        )}
      </SpeechBubble>
      <SpeechBubble direction="left" className="max-sm:max-w-48" bg="#F6EAC5">
        {/* Menu */}
        <div className="grid w-full grid-cols-2 grid-rows-2 gap-2 md:w-48">
          {menuItems.map((item) => (
            <span
              key={item}
              className="inline-flex cursor-pointer items-center gap-0.5"
              onClick={() => onItemSelect(item)}
            >
              {selectedItem === item && (
                <motion.svg
                  fill="#000000"
                  className="-mb-0.5 size-4"
                  viewBox="0 0 22 22"
                  xmlns="http://www.w3.org/2000/svg"
                  id="memory-chevron-right"
                  initial={{ x: -10, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: -10, opacity: 0, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <path d="M10 6V5H9V4H7V6H8V7H9V8H10V9H11V10H12V12H11V13H10V14H9V15H8V16H7V18H9V17H10V16H11V15H12V14H13V13H14V12H15V10H14V9H13V8H12V7H11V6" />
                </motion.svg>
              )}
              <span>{item}</span>
            </span>
          ))}
        </div>
      </SpeechBubble>
    </div>

    {/* Control Hints */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="dark absolute right-3 bottom-3 z-20"
    >
      <div className="text-foreground/40 space-y-0.5 text-right text-[8px]">
        <div>↑↓←→ Navigate</div>
        <div>A: Select • B: Back</div>
        <div className="text-foreground/20 mt-1">v1.0.0</div>
      </div>
    </motion.div>
  </motion.div>
);

const HomePage = () => {
  const [currentConsoleNavigation, setCurrentConsoleNavigation] =
    useState<ConsoleNavigation>("main");
  const [selectedItem, setSelectedItem] = useState<MenuItem>("portfolio");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [song, setSong] = useState<Song | null>(null);

  const snakeRef = useRef<SnakeGameHandle | null>(null);
  const consoleRef = useRef<HTMLDivElement | null>(null);

  const isClient = useIsClient();
  const { resolvedTheme, setTheme } = useTheme();
  const screenSize = useScreenSize();
  const router = useRouter();

  const { data: musicPlaylist } = useQuery<Song[]>({
    queryKey: ["music-playlist"],
    queryFn: async () => {
      const res = await axios.get<Song[]>("/data/playlist.json");
      const data = res.data;
      setSong(getRandomElement(data));
      return data;
    },
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const particleColors = useMemo(
    () =>
      resolvedTheme === "dark"
        ? [
            "#BEBB53",
            "#1C2938",
            "#172795",
            "#DE5D4E",
            "#C13567",
            "#10BC89",
            "#3AD47B",
            "#463199",
          ]
        : [
            "#d0c87a",
            "#88a6c9",
            "#8aa1ff",
            "#ff8a78",
            "#d56b96",
            "#2acfa4",
            "#60e09a",
            "#7e6bf2",
          ],
    [resolvedTheme],
  );

  /**
   * Finds the position of a menu item in the grid
   */
  const findMenuItemPosition = useCallback((item: MenuItem) => {
    const menuGrid = chunk(menuItems, 2);

    for (let row = 0; row < menuGrid.length; row++) {
      const col = menuGrid[row].indexOf(item);
      if (col !== -1) return { row, col, grid: menuGrid };
    }

    return null;
  }, []);

  /**
   * Gets the next menu item based on direction
   */
  const getNextMenuItem = useCallback(
    (currentItem: MenuItem, direction: DpadButtonLabel): MenuItem | null => {
      const position = findMenuItemPosition(currentItem);
      if (!position) return null;

      const { row, col, grid } = position;

      const navigationMap = {
        right: () => (col + 1 < grid[row].length ? grid[row][col + 1] : null),
        left: () => (col - 1 >= 0 ? grid[row][col - 1] : null),
        up: () =>
          row - 1 >= 0 && col < grid[row - 1].length
            ? grid[row - 1][col]
            : null,
        down: () =>
          row + 1 < grid.length && col < grid[row + 1].length
            ? grid[row + 1][col]
            : null,
      };

      return navigationMap[direction]?.() || null;
    },
    [findMenuItemPosition],
  );

  const handleDpadButtonClick = useCallback(
    (action: DpadButtonLabel) => {
      if (currentConsoleNavigation === "play") {
        snakeRef.current?.handleDpad(action);
        return;
      }

      if (currentConsoleNavigation !== "main") return;

      const nextItem = getNextMenuItem(selectedItem, action);
      if (nextItem) {
        setSelectedItem(nextItem);
      }
    },
    [currentConsoleNavigation, selectedItem, getNextMenuItem],
  );

  const handleActionButtonClick = useCallback(
    (action: ActionButtonLabel) => {
      if (action === "A") {
        if (currentConsoleNavigation === "music") {
          setIsMusicPlaying((prev) => !prev);
          return;
        }

        if (currentConsoleNavigation === "play") {
          snakeRef.current?.restart();
          return;
        }

        const navigationActions: Record<MenuItem, () => void> = {
          music: () => setCurrentConsoleNavigation("music"),
          play: () => setCurrentConsoleNavigation("play"),
          portfolio: () => {
            router.push("/portfolio");
            // setCurrentConsoleNavigation("portfolio")
          },
          resume: () => {
            const resumeUrl = "/resume.pdf";
            window.open(resumeUrl, "_blank");
          },
        };

        navigationActions[selectedItem]?.();
        return;
      }

      if (action === "B") {
        if (currentConsoleNavigation === "music" && musicPlaylist) {
          setIsMusicPlaying(false);
          setSong(getRandomElement(musicPlaylist));
        }

        setCurrentConsoleNavigation("main");
      }
    },
    [currentConsoleNavigation, selectedItem, musicPlaylist],
  );

  const renderConsoleScreen = useCallback(() => {
    const screenConfig = {
      music: song && (
        <MusicPlayer
          key={song.url}
          isPlaying={isMusicPlaying}
          src={song.url}
          artist={song.channel || "N/A"}
          trackTitle={song.title}
          coverImage={song.cover}
          className="absolute inset-0"
        />
      ),
      play: <SnakeGame ref={snakeRef} className="absolute inset-0" />,
      // TODO
      portfolio: <IntroSplash />,
      main: (
        <MainScreen
          selectedItem={selectedItem}
          onItemSelect={setSelectedItem}
        />
      ),
    };

    const content = screenConfig[currentConsoleNavigation];

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentConsoleNavigation}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={cn("size-full", {
            "@container absolute top-0 left-0":
              currentConsoleNavigation === "portfolio",
          })}
        >
          {content}
        </motion.div>
      </AnimatePresence>
    );
  }, [currentConsoleNavigation, selectedItem, song, isMusicPlaying]);

  return (
    <main className="no-scrollbar font-pixelify grid-center border-border text-foreground bg-background relative size-full h-dvh overflow-hidden [--background:white] [--border:var(--color-foreground)] dark:[--background:#0B0B0F] dark:[--border:#F6EAC5] dark:[--foreground:#F6EAC5]">
      {/* Navigation */}
      <nav className="flex-between absolute top-0 left-0 z-50 w-full gap-4 px-3 py-2.5 md:px-8 md:py-3.5">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInLeft}
          transition={{ delay: 0.1 }}
        >
          <Logo href="/" className="w-12 md:w-16" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInRight}
          transition={{ delay: 0.2 }}
        >
          {isClient && (
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="bg-background border-border/15 dark:hover:border-border inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-sm transition-all duration-300 hover:border-zinc-900/30 max-sm:rounded-lg max-sm:p-2 md:px-3"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(255,255,255,0.08), transparent)",
              }}
              aria-label="Toggle theme"
            >
              <ThemeToggleButton2
                className="w-3.5"
                theme={(resolvedTheme as "light" | "dark") || "light"}
              />
              <span className="hidden sm:inline">
                {resolvedTheme === "dark" ? "Light" : "Dark"} mode
              </span>
            </button>
          )}
        </motion.div>
      </nav>

      {/* Decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 z-10">
          <Particles
            particleColors={particleColors}
            particleCount={
              screenSize.lessThanOrEqual("md")
                ? 150
                : screenSize.lessThanOrEqual("lg")
                  ? 200
                  : 300
            }
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={true}
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.6))] opacity-20 mix-blend-multiply dark:bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(0,0,0,0.8))] dark:mix-blend-normal" />

        <div
          className="absolute inset-0 z-0 opacity-100 dark:opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(#F6EAC5 1px, transparent 1px),
              linear-gradient(90deg, #F6EAC5 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        <BackgroundNoise
          className="z-20"
          patternSize={300}
          patternRefreshInterval={3}
          patternAlpha={8}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-50"
      >
        <PlaydateConsole
          onDpadButtonClick={handleDpadButtonClick}
          onActionButtionClick={handleActionButtonClick}
          isPlaying={isMusicPlaying}
        >
          <div className="relative size-full overflow-hidden" ref={consoleRef}>
            <BackgroundNoise className="relative z-30" />
            {renderConsoleScreen()}
          </div>
        </PlaydateConsole>
      </motion.div>

      {/* Status bar */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        transition={{ delay: 0.6 }}
        className="absolute bottom-5 left-1/2 z-50 -translate-x-1/2 max-md:hidden"
      >
        <div className="dark:bg-background/30 border-border/15 flex items-center gap-3 rounded-full border px-4 py-1.5 backdrop-blur-md md:gap-4 md:px-6 md:py-2">
          <div className="flex items-center gap-2">
            <div
              className={cn("size-2 animate-pulse rounded-full bg-green-500", {
                "bg-red-500": !env.NEXT_PUBLIC_AVAILABLE_STATUS,
              })}
            />
            <span className="text-xs">
              {env.NEXT_PUBLIC_AVAILABLE_STATUS
                ? "Available for work"
                : "Currently not Available"}
            </span>
          </div>
          <div className="bg-foreground/20 h-4 w-px" />
          <span className="text-xs">Full Stack Developer</span>
        </div>
      </motion.div>

      {/* Social links */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInBottom}
        className="absolute bottom-3 left-3 z-50 md:bottom-5 md:left-5"
      >
        <div className="flex gap-2 md:gap-3">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative transition-all duration-300 hover:-translate-y-2 hover:scale-110 active:scale-95"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              aria-label={social.label}
            >
              <div
                className="bg-background/60 border-border/15 dark:hover:border-border/30 rounded-lg border p-2 text-lg shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-sm transition-all"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(255,255,255,0.08), transparent)",
                }}
              >
                <social.icon size={15} />
              </div>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                {social.label}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Portfolio Link */}
      <MotionLink
        href={"/portfolio"}
        initial="hidden"
        animate="visible"
        variants={slideInRight}
        transition={{ delay: 0.5 }}
        className="absolute right-0 bottom-3 z-50 md:bottom-5"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <InteractiveHoverButton
          text="Portfolio"
          className="bg-background/60 border-border/15 hover:border-border/30 rounded-l-full border-r-0 p-1.5 px-3 shadow-[0_0_5px_5px_rgba(255,255,255,0.06)_inset] backdrop-blur-sm transition-all md:p-2 md:px-4"
        />
      </MotionLink>
    </main>
  );
};

export default HomePage;
