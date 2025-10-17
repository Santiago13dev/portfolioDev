import { PixelImage } from "./ui/pixel-image";
import { motion } from "motion/react";

export const ArrowIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <motion.svg
      className={className}
      width="95"
      height="62"
      viewBox="0 0 95 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ rotate: 2 }}
      animate={{
        rotate: [2, 3, 0, 2],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <path
        d="M14.7705 15.8619C33.2146 15.2843 72.0772 22.1597 79.9754 54.2825"
        stroke="white"
        strokeWidth={3}
      />
      <path
        d="M17.7987 7.81217C18.0393 11.5987 16.4421 15.8467 15.5055 19.282C15.2179 20.3369 14.9203 21.3791 14.5871 22.4078C14.4728 22.7608 14.074 22.8153 13.9187 23.136C13.5641 23.8683 12.0906 22.7958 11.7114 22.5416C8.63713 20.4812 5.49156 18.3863 2.58664 15.9321C1.05261 14.6361 2.32549 14.1125 3.42136 13.0646C4.37585 12.152 5.13317 11.3811 6.22467 10.7447C8.97946 9.13838 12.7454 8.32946 15.8379 8.01289"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </motion.svg>
  );
};

const Profile = () => {
  return (
    <div className="relative flex justify-center">
      <PixelImage
        src="/profile.png"
        customGrid={{ rows: 12, cols: 8 }}
        grayscaleAnimation={true}
      />

      <div className="absolute top-[120px] left-[25px] md:top-[150px] md:left-[40px]">
        <span className="-mb-2 -ml-2.5 block w-fit -rotate-2 rounded bg-slate-200 px-1.5 py-0.5 text-xs text-black shadow">
          Enfoque
        </span>
        <ArrowIcon className="w-18 rotate-180 md:w-20" />
      </div>

      <div className="absolute top-[120px] right-[5px] md:top-[165px] md:right-[40px]">
        <span className="-mb-2 ml-7 block w-fit -rotate-2 rounded bg-slate-200 px-1.5 py-0.5 text-xs text-black shadow">
          Resiliencia
        </span>
        <ArrowIcon className="w-18 scale-x-[-1] -rotate-180 md:w-20" />
      </div>

      <div className="absolute top-[50px] right-[5px] md:top-[80px] md:right-[40px]">
        <span className="-mb-2 ml-10 block w-fit -rotate-2 rounded bg-slate-200 px-1.5 py-0.5 text-xs text-black shadow">
          Visión
        </span>
        <ArrowIcon className="w-18 scale-x-[-1] -rotate-180 md:w-20" />
      </div>
    </div>
  );
};

export default Profile;
