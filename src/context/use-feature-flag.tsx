import posthog from "posthog-js";

export type Feature<T extends readonly unknown[]> = {
  key: string;
  variations: T;
};

export const features = {
  "map-city-center": {
    name: "Map City Center",
    variations: ["control", "los_angles", "chicago", "miami", "san_francisco", "atlanta"],
  },
} as const;
export type FeatureKey = keyof typeof features;
export type FeatureValue = {
  [K in FeatureKey]: (typeof features)[K]["variations"][number];
};

export const useFeatureFlag = <K extends FeatureKey>(
  featureKey: K,
  defaultValue: (typeof features)[K]["variations"][number] = "control",
): { value: FeatureValue[K] } => {
  const val = (posthog.getFeatureFlag(featureKey) ?? defaultValue) as FeatureValue[K];
  return { value: val };
};
