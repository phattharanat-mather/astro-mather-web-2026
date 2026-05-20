"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

type Variant = "image-top" | "image-left" | "image-right" | "image-only" | "text-only";

interface Props {
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  title?: string;
  storageKey: string;
  sizeClass: string;
  variant?: Variant;
  children?: ReactNode;
}

export default function SplashModal3DCard({
  imageSrc,
  imageWidth,
  imageHeight,
  title,
  storageKey,
  sizeClass,
  variant = "image-top",
  children,
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

  const buttons = (
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
  );

  const imgEl = imageSrc && (
    <img
      src={imageSrc}
      alt=""
      width={imageWidth}
      height={imageHeight}
      className="w-full h-auto block"
    />
  );

  const isSide = variant === "image-left" || variant === "image-right";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <CardContainer
        containerClassName="py-0 w-full"
        className={`w-full ${sizeClass}`}
      >
        <CardBody
          className={`relative w-full ${sizeClass} rounded-2xl border border-white/10 bg-[var(--color-surface,#0d0f1c)] shadow-2xl h-auto`}
        >

          {/* ── image-left / image-right ── */}
          {isSide && imgEl && (
            <div className={`flex flex-row${variant === "image-right" ? "-reverse" : ""}`}>
              <CardItem translateZ={8} className="w-2/5 shrink-0 self-stretch">
                <img
                  src={imageSrc}
                  alt=""
                  width={imageWidth}
                  height={imageHeight}
                  className={`w-full h-full object-cover ${
                    variant === "image-left" ? "rounded-l-2xl" : "rounded-r-2xl"
                  }`}
                />
              </CardItem>
              <div className="flex flex-col p-8 w-3/5">
                {title && (
                  <CardItem translateZ={5} className="w-full mb-4 text-xl font-semibold tracking-tight text-white">
                    {title}
                  </CardItem>
                )}
                {children && (
                  <CardItem translateZ={8} className="w-full grow prose prose-invert prose-sm max-w-none text-white/70">
                    {children}
                  </CardItem>
                )}
                <CardItem translateZ={5} className="w-full mt-6">
                  {buttons}
                </CardItem>
              </div>
            </div>
          )}

          {/* ── image-top (default) ── */}
          {variant === "image-top" && imgEl && (
            <>
              <CardItem translateZ={8} className="w-full">
                <img
                  src={imageSrc}
                  alt=""
                  width={imageWidth}
                  height={imageHeight}
                  className="w-full h-auto block rounded-t-2xl"
                />
              </CardItem>
              {title && (
                <CardItem translateZ={5} className="px-6 pt-4 text-xl font-semibold tracking-tight text-white w-full">
                  {title}
                </CardItem>
              )}
              {children && (
                <CardItem translateZ={8} className="px-6 pt-2 w-full prose prose-invert prose-sm max-w-none text-white/70">
                  {children}
                </CardItem>
              )}
              <CardItem translateZ={5} className="w-full">
                {buttons}
              </CardItem>
            </>
          )}

          {/* ── image-only ── */}
          {variant === "image-only" && imgEl && (
            <>
              <CardItem translateZ={8} className="w-full">
                <img
                  src={imageSrc}
                  alt=""
                  width={imageWidth}
                  height={imageHeight}
                  className="w-full h-auto block rounded-t-2xl"
                />
              </CardItem>
              <CardItem translateZ={5} className="w-full">
                {buttons}
              </CardItem>
            </>
          )}

          {/* ── text-only ── */}
          {variant === "text-only" && (
            <div className="p-8">
              {title && (
                <CardItem translateZ={5} className="w-full mb-4 text-xl font-semibold tracking-tight text-white">
                  {title}
                </CardItem>
              )}
              {children && (
                <CardItem translateZ={8} className="w-full prose prose-invert prose-sm max-w-none text-white/70">
                  {children}
                </CardItem>
              )}
              <CardItem translateZ={5} className="w-full mt-6">
                {buttons}
              </CardItem>
            </div>
          )}

        </CardBody>
      </CardContainer>
    </div>
  );
}
