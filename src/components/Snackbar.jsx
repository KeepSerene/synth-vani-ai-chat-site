import { AnimatePresence, motion } from "framer-motion";

const snackbarVariant = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.2,
      ease: [0.05, 0.7, 0.1, 1],
    },
  },
};

const snackbarChildVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function Snackbar({ snackbar }) {
  return (
    <AnimatePresence>
      {snackbar.isOpen && (
        <motion.div
          variants={snackbarVariant}
          initial="hidden"
          animate="visible"
          exit={{
            opacity: 0,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            },
          }}
          className={`snackbar ${snackbar.type}`}
        >
          <motion.p
            variants={snackbarChildVariant}
            transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
          >
            {snackbar.message}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Snackbar;
