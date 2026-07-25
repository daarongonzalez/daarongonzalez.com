export interface UpcomingEvent {
  title: string;
  date: string;
}

export interface PastEvent {
  title: string;
  date: string;
}

export const nextEvent = {
  title: "AI Agent Orchestrator Workshop",
  description:
    "A hands-on session on turning your team's AI licenses into a working orchestration practice.",
  dateTime: "Aug 14, 2026 · 10:00 AM PT · Online",
  imageLabel: "Workshop photo",
};

export const upcomingEvents: UpcomingEvent[] = [
  { title: "Stack.expert — Claude for Consultants", date: "Sept 4, 2026 · Online" },
  { title: "Design Systems for AI Products", date: "Sept 22, 2026 · Online" },
];

export const pastEvents: PastEvent[] = [
  { title: "Replit for Rapid Prototyping", date: "May 12, 2026" },
  { title: "Intro to AI Process Audits", date: "March 3, 2026" },
];
