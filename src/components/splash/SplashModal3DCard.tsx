"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
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
  const prevFocusRef = useRef<Element | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored && Date.now() > parseInt(stored, 10)) {
      localStorage.removeItem(storageKey);
    }
    if (!localStorage.getItem(storageKey)) {
      setVisible(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!visible) return;
    prevFocusRef.current = document.activeElement;
    dialogRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible]);

  if (!visible) return null;

  function close() {
    setVisible(false);
    if (prevFocusRef.current instanceof HTMLElement) {
      prevFocusRef.current.focus();
    }
  }

  function hideForToday() {
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);
    localStorage.setItem(storageKey, midnight.getTime().toString());
    close();
  }

  const buttons = (
    <div className="flex items-center justify-end gap-3 px-6 py-4">
      <button
        onClick={hideForToday}
        className="rounded border border-white/[8%] px-5 py-2 text-sm text-[oklch(0.55_0.055_258)] transition hover:bg-white/5"
      >
        Not today
      </button>
      <button
        ref={closeBtnRef}
        onClick={close}
        aria-label="Close"
        className="rounded p-2 text-[oklch(0.93_0.025_272)] transition hover:bg-white/5"
      >
        <X size={14} />
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
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Announcement"}
      tabIndex={-1}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[oklch(0.07_0.022_264/80%)] backdrop-blur-sm p-4 outline-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <CardContainer
        containerClassName="py-0 w-full"
        className={`w-full ${sizeClass}`}
      >
        <CardBody
          className={`relative w-full ${sizeClass} rounded border border-white/[8%] bg-[oklch(0.10_0.030_264)] h-auto`}
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
                    variant === "image-left" ? "rounded-l" : "rounded-r"
                  }`}
                />
              </CardItem>
              <div className="flex flex-col p-8 w-3/5">
                {title && (
                  <CardItem translateZ={5} className="w-full mb-4 text-xl font-semibold tracking-tight text-[oklch(0.93_0.025_272)]">
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
                  className="w-full h-auto block rounded-t"
                />
              </CardItem>
              {title && (
                <CardItem translateZ={5} className="px-6 pt-4 text-xl font-semibold tracking-tight text-[oklch(0.93_0.025_272)] w-full">
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
                  className="w-full h-auto block rounded-t"
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
                <CardItem translateZ={5} className="w-full mb-4 text-xl font-semibold tracking-tight text-[oklch(0.93_0.025_272)]">
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
