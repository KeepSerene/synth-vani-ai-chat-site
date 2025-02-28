import { motion } from "framer-motion";

function CircularLoader({ classStr = "", size = "" }) {
  return (
    <div role="progressbar" className={`circular-loader ${classStr} ${size}`} />
  );
}

function LinearLoader({ classStr = "" }) {
  const linearLoaderVariant = {
    start: { scaleY: 0 },
    end: {
      scaleY: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.5,
        delay: 0.5,
        ease: "easeOut",
      },
    },
    finally: {
      scaleY: 0,
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
  };
  const activeIndicatorVariant = {
    start: {
      translateX: "-100%",
    },
    end: {
      translateX: "100%",
    },
  };

  return (
    <motion.div
      role="progressbar"
      variants={linearLoaderVariant}
      initial="start"
      animate="end"
      exit="finally"
      className={`linear-loader ${classStr}`}
    >
      <motion.div
        variants={activeIndicatorVariant}
        transition={{ duration: 1.5, ease: [0.2, 0, 0, 1], repeat: Infinity }}
        className="active-indicator"
      />
    </motion.div>
  );
}

export { CircularLoader, LinearLoader };
