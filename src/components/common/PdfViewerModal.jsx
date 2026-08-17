import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import './PdfViewerModal.css';

const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

/**
 * Individual Page Component
 * Renders its own canvas via PDF.js safely with cancelable tasks and skeleton loader.
 */
function PdfPage({ pageNum, pdfDoc, width, ratio, onVisible }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [rendered, setRendered] = useState(false);
  const renderedRef = useRef(false);
  const renderTaskRef = useRef(null);

  useEffect(() => {
    let isCancelled = false;

    const doRender = async () => {
      if (!pdfDoc || !canvasRef.current || isCancelled) return;

      // Cancel any active render on this canvas
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (e) {
          // safe catch
        }
      }

      try {
        const page = await pdfDoc.getPage(pageNum);
        if (isCancelled) return;

        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const scale = width / unscaledViewport.width;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2); // 2x crispness on mobile retina
        const viewport = page.getViewport({ scale: scale * pixelRatio });

        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${width * (unscaledViewport.height / unscaledViewport.width)}px`;

        const ctx = canvas.getContext('2d', { alpha: false });
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;

        if (!isCancelled) {
          renderedRef.current = true;
          setRendered(true);
        }
      } catch (err) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error(`Page ${pageNum} render error:`, err);
        }
      }
    };

    // Render immediately for first 2 pages, lazy load the rest with IntersectionObserver
    if (pageNum <= 2) {
      doRender();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onVisible?.(pageNum);
            if (!renderedRef.current) {
              doRender();
            }
          }
        });
      },
      {
        rootMargin: '800px 0px', // Pre-render 800px ahead of scroll
        threshold: [0, 0.5],
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      isCancelled = true;
      observer.disconnect();
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (e) {
          // safe
        }
      }
    };
  }, [pdfDoc, pageNum, width, onVisible]);

  return (
    <div
      ref={containerRef}
      className={`pdf-page-container ${rendered ? 'pdf-page-ready' : 'pdf-page-loading'}`}
      data-page-num={pageNum}
      style={{
        width: `${width}px`,
        minHeight: `${width * ratio}px`,
      }}
    >
      {!rendered && (
        <div className="pdf-page-skeleton">
          <div className="pdf-page-spinner" />
          <span>Page {pageNum}</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="pdf-page-canvas"
        style={{ display: rendered ? 'block' : 'none' }}
      />
    </div>
  );
}

export default function PdfViewerModal({ isOpen, pdfUrl, title, onClose }) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [pageRatio, setPageRatio] = useState(1.414);
  const [pageWidth, setPageWidth] = useState(780);

  const containerRef = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Compute responsive page width based on window / container
  const updatePageWidth = useCallback(() => {
    const screenW = window.innerWidth;
    if (screenW < 640) {
      // Mobile: Full width minus 16px padding
      setPageWidth(Math.max(screenW - 16, 280));
    } else if (screenW < 1024) {
      // Tablet: Comfortable width
      setPageWidth(Math.min(screenW - 48, 720));
    } else {
      // Desktop: Standard reading width
      setPageWidth(820);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    updatePageWidth();
    window.addEventListener('resize', updatePageWidth);
    return () => window.removeEventListener('resize', updatePageWidth);
  }, [isOpen, updatePageWidth]);

  // Scroll smoothly to a target page
  const scrollToPage = useCallback((pageNum) => {
    if (!containerRef.current) return;
    const pageEl = containerRef.current.querySelector(`[data-page-num="${pageNum}"]`);
    if (pageEl) {
      pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentPage(pageNum);
    }
  }, []);

  // Keyboard navigation & Shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        scrollToPage(Math.min(currentPage + 1, numPages));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        scrollToPage(Math.max(currentPage - 1, 1));
      } else if ((e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'u')) || e.key === 'F12') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage, numPages, onClose, scrollToPage]);

  // Ensure PDF.js engine is available
  const ensurePdfJs = useCallback(async () => {
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
      return window.pdfjsLib;
    }

    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${PDFJS_CDN}"]`);
      if (existingScript) {
        existingScript.addEventListener('load', () => {
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
            resolve(window.pdfjsLib);
          } else {
            reject(new Error('PDF.js failed to load'));
          }
        });
        return;
      }

      const script = document.createElement('script');
      script.src = PDFJS_CDN;
      script.async = true;
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
          resolve(window.pdfjsLib);
        } else {
          reject(new Error('PDF.js initialization failed'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load PDF engine'));
      document.head.appendChild(script);
    });
  }, []);

  const cleanUrl = pdfUrl ? pdfUrl.split('#')[0] : '';
  const isGoogleDrive = cleanUrl.includes('drive.google.com');

  // Load PDF Document with Progress
  const loadDocument = useCallback(async () => {
    if (!cleanUrl) return;

    if (isGoogleDrive) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setProgress(10);

    try {
      const pdfjs = await ensurePdfJs();
      const loadingTask = pdfjs.getDocument({
        url: cleanUrl,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true,
      });

      // Progress reporting
      loadingTask.onProgress = ({ loaded, total }) => {
        if (total > 0) {
          const percent = Math.min(Math.round((loaded / total) * 90), 95);
          setProgress(percent);
        }
      };

      const doc = await loadingTask.promise;
      setPdfDoc(doc);
      setNumPages(doc.numPages);
      setCurrentPage(1);

      // Get page 1 ratio
      try {
        const firstPage = await doc.getPage(1);
        const viewport = firstPage.getViewport({ scale: 1.0 });
        if (viewport.width && viewport.height) {
          setPageRatio(viewport.height / viewport.width);
        }
      } catch (e) {
        // fallback
      }

      setProgress(100);
      setLoading(false);
    } catch (err) {
      console.error('Error loading PDF document:', err);
      setError('Could not load PDF document. Please check your internet connection.');
      setLoading(false);
    }
  }, [cleanUrl, isGoogleDrive, ensurePdfJs]);

  useEffect(() => {
    if (isOpen && cleanUrl) {
      loadDocument();
    } else {
      setPdfDoc(null);
      setNumPages(0);
      setLoading(true);
      setError(null);
      setProgress(0);
    }
  }, [isOpen, cleanUrl, loadDocument]);

  const handlePageVisible = useCallback((pageNum) => {
    setCurrentPage(pageNum);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="pdf-viewer-overlay"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* ── Top Header (Clean: Title + Close Icon Only) ── */}
      <div className="pdf-viewer-header">
        <div className="pdf-viewer-title-wrap">
          <h3 className="pdf-viewer-title" title={title}>
            {title}
          </h3>
        </div>

        <div className="pdf-viewer-controls">
          <button
            className="pdf-close-btn"
            onClick={onClose}
            aria-label="Close"
            title="Close (Esc)"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ── Scrollable Document Body ── */}
      <div className="pdf-viewer-body" ref={containerRef}>
        {loading && (
          <div className="pdf-loading-state">
            <div className="pdf-loading-spinner-wrap">
              <div className="pdf-loading-spinner" />
            </div>
            <h4 className="pdf-loading-title">Loading Study Material...</h4>
            <p className="pdf-loading-subtext">
              {progress > 0 ? `${progress}% complete` : 'Preparing document reader'}
            </p>
            <div className="pdf-progress-bar-wrap">
              <div
                className="pdf-progress-bar-fill"
                style={{ width: `${Math.max(progress, 15)}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="pdf-error-state">
            <AlertCircle size={36} />
            <h4>Document Unavailable</h4>
            <p>{error}</p>
            <button className="pdf-retry-btn" onClick={loadDocument}>
              Retry
            </button>
          </div>
        )}

        {/* Fallback for Google Drive Links */}
        {!loading && !error && isGoogleDrive && (
          <iframe
            src={cleanUrl.replace('/view?usp=sharing', '/preview').replace('/view', '/preview')}
            title={title}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="autoplay"
          />
        )}

        {/* Native HTML5 Canvas Multi-Page Rendering */}
        {!loading && !error && !isGoogleDrive && numPages > 0 && (
          Array.from({ length: numPages }, (_, index) => {
            const pageNum = index + 1;
            return (
              <PdfPage
                key={pageNum}
                pageNum={pageNum}
                pdfDoc={pdfDoc}
                width={pageWidth}
                ratio={pageRatio}
                onVisible={handlePageVisible}
              />
            );
          })
        )}
      </div>

      {/* ── Floating Bottom Navigation Pill ── */}
      {!loading && !error && numPages > 1 && (
        <div className="pdf-floating-bar">
          <button
            className="pdf-floating-btn"
            onClick={() => scrollToPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage <= 1}
            title="Previous Page"
            aria-label="Previous Page"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="pdf-floating-page-info">
            {currentPage} / {numPages}
          </span>

          <button
            className="pdf-floating-btn"
            onClick={() => scrollToPage(Math.min(currentPage + 1, numPages))}
            disabled={currentPage >= numPages}
            title="Next Page"
            aria-label="Next Page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
