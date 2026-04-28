import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

function BottomNav() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1. Cek udah diinstall (standalone)
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

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  if (!isReady || isStandalone || !deferredPrompt) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();

    // Nunggu respon user
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  return (
    <Container className="d-flex justify-content-between align-items-center px-3 py-2 rounded bottom-nav">
      <span className="fs-6 fw-semibold">Install App to your mobile</span>
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
export default BottomNav;
