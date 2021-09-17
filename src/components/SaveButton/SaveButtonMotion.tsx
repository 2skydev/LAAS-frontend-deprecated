import { Button } from "antd";
import { motion } from "framer-motion";
import { memo } from "react";
import { SaveButtonStyled } from "./styled";

export default memo(
  function SaveButtonMotion({
    isEqual,
    onSubmit,
  }: {
    isEqual: boolean;
    onSubmit: () => void;
  }) {
    console.log(isEqual);

    if (isEqual) {
      return null;
    }

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
          type: "spring",
          stiffness: -1000,
          damping: 35,
        },
      },
    };

    return (
      <motion.div
        key="test"
        className="SaveButtonMotion"
        initial="init"
        animate="in"
        exit="out"
        variants={variants}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 1000,
          damping: 35,
        }}
      >
        <SaveButtonStyled>
          <span>저장하지 않은 변경 사항이 있어요!</span>

          <Button type="primary" onClick={onSubmit}>
            변경사항 저장하기
          </Button>
        </SaveButtonStyled>
      </motion.div>
    );
  },
  (prev, next) => prev.isEqual === next.isEqual
);
