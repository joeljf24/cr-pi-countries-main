// Paginated.jsx

import style from "./Paginated.module.css";

const Paginated = ({ countriesPerPage, countries, paginated, currentPage }) => {
  const totalPages = Math.ceil(countries / countriesPerPage);

  // Función para ir a una página específica
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      paginated(pageNumber);
    }
  };

  // Calculamos las páginas cercanas a la página actual
  const nearbyPages = [];
  const maxNearbyPages = 2; // Cantidad de páginas cercanas a mostrar (2 a la izquierda y 2 a la derecha)

  for (let i = currentPage - maxNearbyPages; i <= currentPage + maxNearbyPages; i++) {
    if (i > 0 && i <= totalPages) {
      nearbyPages.push(i);
    }
  }

  return (
    <nav>
      <ul className={style.paginated}>
        {/* Botón para ir a la primera página */}
        <li>
          <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
            &lt;&lt;
          </button>
        </li>

        {/* Botón para retroceder una página */}
        <li>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            &lt;
          </button>
        </li>

        {nearbyPages.map((pageNumber) => (
          <li key={pageNumber} className={pageNumber === currentPage ? style.active : null}>
            <button
              onClick={() => goToPage(pageNumber)}
              className={pageNumber === currentPage ? style.active : null} // Agregar la clase "active" si la página es la actual
            >
              {pageNumber}
            </button>
          </li>
        ))}

        {/* Botón para avanzar una página */}
        <li>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </li>

        {/* Botón para ir a la última página */}
        <li>
          <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
            &gt;&gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginated;


// const renderPageIndicators = () => {
//     return visiblePages.map((page) => (
//       <span
//         key={page}
//         className={${style.PageIndicator} ${page === currentPage ? style.Active : ""}}
//         onClick={() => onPageChange(page)} // Llama a la función onPageChange con el índice de la página seleccionada como parámetro
//       >
//         {page + 1}
//       </span>
//     ));
//   };

// const VISIBLE_PAGE_COUNT = 3;

// const Pagination = ({ totalPages, currentPage, onPageChange }) => {
//   // Estado para almacenar las páginas visibles
//   const [visiblePages, setVisiblePages] = useState([]);

//   useEffect(() => {
//     // Función para calcular las páginas visibles
//     const calculateVisiblePages = () => {
//       // Calcula el rango de paginas visibles
//       const firstVisiblePage = Math.max(
//         0,
//         currentPage - Math.floor(VISIBLE_PAGE_COUNT / 2)
//       );
//       const lastVisiblePage = Math.min(
//         totalPages - 1,
//         firstVisiblePage + VISIBLE_PAGE_COUNT - 1
//       );

//       // Crea un array con las paginas visibles
//       return Array.from(
//         { length: lastVisiblePage - firstVisiblePage + 1 },
//         (_, index) => firstVisiblePage + index
//       );
//     };

//     // Actualiza el estado de las paginas visibles cuando cambian las propiedades currentPage o totalPages
//     setVisiblePages(calculateVisiblePages());
//   }, [currentPage, totalPages]);

//   // Manejador de evento para la pagina anterior
//   const handlePrevPage = () => {
//     if (currentPage > 0) {
//       onPageChange(currentPage - 1); // Llama a la función onPageChange con el índice de la página anterior como parámetro
//     }
//   };

//   // Manejador de evento para la pagina siguiente
//   const handleNextPage = () => {
//     if (currentPage < totalPages - 1) {
//       onPageChange(currentPage + 1); // Llama a la funcion onPageChange con el índice de la página siguiente como parámetro
//     }
//   };
//   // Manejador para ir a la primera pagina
//   const handleFirstPage = () => {
//     onPageChange(0);
//   };
//   // Manejador para ir a la ultima pagina
//   const handleLastPage = () => {
//     onPageChange(totalPages - 1);
//   };

//   // Función para renderizar los indicadores de pagina
//   const renderPageIndicators = () => {
//     return visiblePages.map((page) => (
//       <span
//         key={page}
//         className={`${style.PageIndicator} ${
//           page === currentPage ? style.Active : ""
//         }`}
//         onClick={() => onPageChange(page)} // Llama a la función onPageChange con el índice de la página seleccionada como parámetro
//       >
//         {page + 1}
//       </span>
//     ));
//   };

//   return (
//     <div className={style.Pagination}>
//       <button
//         className={style.PrevButton}
//         onClick={handleFirstPage}
//         disabled={currentPage === 0}
//       >
//         First
//       </button>
//       <button
//         className={style.PrevButton}
//         onClick={handlePrevPage}
//         disabled={currentPage === 0}
//       >
//         Prev
//       </button>
//       <div className={style.PageIndicators}>{renderPageIndicators()}</div>
//       <button
//         className={style.NextButton}
//         onClick={handleNextPage}
//         disabled={currentPage === totalPages - 1}
//       >
//         Next
//       </button>
//       <button
//         className={style.NextButton}
//         onClick={handleLastPage}
//         disabled={currentPage === totalPages - 1}
//       >
//         Last
//       </button>
//     </div>
//   );
// };
