import posthog from "posthog-js";

type EventName =
  | "search"
  | "marker_clicked"
  | "sidebar_toggle"
  | "contact_venue"
  | "featured_performer_click"
  | "top_performer_click"
  | "user_profile_link_copied"
  | "apply_for_opportunity"
  | "menu_click"
  | "login"
  | "signup"
  | "logout"
  | "search_bar_clicked"
  | "gauge_clicked"
  | "appstore_button_clicked"
  | "tutorial_click";

export function trackEvent(event: EventName, properties?: Record<string, any>) {
  posthog.capture(event, properties);
}
