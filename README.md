```
        ┌─────────────────────────────────────────────┐
        │                                             │
        │    ██████╗ ██╗████████╗                     │
        │   ██╔════╝░██║╚══██╔══╝                     │
        │   ██║░░██╗░██║░░░██║░░░                     │
        │   ██║░░╚██╗██║░░░██║░░░                     │
        │   ╚██████╔╝██║░░░██║░░░                     │
        │    ╚═════╝░╚═╝░░░╚═╝░░░                     │
        │   ┌─┐┬─┐┌─┐┌┐ ┬  ┌─┐┌┬┐                     │
        │   ├─┘├┬┘│ │├┴┐│  ├┤ │││                     │
        │   ┴  ┴└─└─┘└─┘┴─┘└─┘┴ ┴                     │
        │                                             │
        │   break git on purpose. learn how it works. │
        │                                             │
        └─────────────────────────────────────────────┘
```

> _"Every senior dev has done a force push to main at least once. The difference is they know how to fix it."_

---

## What is this?

**gitproblem** is a terminal-based interactive tool that teaches you git by letting you screw things up — on purpose.

No slides. No passive tutorials. No "just memorize these 15 commands."

You get a real git repo, a visual commit graph updating in real time, and challenges designed to put you in the exact situations that make devs sweat in interviews: messy rebases, merge conflicts from hell, detached HEAD states, and the classic "I accidentally force pushed to main."

You break it. You see the damage. You fix it. You understand _why_.

---

## How it looks

```
┌─ Commit Graph ───────────────────┐  ┌─ Status ───────────────┐
│                                  │  │                        │
│  * a1b2c3d (HEAD -> feature)     │  │  Branch: feature       │
│  │ Add user authentication       │  │  HEAD:   a1b2c3d       │
│  │                               │  │                        │
│  │ * f4e5d6a (main)              │  │  Staging:  2 files     │
│  │/  Merge pull request #12      │  │  Modified: 1 file      │
│  *   e7f8a9b                     │  │  Untracked: 0          │
│  │   Initial commit              │  │                        │
│                                  │  └────────────────────────┘
├──────────────────────────────────┤
│ Challenge: Rebase Gone Wrong     │  ┌─ Explanation ──────────┐
│                                  │  │                        │
│ You rebased feature onto main    │  │  rebase rewrites       │
│ but there are conflicts.         │  │  commit history.       │
│ The team already pulled the      │  │  When others have      │
│ old feature branch.              │  │  your old commits,     │
│                                  │  │  rewriting creates     │
│ > Now what? _                    │  │  divergent histories.  │
│                                  │  │                        │
└──────────────────────────────────┘  └────────────────────────┘
```

---

## What you'll actually learn

Not the basics. You already know `add`, `commit`, `push`.

This is the stuff that separates "I use git" from "I understand git":

- **Merge vs Rebase** — when to use which, and what happens when you pick wrong
- **Conflict resolution** — real conflicts, not toy examples
- **Stash workflows** — juggling work across branches without losing anything
- **Cherry-pick** — surgical commit transplants
- **Reset vs Revert** — one rewrites history, one doesn't. know the difference.
- **Reflog** — your safety net when everything goes wrong
- **Bisect** — find the exact commit that broke everything

Each topic has challenges that escalate. You start with the "normal" scenario, then hit the edge cases that actually happen in real teams.

---

## Built with

| Tech       | Why                                           |
|-----------|-----------------------------------------------|
| Node.js    | Runtime                                       |
| TypeScript | Because `any` is not a type, it's giving up   |
| Ink        | React, but in your terminal                   |

No electron. No browser. No GUI. Just your terminal.

---

## Getting started

```bash
git clone https://github.com/YOUR_USERNAME/gitproblem.git
cd gitproblem
npm install
npm run dev
```

> Requires Node.js 18+ and a terminal that supports colors (most do).

---

## The philosophy

Most git tutorials teach you commands. **gitproblem** teaches you the mental model.

Git is not a list of commands. It's a directed acyclic graph of snapshots with mutable pointers. Once you see it that way — once you _watch_ the graph change as you type commands — the commands stop being magic spells and start being obvious.

The "intentional error" approach exists because:
1. You remember mistakes better than instructions
2. Knowing how to recover is more valuable than never failing
3. Every real codebase has someone who will mess up the git history. might as well be ready.

---

## Status

🚧 **Under active development.**

This started as a personal learning project — built to teach myself git properly while also learning React and TypeScript. If it helps you too, that's a win.

---

## License

MIT — break it, fork it, learn from it.
