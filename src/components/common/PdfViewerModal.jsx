import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import './PdfViewerModal.css';

const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

export default function PdfViewerModal({ isOpen, pdfUrl, title, onClose }) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageRatio, setPageRatio] = useState(1.414); // Standard A4 ratio
  const [baseWidth, setBaseWidth] = useState(780);

  const containerRef = useRef(null);
  const renderedPagesRef = useRef(new Set());
  const observerRef = useRef(null);

  // Lock body scroll when open
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
  }, [isOpen, currentPage, numPages, onClose]);

  // Ensure PDF.js is available
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

  // Clean PDF URL
  const cleanUrl = pdfUrl ? pdfUrl.split('#')[0] : '';
  const isGoogleDrive = cleanUrl.includes('drive.google.com');

  // Load PDF Document
  useEffect(() => {
    if (!isOpen || !cleanUrl) {
      setPdfDoc(null);
      setNumPages(0);
      return;
    }

    if (isGoogleDrive) {
      setLoading(false);
      return;
    }

    let isCancelled = false;
    setLoading(true);
    setError(null);
    renderedPagesRef.current.clear();

    const loadDoc = async () => {
      try {
        const pdfjs = await ensurePdfJs();
        const loadingTask = pdfjs.getDocument({
          url: cleanUrl,
          cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
          cMapPacked: true,
        });

        const doc = await loadingTask.promise;
        if (isCancelled) return;

        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setCurrentPage(1);

        // Get first page to calculate natural aspect ratio
        try {
          const firstPage = await doc.getPage(1);
          const viewport = firstPage.getViewport({ scale: 1.0 });
          if (viewport.width && viewport.height) {
            setPageRatio(viewport.height / viewport.width);
          }
        } catch (e) {
          // fallback ratio
        }

        // Calculate initial responsive width
        const containerW = containerRef.current ? containerRef.current.clientWidth : window.innerWidth;
        const targetWidth = Math.min(containerW - (window.innerWidth < 640 ? 16 : 48), 850);
        setBaseWidth(Math.max(targetWidth, 300));
        setLoading(false);
      } catch (err) {
        if (isCancelled) return;
        console.error('Error loading PDF:', err);
        setError('Could not display PDF. Please check your network connection.');
        setLoading(false);
      }
    };

    loadDoc();

    return () => {
      isCancelled = true;
    };
  }, [isOpen, cleanUrl, isGoogleDrive, ensurePdfJs]);

  // Render a specific page onto its canvas
  const renderPage = useCallback(async (pageNum, canvasElement) => {
    if (!pdfDoc || !canvasElement) return;

    try {
      const page = await pdfDoc.getPage(pageNum);
      const computedWidth = baseWidth * zoomLevel;
      const unscaledViewport = page.getViewport({ scale: 1.0 });
      const scale = computedWidth / unscaledViewport.width;
      
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for smooth mobile performance
      const viewport = page.getViewport({ scale: scale * pixelRatio });

      canvasElement.width = viewport.width;
      canvasElement.height = viewport.height;
      canvasElement.style.width = `${computedWidth}px`;
      canvasElement.style.height = `${computedWidth * (unscaledViewport.height / unscaledViewport.width)}px`;

      const ctx = canvasElement.getContext('2d', { alpha: false });
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      renderedPagesRef.current.add(pageNum);
    } catch (err) {
      // Ignore cancelled render tasks
    }
  }, [pdfDoc, baseWidth, zoomLevel]);

  // Setup Intersection Observer for lazy page rendering
  useEffect(() => {
    if (!pdfDoc || numPages === 0 || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const pageNum = parseInt(entry.target.getAttribute('data-page-num'), 10);
          if (!pageNum) return;

          if (entry.isIntersecting) {
            const canvas = entry.target.querySelector('canvas');
            if (canvas && !renderedPagesRef.current.has(pageNum)) {
              renderPage(pageNum, canvas);
            }
            // Update active page number based on middle-screen position
            if (entry.intersectionRatio > 0.4) {
              setCurrentPage(pageNum);
            }
          }
        });
      },
      {
        root: containerRef.current,
        rootMargin: '600px 0px', // Pre-render 600px before user scrolls into view
        threshold: [0, 0.4, 0.8],
      }
    );

    observerRef.current = observer;
    const pageWrappers = containerRef.current.querySelectorAll('.pdf-page-container');
    pageWrappers.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [pdfDoc, numPages, renderPage]);

  // When zoom changes, invalidate rendered cache and re-render visible pages
  useEffect(() => {
    if (!pdfDoc || numPages === 0) return;
    renderedPagesRef.current.clear();

    if (containerRef.current) {
      const pageWrappers = containerRef.current.querySelectorAll('.pdf-page-container');
      pageWrappers.forEach((el) => {
        const pageNum = parseInt(el.getAttribute('data-page-num'), 10);
        const canvas = el.querySelector('canvas');
        if (canvas) {
          renderPage(pageNum, canvas);
        }
      });
    }
  }, [zoomLevel, baseWidth, pdfDoc, numPages, renderPage]);

  // Scroll smoothly to a specific page
  const scrollToPage = (pageNum) => {
    if (!containerRef.current) return;
    const pageEl = containerRef.current.querySelector(`[data-page-num="${pageNum}"]`);
    if (pageEl) {
      pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentPage(pageNum);
    }
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(+(z + 0.2).toFixed(1), 2.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(+(z - 0.2).toFixed(1), 0.6));

  if (!isOpen) return null;

  const finalPageWidth = baseWidth * zoomLevel;
  const finalPageHeight = finalPageWidth * pageRatio;

  return (
    <div
      className="pdf-viewer-overlay"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* ── Top Header ── */}
      <div className="pdf-viewer-header">
        <div className="pdf-viewer-title-wrap">
          <h3 className="pdf-viewer-title" title={title}>
            {title}
          </h3>
        </div>

        <div className="pdf-viewer-controls">
          {numPages > 0 && (
            <>
              <button
                className="pdf-ctrl-btn"
                onClick={handleZoomOut}
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                className="pdf-ctrl-btn"
                onClick={handleZoomIn}
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
            </>
          )}

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
            <div className="pdf-loading-spinner" />
            <p>Loading document...</p>
          </div>
        )}

        {error && (
          <div className="pdf-error-state">
            <AlertCircle size={36} />
            <h4>Document Unavailable</h4>
            <p>{error}</p>
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

        {/* Native HTML5 Canvas Multi-Page Rendering (Supports all 100+ pages on Mobile, Tablet & Desktop) */}
        {!loading && !error && !isGoogleDrive && numPages > 0 && (
          Array.from({ length: numPages }, (_, index) => {
            const pageNum = index + 1;
            return (
              <div
                key={pageNum}
                className="pdf-page-container"
                data-page-num={pageNum}
                style={{
                  width: `${finalPageWidth}px`,
                  minHeight: `${finalPageHeight}px`,
                }}
              >
                <canvas className="pdf-page-canvas" />
              </div>
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
