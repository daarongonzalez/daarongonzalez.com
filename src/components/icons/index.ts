import GradCapIcon from "./GradCapIcon";
import CompassIcon from "./CompassIcon";
import BracketsIcon from "./BracketsIcon";

export const icons = {
  "grad-cap": GradCapIcon,
  compass: CompassIcon,
  brackets: BracketsIcon,
} as const;

export type IconName = keyof typeof icons;
