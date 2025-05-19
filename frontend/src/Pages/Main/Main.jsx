import Hero from "./MainComponents/Hero";
import Recents from "./MainComponents/Recents";
import HistoryTable from "./MainComponents/HistoryTable";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../context/API";

const Main = () => {
  const { username } = useParams();
  const [recents, setRecents] = useState("");

  const getRecents = useCallback(async () => {
    if (username) {
      try {
        const response = await API.get(`/storage/recent/${username}`);
        setRecents(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
  }, [username]);

  useEffect(() => {
    getRecents();
  }, [getRecents]);

  return (
    <div className="min-h-screen">
      <Hero />
      {recents?.recentFiles?.length > 0 && <Recents recents={recents} />}
      <HistoryTable />
    </div>
  );
};

export default Main;
