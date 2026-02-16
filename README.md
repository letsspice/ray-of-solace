# ray-of-solace

A private, lightweight emotional check-in and celebration app built exclusively for two people — **Ray and Rocher**.

**ray-of-solace** is designed as a calm digital sanctuary where meaningful dates trigger custom messages, and emotional check-ins can be shared quietly through a simple weighted system. The goal is to reduce friction around communication, especially during heavy moments, while preserving intimacy and intentionality.

This project prioritizes softness, simplicity, and privacy over feature complexity.

---

## ✨ Purpose

Relationships often struggle not because of lack of care, but because communication becomes difficult during emotional overload. 

**ray-of-solace** exists to:
* Provide gentle reminders on meaningful relationship dates
* Offer a low-pressure emotional check-in system
* Create a quiet, intentional communication channel
* Encourage emotional awareness without demanding conversation

> This is not a social app. It is a personal sanctuary.

---

## 🧠 Core Concepts

### Date-Based Messages
Special dates trigger custom messages tailored to Ray. These messages are stored in a structured data file and automatically displayed when the date arrives. This allows intentional celebration without relying on memory or external reminders.

### Emotional Check-Ins
Ray can submit a simple weighted emotional state (for example 1–10) along with an optional note. The system sends a quiet notification to Rocher without requiring immediate discussion. 

**The design philosophy is:** Signal without pressure.

### Code Words
Predefined emotional shorthand words act as safe communication signals. These allow emotional expression when words feel heavy.

---

## 🏗 Architecture Overview

**ray-of-solace** is built as a lightweight frontend-first application with external form handling. The structure emphasizes clarity, maintainability, and emotional UX.

### Technology Stack
* **Next.js** — application framework
* **TypeScript** — type safety
* **Tailwind CSS** — styling system
* **pnpm** — dependency management
* **Formspree** — quiet message delivery
* **Vercel** — deployment platform

### Design Principles
* Minimal cognitive load
* Soft interaction patterns
* Private-by-default architecture
* Extendable without overengineering

---

## 🚀 Getting Started

### Requirements
* Node.js (modern LTS recommended)
* pnpm installed globally

### Installation
Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd ray-of-solace
pnpm install
```

### Running the App

Run the development server:
```Bash
pnpm dev
```

### Environment Configuration

The application relies on environment variables for external form handling. Create a .env.local file:

```Code snippet

NEXT_PUBLIC_FORMSPREE_FORM_ID=your-form-id
```

This keeps private integration details outside version control.

### Project Structure Philosophy

The structure is intentionally simple:
- Data layer — stores date messages and emotional code words
- UI layer — presents calm, focused interaction components
- Integration layer — handles external message submission

The goal is readability and emotional clarity, not framework cleverness.

### Roadmap

#### Phase 1 — Foundation
- Date-triggered message display
- Emotional check-in submission
- Core UI layout

#### Phase 2 — Emotional UX
- Code word selector
- Silent confirmation feedback
- Accessibility refinements

#### Phase 3 — Memory Layer
- Submission history storage
- Lightweight emotional trends
- Privacy safeguards

#### Phase 4 — Polish
- Visual refinement
- Performance tuning
- Deployment hardening


### Design Philosophy

ray-of-solace is built around emotional ergonomics:
1. Reduce decision fatigue
2. Remove conversational pressure
3. Encourage intentional connection
4. Preserve emotional safety

Every feature must answer: Does this make communication softer, not louder?


### Privacy Considerations

This app is intentionally private.
1. No analytics by default
2. No social features
3. Minimal data exposure
4. User-controlled storage direction

Future storage features should prioritize consent and clarity.


### Future Possibilities
1. Shared emotional timeline
2. Personalized message scheduling
3. Reflection journaling
4. Gentle notification system
5. Offline-first capability

All expansions should preserve the core principle: Quiet connection over feature density.


### License

MIT - adaptable for personal or open experimentation.

### Closing Thought

ray-of-solace is not about productivity. It is about presence.

A small digital space that says:
> “I see you. Take your time.”

---

## Tailwind design sandbox

The Tailwind design system lives in tailwind.config.ts, with global Stone & Light tokens in src/app/globals.css and the interactive TestScreen playground in src/components/TestScreen.tsx. To explore it locally, install styling deps and plugins with `pnpm add -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography`, run `pnpm tailwindcss init -p` if you haven’t already, then start the app with `pnpm dev`.