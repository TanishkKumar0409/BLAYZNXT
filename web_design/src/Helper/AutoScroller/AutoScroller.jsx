import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AutoScroller() {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return null;
}
