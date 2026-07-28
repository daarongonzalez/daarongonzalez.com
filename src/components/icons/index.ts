import EducatorIcon from "./EducatorIcon";
import StrategistIcon from "./StrategistIcon";
import DeveloperIcon from "./DeveloperIcon";

export const icons = {
  educator: EducatorIcon,
  strategist: StrategistIcon,
  developer: DeveloperIcon,
} as const;

export type IconName = keyof typeof icons;
