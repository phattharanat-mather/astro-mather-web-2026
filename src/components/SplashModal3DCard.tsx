"use client";

import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface Props {
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  title?: string;
  storageKey: string;
  sizeClass: string;
}

export default function SplashModal3DCard({
  imageSrc,
  imageWidth,
  imageHeight,
  title,
  storageKey,
  sizeClass,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored && Date.now() > parseInt(stored, 10)) {
      localStorage.removeItem(storageKey);
    }
    if (!localStorage.getItem(storageKey)) {
      setVisible(true);
    }
  }, [storageKey]);

  if (!visible) return null;

  function close() {
    setVisible(false);
  }

  function hideForToday() {
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);
    localStorage.setItem(storageKey, midnight.getTime().toString());
    setVisible(false);
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <CardContainer containerClassName="py-0" className={`w-full ${sizeClass}`}>
        <CardBody
          className={`w-full ${sizeClass} rounded-2xl border border-white/10 bg-[var(--color-surface,#0d0f1c)] shadow-2xl overflow-hidden h-auto`}
        >
          <CardItem translateZ={60} className="w-full">
            <img
              src={imageSrc}
              alt=""
              width={imageWidth}
              height={imageHeight}
              className="w-full h-auto block"
            />
          </CardItem>

          {title && (
            <CardItem
              translateZ={40}
              className="px-6 pt-4 text-xl font-semibold tracking-tight text-white w-full"
            >
              {title}
            </CardItem>
          )}

          <CardItem translateZ={20} className="w-full">
            <div className="flex justify-end gap-3 px-6 py-4">
              <button
                onClick={hideForToday}
                className="rounded-lg border border-white/20 px-5 py-2 text-sm text-white/60 transition hover:bg-white/10"
              >
                Hide for today
              </button>
              <button
                onClick={close}
                className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Close
              </button>
            </div>
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}
