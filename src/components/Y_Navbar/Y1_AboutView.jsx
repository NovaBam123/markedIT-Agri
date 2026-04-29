import { Button, Container } from "react-bootstrap";
import { ArrowBigLeftDash } from "lucide-react";

function AboutView({ onBack }) {
  return (
    <Container className="text-light about-view py-2">
      <h4 className="my-2 ms-1 border-bottom border-secondary pb-2 text-info">
        About App
      </h4>

      <div className="p-3 rounded border border-secondary bg-secondary bg-opacity-10">
        {/* Header App */}
        <div className="mb-2">
          <h5 className="fw-bold m-0">Marked
            <span>IT Agri</span>
            </h5>
          <span className="badge bg-info text-dark mb-2">v1.0.0</span>
        </div>

        {/* Intro */}
        <p className="text-white opacity-90 mb-4">
          MarkedIT Agri is a Progressive Web App (PWA) engineered specifically
          for agronomist and agricultural field research. It functions as a lightweight,
          offline-first Markdown editor designed to handle structured data
          logging in remote field conditions.
        </p>

        {/* Core Architecture */}
        <div className="mb-2">
          <h6 className="text-info fw-bold mb-1 text-uppercase small tracking-wide">
            Core Architecture
          </h6>
          <div className="d-flex flex-column gap-1 small">
            <div className="ps-3 border-start border-info border-3">
              <div className="fw-bold text-white">Offline-First</div>
              <div className="opacity-75">
                Prioritizing data entry in zero-connectivity environments.
              </div>
            </div>
            <div className="ps-3 border-start border-info border-3">
              <div className="fw-bold text-white">Markdown-Based</div>
              <div className="opacity-75">
                Standardized text engine for data consistency.
              </div>
            </div>
            <div className="ps-3 border-start border-info border-3">
              <div className="fw-bold text-white">Sync-Ready</div>
              <div className="opacity-75">
                Seamless cloud push once connectivity is re-established.
              </div>
            </div>
          </div>
        </div>

        {/* Value Prop */}
        <div className="bg-info p-2 rounded small opacity-75 fst-italic text-dark fw-semibold mt-4">
          Built to bridge the gap between field-level raw data and
          decision-support systems, eliminating the friction of traditional
          logging.
        </div>

        {/* Stack */}
        <div className="mt-3 pt-1 border-top border-secondary">
          <div className="d-flex flex-wrap gap-2 box-stack mt-1">
            {[
              "React.js",
              "Bootstrap 5",
              "PWA/Service Workers",
              "Markdown Engine",
            ].map((tech) => (
              <span key={tech} className="badge text-dark">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <p className="mb-0 mt-2 small opacity-50">✨©2026 Nova Bamahry</p>
      </div>

      <Button
        variant="outline-light"
        className="d-flex align-items-center gap-2 btn-sm mt-1 opacity-50"
        onClick={onBack}
      >
        <ArrowBigLeftDash size={18} />
        Back to Dashboard
      </Button>
    </Container>
  );
}
export default AboutView;
