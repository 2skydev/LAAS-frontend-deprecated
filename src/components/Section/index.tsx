import { Col, Row } from "antd";
import { ReactNode } from "react";
import { SectionStyled } from "./styled";

interface Props {
  children?: ReactNode;
  title: string;
  desc?: string;
}

export default function Section({ title, desc, children }: Props) {
  return (
    <SectionStyled className="section">
      <Row gutter={16}>
        <Col className="section-left" span={10}>
          <h3 className="title">{title}</h3>

          {desc && <p>{desc}</p>}
        </Col>

        <Col span={14}>{children}</Col>
      </Row>
    </SectionStyled>
  );
}
