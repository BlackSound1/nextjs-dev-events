# PostHog post-wizard report

The wizard has completed a deep integration of your Next.js project. PostHog has been configured using the `instrumentation-client.ts` file (recommended for Next.js 15.3+), with a reverse proxy set up through Next.js rewrites for improved reliability and to reduce tracking blocker interference. Event tracking has been added to key user interaction points across the application to capture engagement with events and navigation.

## Integration summary

### Files modified

| File | Changes |
|------|---------|
| `instrumentation-client.ts` | Updated `ui_host` to use environment variable |
| `next.config.ts` | Added reverse proxy rewrites for PostHog ingestion |
| `components/ExploreBtn.tsx` | Added `explore_events_clicked` event capture |
| `components/EventCard.tsx` | Added `event_card_clicked` event with event properties, converted to client component |
| `components/NavBar.tsx` | Added navigation click events, converted to client component |

### Events instrumented

| Event Name | Description | File |
|------------|-------------|------|
| `explore_events_clicked` | User clicked the Explore Events button to scroll down to the events section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view event details (includes event_title, event_slug, event_location, event_date properties) | `components/EventCard.tsx` |
| `nav_home_clicked` | User clicked the Home link in the navigation bar | `components/NavBar.tsx` |
| `nav_events_clicked` | User clicked the Events link in the navigation bar | `components/NavBar.tsx` |
| `nav_create_event_clicked` | User clicked the Create Event link in the navigation bar | `components/NavBar.tsx` |
| `nav_logo_clicked` | User clicked the logo to navigate home | `components/NavBar.tsx` |

### Environment variables

The following environment variables are configured in `.env`:

- `NEXT_PUBLIC_POSTHOG_KEY` - Your PostHog project API key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL (https://us.i.posthog.com)

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard

- [Analytics basics](https://us.posthog.com/project/270129/dashboard/927384) - Main dashboard with all insights

### Insights

- [Event Card Clicks by Event](https://us.posthog.com/project/270129/insights/JZTqJIvB) - Track which events are most popular based on user clicks
- [Explore to Event Click Funnel](https://us.posthog.com/project/270129/insights/PiSaleqe) - Conversion funnel from exploring events to clicking on a specific event
- [Navigation Clicks Overview](https://us.posthog.com/project/270129/insights/bn6Vv6Uq) - Track navigation usage patterns across the site
- [Daily Active Engagement](https://us.posthog.com/project/270129/insights/kwL2Nf1o) - Track unique users engaging with the site daily
- [Events by Location](https://us.posthog.com/project/270129/insights/vJyYMeAl) - Which event locations are most clicked

## Additional features enabled

- **Automatic pageview tracking** - PostHog will automatically capture pageviews with the `defaults: '2025-11-30'` configuration
- **Exception tracking** - Unhandled errors are automatically captured via `capture_exceptions: true`
- **Debug mode** - Debug logging is enabled in development for easier troubleshooting
- **Reverse proxy** - All PostHog requests are proxied through `/ingest` to avoid ad blockers
