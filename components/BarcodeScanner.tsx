'use client';

import { useEffect, useRef, useState } from 'react';
import { Flashlight, FlashlightOff, X } from 'lucide-react';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

export default function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [torch, setTorch] = useState(false);
  const [supported, setSupported] = useState(true);
  const streamRef = useRef<MediaStream | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const detectorRef = useRef<any>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!('BarcodeDetector' in (window as Window & { BarcodeDetector?: unknown }))) {
      setSupported(false);
      return;
    }

    let active = true;

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 } },
        });
        if (!active) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        const BD = (window as unknown as { BarcodeDetector: new (opts: object) => { detect(src: HTMLVideoElement): Promise<{ rawValue: string }[]> } }).BarcodeDetector;
        detectorRef.current = new BD({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'] });

        const scan = async () => {
          if (!active || !videoRef.current || !detectorRef.current) return;
          if (videoRef.current.readyState >= 2) {
            try {
              const barcodes = await detectorRef.current.detect(videoRef.current);
              if (barcodes.length > 0) {
                onScan(barcodes[0].rawValue);
                return;
              }
            } catch { /* ignore */ }
          }
          rafRef.current = requestAnimationFrame(scan);
        };
        rafRef.current = requestAnimationFrame(scan);
      } catch (e) {
        if (active) setError('Geen toegang tot camera. Geef toestemming in je browserinstellingen.');
      }
    }

    start();
    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [onScan]);

  const toggleTorch = async () => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track) return;
    try {
      await track.applyConstraints({ advanced: [{ torch: !torch } as MediaTrackConstraintSet] });
      setTorch((v) => !v);
    } catch { /* torch not supported */ }
  };

  if (!supported) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-white px-8 text-center">
        <p className="text-lg font-semibold mb-2">Barcodescanner niet beschikbaar</p>
        <p className="text-sm text-gray-400 mb-6">
          Gebruik Safari 17+ of Chrome op Android. Je kunt ook het barcodenummer handmatig invoeren.
        </p>
        <button onClick={onClose} className="bg-white text-black font-semibold px-6 py-2.5 rounded-xl">
          Sluiten
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Video */}
      <div className="relative flex-1 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
        />

        {/* Viewfinder overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-40">
            {/* Corner markers */}
            {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-8 h-8 border-[#e07a5f]`}
                style={{ borderTopWidth: 3, borderLeftWidth: 3 }} />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-[#e07a5f] opacity-60 animate-pulse" />
            </div>
          </div>
        </div>

        {error && (
          <div className="absolute bottom-4 left-4 right-4 bg-red-900/80 text-white text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black px-6 py-6 flex items-center justify-between">
        <button onClick={onClose} className="text-white p-2">
          <X className="w-6 h-6" />
        </button>
        <p className="text-white text-sm text-center flex-1 px-4">
          Richt op een streepjescode
        </p>
        <button onClick={toggleTorch} className="text-white p-2">
          {torch ? <FlashlightOff className="w-6 h-6" /> : <Flashlight className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
