/**
 * Media abstraction layer.
 *
 * UI components resolve imagery through a semantic key, never a raw file
 * path. Today every key points at a static file under /public/images
 * (the two prototype stills handed off from Claude Design). When the
 * Admin Media Library ships, this module becomes the place that resolves
 * a key to a CMS-managed URL instead — no component changes required.
 */

export type MediaKey =
  | "hero.primary"
  | "court.close"
  | "court.wide"
  | "band.glass"
  | "band.surface"
  | "locations.panel";

const REGISTRY: Record<MediaKey, string> = {
  "hero.primary": "/images/padel-close.png",
  "court.close": "/images/padel-close.png",
  "court.wide": "/images/padel-wide.png",
  "band.glass": "/images/padel-wide.png",
  "band.surface": "/images/padel-wide.png",
  "locations.panel": "/images/padel-wide.png",
};

export function getMediaUrl(key: MediaKey): string {
  return REGISTRY[key];
}

/**
 * A background-image crop descriptor. The prototype's two source stills
 * are website mockups with a lime wordmark and fake nav baked into the
 * pixels, so every placement zooms into a hand-picked type-free region
 * via background-size/background-position rather than showing the frame.
 * Real photography (Phase 2+) can drop coverSize/coverPosition back to
 * "cover" / "center".
 */
export interface MediaCrop {
  key: MediaKey;
  size: string;
  position: string;
}
