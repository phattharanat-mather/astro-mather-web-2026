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
  fullPageHref?: string;
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
  fullPageHref,
  children,
}: Props) {
  const [visible, setVisible] = useState(false);
  const prevFocusRef = useRef<Element | null>(null);
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
    localStorage.setItem(storageKey, String(Date.now() + 86400000));
    setVisible(false);
    if (prevFocusRef.current instanceof HTMLElement) {
      prevFocusRef.current.focus();
    }
  }

  const fullPageLink = fullPageHref && (
    <a
      href={fullPageHref}
      className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-[oklch(0.82_0.14_200)] hover:text-[oklch(0.93_0.025_272)] transition-colors duration-150"
    >
      View full page <span aria-hidden="true">→</span>
    </a>
  );

  const closeBtn = (
    <button
      onClick={close}
      aria-label="Close"
      className="absolute top-2 right-2 z-10 w-11 h-11 flex items-center justify-center rounded bg-[oklch(0.07_0.022_264/70%)] text-[oklch(0.93_0.025_272)] transition-colors duration-200 hover:bg-[oklch(0.58_0.26_272/85%)]"
    >
      <X size={16} />
    </button>
  );

  const isSide = variant === "image-left" || variant === "image-right";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Announcement"}
      tabIndex={-1}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[oklch(0.07_0.022_264/80%)] backdrop-blur-sm p-3 sm:p-8 outline-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <CardContainer
        containerClassName="py-0 w-full"
        className={`w-full ${sizeClass}`}
      >
        <CardBody
          className={`relative w-full ${sizeClass} rounded overflow-hidden border border-white/[8%] bg-[oklch(0.10_0.030_264)] h-auto`}
        >

          {closeBtn}

          {/* ── image-left / image-right — stacks on mobile, side-by-side on sm+ ── */}
          {isSide && imageSrc && (
            <div className={`flex flex-col${variant === "image-right" ? " sm:flex-row-reverse" : " sm:flex-row"}`}>
              <CardItem translateZ={8} className="w-full sm:w-2/5 sm:self-stretch">
                <img
                  src={imageSrc}
                  alt=""
                  width={imageWidth}
                  height={imageHeight}
                  className="w-full object-cover max-h-[45vw] sm:max-h-none sm:h-full"
                />
              </CardItem>
              <div className="flex flex-col p-5 sm:p-8 sm:w-3/5 flex-1">
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
                {fullPageLink && (
                  <CardItem translateZ={5} className="w-full">
                    {fullPageLink}
                  </CardItem>
                )}
              </div>
            </div>
          )}

          {/* ── image-top (default) ── */}
          {variant === "image-top" && imageSrc && (
            <>
              <CardItem translateZ={8} className="w-full">
                <img
                  src={imageSrc}
                  alt=""
                  width={imageWidth}
                  height={imageHeight}
                  className="w-full object-cover max-h-[40vh] sm:max-h-none sm:h-auto block"
                />
              </CardItem>
              {title && (
                <CardItem translateZ={5} className="px-5 sm:px-6 pt-4 text-xl font-semibold tracking-tight text-[oklch(0.93_0.025_272)] w-full">
                  {title}
                </CardItem>
              )}
              {children && (
                <CardItem translateZ={8} className={`px-5 sm:px-6 pt-2 ${fullPageLink ? "pb-2" : "pb-6"} w-full prose prose-invert prose-sm max-w-none text-white/70`}>
                  {children}
                </CardItem>
              )}
              {fullPageLink && (
                <CardItem translateZ={5} className="px-5 sm:px-6 pb-6 w-full">
                  {fullPageLink}
                </CardItem>
              )}
            </>
          )}

          {/* ── image-only ── */}
          {variant === "image-only" && imageSrc && (
            <CardItem translateZ={8} className="w-full">
              <img
                src={imageSrc}
                alt=""
                width={imageWidth}
                height={imageHeight}
                className="w-full h-auto block"
              />
            </CardItem>
          )}

          {/* ── text-only ── */}
          {variant === "text-only" && (
            <div className="p-5 sm:p-8">
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
              {fullPageLink && (
                <CardItem translateZ={5} className="w-full">
                  {fullPageLink}
                </CardItem>
              )}
            </div>
          )}

        </CardBody>
      </CardContainer>
    </div>
  );
}
