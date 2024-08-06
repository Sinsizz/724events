import { useState, useMemo } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 12;

const EventList = () => {
  const { data, error } = useData();
  // Modification 1: Initialisation de type à null au lieu de undefined
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Modification 2: Utilisation de useMemo pour optimiser le filtrage et la pagination
  const filteredEvents = useMemo(() => {
    if (!data?.events) return [];
    // Modification 3: Logique de filtrage corrigée
    return (type ? data.events.filter(event => event.type === type) : data.events)
      .filter((_, index) => {
        const start = (currentPage - 1) * PER_PAGE;
        const end = currentPage * PER_PAGE;
        return index >= start && index < end;
      });
  }, [data, type, currentPage]);

  // Modification 4: Simplification de la fonction changeType
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  // Modification 5: Calcul correct du nombre de pages
  const pageNumber = Math.ceil((data?.events?.length || 0) / PER_PAGE);
  // Modification 6: Gestion des cas où data.events pourrait être undefined
  const typeList = new Set(data?.events?.map((event) => event.type) || []);

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          {/* Modification 7: Simplification de l'appel à changeType */}
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => changeType(value)}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;