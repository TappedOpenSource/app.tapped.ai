
import posthog from "posthog-js";

type EventName = "marker_clicked"
  | "sidebar_toggle"
  | "contact_venue"
  | "featured_performer_click"
  | "apply_for_opportunity"
  | "menu_click"
  | "login"
  | "signup"
  | "logout"
  | "search_bar_clicked";

export function trackEvent(event: EventName, properties?: Record<string, any>) {
  posthog.capture(event, properties);
}
