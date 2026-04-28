import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

function ButtonNav() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isInStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    setIsStandalone(isInStandalone);
    setIsReady(true);

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  if (!isReady || isStandalone) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
  };

  return (
    <Container className="d-flex justify-content-between align-items-center px-3 py-2 rounded bottom-nav">
      <span className="fs-6 fw-semibold">
        Install App to your mobile
      </span>
      <Button
        disabled={!deferredPrompt}
        className="btn btn-light btn-sm"
        onClick={handleInstall}
      >
        Install App
      </Button>
    </Container>
  );
}
export default ButtonNav;
