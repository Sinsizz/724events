/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });
  
  return (
    <DataContext.Provider
      value={{
        data,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => {
  const { data, error } = useContext(DataContext);
  
  // Logique pour obtenir le dernier événement
  const getLastEvent = () => {
    if (!data || !data.events || data.events.length === 0) return null;
    
    // Trier les événements par date (du plus récent au plus ancien)
    const sortedEvents = [...data.events].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return sortedEvents[0];
  };

  return {
    data,
    error,
    last: getLastEvent(),
  };
};

export default DataContext;
