import { Button } from "antd";
import { SaveButtonStyled, GlobalStyled } from "./styled";
import deepEqual from "deep-equal";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  defaultValues: any;
  formikValues: any;
  onSubmit: () => void;
}

export default function SaveButton({
  defaultValues,
  formikValues,
  onSubmit,
}: Props) {
  const isEqual = deepEqual(defaultValues, formikValues);

  const variants = {
    init: {
      opacity: 0,
      y: 100,
    },

    in: {
      opacity: 1,
      y: 0,
    },

    out: {
      opacity: 0,
      y: 100,
      transition: {
        ease: "backIn",
      },
    },
  };

  return (
    <AnimatePresence>
      <GlobalStyled />

      {!isEqual && (
        <motion.div
          key="SaveButtonMotion"
          className="SaveButtonMotion"
          initial="init"
          animate="in"
          exit="out"
          variants={variants}
          transition={{
            duration: 0.3,
            ease: "backOut",
          }}
        >
          <SaveButtonStyled>
            <span>저장하지 않은 변경 사항이 있어요!</span>

            <Button type="primary" onClick={onSubmit}>
              변경사항 저장하기
            </Button>
          </SaveButtonStyled>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
