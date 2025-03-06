import { motion } from "framer-motion";

function Skeleton() {
  const skeletonParentVariant = {
    start: {},
    end: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const skeletonChildVariant = {
    start: { opacity: 0.5 },
    end: { opacity: 1 },
  };

  return (
    <motion.div variants={skeletonParentVariant} initial="start" animate="end">
      {[1, 2, 3].map((count) => (
        <motion.div
          key={count}
          variants={skeletonChildVariant}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="skeleton"
        />
      ))}
    </motion.div>
  );
}

export default Skeleton;
