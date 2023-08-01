import style from './Paginated.module.css';

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
              className={pageNumber === currentPage ? style.active : null} // Agregar la clase 'active' si la página es la actual
            >
              {pageNumber}
            </button>
          </li>
        ))}

        {/* Botón para avanzar una página */}
        <li>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages || !countries}>
            &gt;
          </button>
        </li>

        {/* Botón para ir a la última página */}
        <li>
          <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages || !countries}>
            &gt;&gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginated;