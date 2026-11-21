export const OPEN_TICKET_EVENT = "serc:open-ticket";

/** Opens the registration ticket pop-up from anywhere on the site. */
export function openTicket() {
  window.dispatchEvent(new Event(OPEN_TICKET_EVENT));
}
