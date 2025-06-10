import { useEffect, useState } from "react";
import { STATUS } from "@/constants";

function Footer({ status, error }) {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <footer className="mt-6 text-center">
      {status === STATUS.LOADING && <p className="text-blue-600">Loading...</p>}
      {showError && error && (
        <p className="text-red-600">Error: {error.message}</p>
      )}
    </footer>
  );
}

export default Footer;
