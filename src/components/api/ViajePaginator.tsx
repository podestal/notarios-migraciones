import { ArrowBigLeft, ArrowBigRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  itemsCount: number;
  itemsPerPage?: number;
}

const ViajePaginator = ({ page, setPage, itemsCount, itemsPerPage = 10 }: Props) => {
  const totalPages = Math.max(1, Math.ceil(itemsCount / itemsPerPage));
  const maxVisiblePages = 10;

  // Calculate dynamic page range based on current page
  const getVisiblePages = () => {
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return { pages, startPage, endPage };
  };

  const { pages: visiblePages, startPage, endPage } = getVisiblePages();
  const showLeftEllipsis = startPage > 1;
  const showRightEllipsis = endPage < totalPages;

  const goToFirst = () => setPage(1);
  const goToLast = () => setPage(totalPages);
  const goToPrev = () => setPage(prev => Math.max(1, prev - 1));
  const goToNext = () => setPage(prev => Math.min(totalPages, prev + 1));
  const jumpPrevChunk = () => setPage(Math.max(1, startPage - maxVisiblePages));
  const jumpNextChunk = () => setPage(Math.min(totalPages, endPage + 1));

  const baseBtn =
    'inline-flex items-center justify-center rounded-md border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';
  const navBtn = `${baseBtn} h-9 w-9 border-gray-300 bg-white text-gray-700 hover:bg-gray-50`;
  const pageBtn = (active: boolean) =>
    `${baseBtn} h-9 min-w-9 px-3 ${
      active
        ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
    }`;

  if (itemsCount <= 0) return null;

  return (
    <div className="w-full px-4 mt-8 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-gray-500">Página {page} de {totalPages}</div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* First */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={navBtn}
            onClick={goToFirst}
            disabled={page === 1}
            aria-label="Primera página"
          >
            <ChevronsLeft className="h-5 w-5" />
          </motion.button>

          {/* Prev */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={navBtn}
            onClick={goToPrev}
            disabled={page === 1}
            aria-label="Página anterior"
          >
            <ArrowBigLeft className="h-5 w-5" />
          </motion.button>

          {/* Left ellipsis */}
          {showLeftEllipsis && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${navBtn} w-auto px-2`}
              onClick={jumpPrevChunk}
              aria-label="Retroceder páginas"
              title={`Ir a páginas anteriores`}
            >
              <MoreHorizontal className="h-5 w-5" />
            </motion.button>
          )}

          {/* Page buttons */}
          <AnimatePresence initial={false} mode="popLayout">
            {visiblePages.map((p) => (
              <motion.button
                key={p}
                type="button"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={pageBtn(page === p)}
                onClick={() => setPage(p)}
                aria-current={page === p ? 'page' : undefined}
                aria-label={`Ir a la página ${p}`}
              >
                {p}
              </motion.button>
            ))}
          </AnimatePresence>

          {/* Right ellipsis */}
          {showRightEllipsis && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${navBtn} w-auto px-2`}
              onClick={jumpNextChunk}
              aria-label="Avanzar páginas"
              title={`Ir a páginas siguientes`}
            >
              <MoreHorizontal className="h-5 w-5" />
            </motion.button>
          )}

          {/* Next */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={navBtn}
            onClick={goToNext}
            disabled={page === totalPages}
            aria-label="Página siguiente"
          >
            <ArrowBigRight className="h-5 w-5" />
          </motion.button>

          {/* Last */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={navBtn}
            onClick={goToLast}
            disabled={page === totalPages}
            aria-label="Última página"
          >
            <ChevronsRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default ViajePaginator