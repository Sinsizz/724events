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
 
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  
  // Filtrer et paginer les événements
  const filteredEvents = useMemo(() => {
    if (!data?.events) return [];
   
    return (type ? data.events.filter(event => event.type === type) : data.events)
      .filter((_, index) => {
        const start = (currentPage - 1) * PER_PAGE;
        const end = currentPage * PER_PAGE;
        return index >= start && index < end;
      });
  }, [data, type, currentPage]);

  // Changer le type d'événement et réinitialiser la page
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

   // Calculer le nombre de pages et la liste des types d'événements
  const pageNumber = Math.ceil((data?.events?.length || 0) / PER_PAGE);
  const typeList = new Set(data?.events?.map((event) => event.type) || []);

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
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