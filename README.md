# OSIntric - Red Team Collaboration Platform

## Overview

OSIntric is a polished, production-ready UI mockup for a red-team collaboration web application. This is a **static demonstration** with realistic mock data - no live scanning, data collection, or backend functionality.

## Features

### Three Main Sections

1. **Reconnaissance** - View discovered people and social profiles with detail sidebars
2. **Vulnerability Assessment** - Browse findings in table view or triage via Kanban board
3. **Post-Exploitation** - Examine synthetic test artifacts with mock detection results

### Additional Features

- Project dashboard with statistics and activity feed
- Collaboration features (comments, activity stream, assignments)
- Dark theme security-focused design
- Responsive layout (desktop-first, 1280px container)

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Lucide React** for icons

## Mock Data

All data is synthetic and located in `src/data/`:

- `projects.json` - 3 mock projects
- `recon_people.json` - 5+ discovered people with social profiles
- `vuln_findings.json` - 8+ vulnerability findings
- `postex_artifacts.json` - 5+ test artifacts with detection results
- `activity.json` - Recent activity stream

**Important:** All leaked data, credentials, malware names, and detection results are completely synthetic and safe.

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   └── AppLayout.tsx    # Main layout with header and nav
├── data/                # Mock JSON data files
├── pages/
│   ├── Dashboard.tsx         # Project list and stats
│   ├── ProjectOverview.tsx   # Single project overview
│   ├── Reconnaissance.tsx    # People discovery view
│   ├── Vulnerabilities.tsx   # Findings table + Kanban
│   └── PostExploitation.tsx  # Artifacts viewer
├── App.tsx              # Routing configuration
└── index.css            # Design system tokens
```

## Design System

The application uses a dark, security-focused theme with:

- **Colors**: Deep navy backgrounds, cyan primary, severity-coded badges (red/orange/yellow/green)
- **Typography**: Inter for UI, JetBrains Mono for technical data
- **Components**: Consistent spacing, hover states, and focus indicators
- All colors defined as HSL tokens in `src/index.css`

## Customization

### Editing Mock Data

Edit JSON files in `src/data/` to change displayed information. All fields are self-explanatory.

### Changing Theme

Update CSS variables in `src/index.css` under `:root` (light) or `.dark` (dark mode).

### Adding Pages

1. Create new page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/AppLayout.tsx` if needed

## Legal & Safety Notes

- This is a **demo/mockup only** - no real scanning or data collection
- All displayed data is synthetic and safe
- Real red team operations require proper authorization, legal agreements, and controlled environments
- The Post-Exploitation section includes prominent disclaimers about synthetic results

## License

This project is a demonstration/mockup. Refer to your organization's policies for usage.

## Support

For questions about this mockup, contact your project administrator.
