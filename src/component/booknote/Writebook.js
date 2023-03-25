import TestEditorForm from "./WriteEditor";

import "../../assets/css/component/note/Writebook.css";

import Layout from "./../../layout/Layout";
import { Container } from "react-bootstrap";

function Writebook() {
  return (
    <Layout>
      <div>
        <Container className="cs">
          <TestEditorForm></TestEditorForm>

          <div></div>
        </Container>
      </div>
    </Layout>
  );
}
export default Writebook;
