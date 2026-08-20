export interface TeachingOrg {
  name: string;
  /**
   * Imported logo asset (SVG preferred) from `src/assets/images/logos/`.
   * When absent the band falls back to a typeset wordmark, so a name alone is enough
   * to ship — drop the file in later and it upgrades without touching the markup.
   */
  logo?: string;
  url?: string;
}

export interface EducationFormat {
  title: string;
  description: string;
  /** Short qualifier shown as a pill — who it's for, or how it runs. */
  meta: string;
}

/**
 * Organisations D'Aaron has taught with or trained. Add entries here and the homepage
 * band renders them; leave it empty and the band is skipped entirely.
 */
export const teachingOrgs: TeachingOrg[] = [];

export const educationFormats: EducationFormat[] = [
  {
    title: "Team Workshops",
    description:
      "Live, hands-on sessions built around your actual workflows — not a generic AI deck. Your team leaves having shipped something real.",
    meta: "Half-day or full-day",
  },
  {
    title: "Cohort Programs",
    description:
      "A multi-week arc that takes a group from cautious to fluent, with assignments against your own tooling between sessions.",
    meta: "4–8 weeks",
  },
  {
    title: "1:1 Coaching",
    description:
      "Working sessions for founders and operators who need to build and decide at the same time. We solve your problem, in your stack.",
    meta: "Ongoing",
  },
  {
    title: "On-Demand Curriculum",
    description:
      "Recorded lessons and written playbooks your team keeps — so onboarding the next hire doesn't mean booking me again.",
    meta: "Yours to keep",
  },
];
