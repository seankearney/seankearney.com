+++
date = 2026-03-02
title = "Devin vs Claude Code: Different Animals"
description = "A real-world comparison of two AI coding agents after running them both through the same kinds of tasks."

[extra]
promo_image = "promo-devin-vs-claude-code-different-animals.png"

[taxonomies]
tags = ["AI"]
+++

I've now run two AI coding agents through real work on real projects, and I have thoughts. <!-- more --> If you missed the earlier posts, I gave Devin a [Vue 2 to Vue 3 migration](@/post/2024-12-21-devinai-vuejs/index.md) and watched it burn through ACUs while delivering a build that worked on its machine and nowhere else, then I gave it [a Zola theme from scratch](@/post/2024-12-25-devinai-builds-zola-theme/index.md) and it came out pretty good after nine rounds of feedback. Two experiments. Two very different outcomes. And then I started using Claude Code. Worth noting: I haven't used Devin since those posts, so the product has almost certainly changed. What follows is based on my experience at the time, not where either tool stands today.

Here's the thing — comparing Devin and Claude Code as if they're competing for the same job is like comparing a contractor you hire to renovate your kitchen while you're on vacation to a contractor who works beside you all day while you hand them tools. They're not doing the same thing. They just both happen to use a hammer.

Devin runs on its own machine. You give it a task, it spins up its environment, works autonomously, and eventually reports back. You can check in on it, but the rhythm is: describe the job, walk away, come back and see what it did. That's the design. That's the pitch.

Claude Code runs in *your* environment. It's a conversation that happens right where your code lives. You're in the loop — not as a bystander reviewing a pull request four hours later, but as an active participant who can say "no, not like that" three seconds after it proposes something sideways. The feedback loop is immediate because the loop never closes. You're always in it.

That distinction sounds small. It isn't.

## What Devin Does Better

The Zola theme experiment was the clearest win I saw from Devin, and it's a good template for understanding where it shines. The requirements were visual and containable: build a blog theme with Tailwind CSS, here are the design constraints, go. Devin could spin up a browser, render the output, and validate its own work visually — all on its own machine, where everything it needed was available. Nine rounds of feedback, but the end result was genuinely usable and faster than I would have done it manually.

That's Devin's sweet spot: **UI-heavy, visually verifiable tasks with tight requirements, where cross-environment friction is low or nonexistent.** Web UI work fits this well because a browser renders HTML the same way on Devin's machine as it does on yours. If you can describe what "done" looks like in visual terms, Devin can chase that target autonomously.

It's also useful for long-running autonomous work — the kind where you actually want to walk away. Generate boilerplate for 50 components. Scaffold out a project structure. Write repetitive unit tests against a spec. If the task is well-defined, repetitive, and doesn't require cross-environment verification, Devin can grind through it while you do something else. Think of it as a junior dev you can assign a ticket to, go to lunch, and come back to a PR. Sometimes the PR is great. Sometimes it's confidently wrong.

The caveat I can't skip: Devin's requirements need to be *tight*. I learned this the hard way. Vague requirements don't produce vague results — they produce wrong results delivered with full confidence. And you won't find out until after it's spent four hours heading in the wrong direction.

## What Claude Code Does Better

The Vue.js migration was where I first understood the "works on Devin's machine" problem. Devin's build passed. My build didn't. The errors only surfaced in my environment, and Devin couldn't reproduce them, which meant it couldn't fix them. I went in circles. I gave up.

Claude Code doesn't have this problem because it *is* in your environment. When something breaks, it breaks right in front of both of you. When I've used Claude Code for debugging Zola config issues, editing TOML and Markdown files, working through the structure of a post like this one — it's operating on the same filesystem I'm looking at. There's no translation layer. No "it worked when I tested it."

The short feedback loop is the real win. You see what it's doing. You can redirect mid-thought. That's not nothing — that's enormous when you're working on something where the definition of "done" is still evolving. The Vue migration had a clear destination and Devin still lost its way. But a lot of real development work doesn't have a clear destination. You're exploring. You're asking "what's the cleanest way to structure this?" and expecting a conversation, not a completed pull request. Claude Code handles that mode of work well. Devin doesn't, because it wasn't built for it.

It's also better at reasoning-heavy tasks — the ones where the answer isn't "execute these steps" but "think through this with me." Architecture questions. Tradeoff discussions. Figuring out why something is structured the way it is before deciding whether to change it. These aren't tasks you'd hand to someone and say "call me when it's done." These are conversations. I should be honest here though: some of this might be model quality, not tool architecture. Claude's underlying model is significantly more capable than whatever Devin was running ten months ago. Tool comparison or model comparison — hard to fully separate the two.

The honest caveat: Claude Code is a force multiplier, not a replacement. You need to be there. If you want to go make dinner and come back to a finished feature, Claude Code is not your tool. It's interactive by nature. That's the price of the short feedback loop.

## The Tasks That Broke Each One

Devin broke hardest on the Vue 3 migration. Not because the task was too complex in theory, but because the failure mode was one it structurally couldn't handle: **errors it couldn't reproduce.** When a build fails on your machine but not the machine doing the work, you've hit a wall. Devin's response was to keep trying variations — different approaches, different configurations — without ever getting real signal about what was wrong. It claimed success at least once when things were, in fact, not working. I don't think it was lying. I think it genuinely couldn't tell the difference because it had no way to run my build.

Claude Code can technically handle the "while I sleep" class of task — but there's a catch. To run autonomously without prompting you for permission on every file write and shell command, you have to pass `--dangerously-skip-permissions`. That flag is not subtle. Devin, by contrast, runs in a sandbox by default. It can't accidentally delete something on your machine because it doesn't have access to your machine. Claude Code running with full permissions on your local environment is a different risk profile entirely. It also doesn't interact well with a live browser or running application outside the terminal. If your verification step is "open the app and click through it," Claude Code can't do that leg of the work.

Neither of these is a criticism so much as a description. A hammer isn't broken because it can't drive a screw.

## Lessons Learned

1. **"Autonomous" and "better" aren't synonyms.** Sometimes you want to be in the loop. Sometimes the loop is what keeps the work on track.

2. **Devin operates like a junior dev.** Capable, but needs a clear spec and produces work you still need to review. Claude Code can operate more like a senior collaborator — reasoning through tradeoffs, pushing back, asking the right questions. Whether that's the tool or the model underneath it, the experience is different.

3. **Devin's cross-environment problem is a real architectural weakness** for anything that runs outside a browser. If your verification requires your machine, your OS, or your local config, Devin can't verify it. That's not a bug they'll patch — it's fundamental to the design.

4. **Claude Code's sweet spot**: you know roughly what "done" looks like, you don't want to type it yourself, and you want to stay in the conversation. Reasoning-heavy work, exploratory work, targeted edits with immediate feedback.

5. **Devin's sweet spot**: well-defined tasks, UI-heavy output, no cross-environment verification required, and you actually want to walk away. Tight requirements are non-negotiable.

6. **Neither tool changes the fact that requirements matter.** If anything, both tools make vague requirements more expensive — not less. A confused junior dev wastes an afternoon. A confused AI agent does the same, just faster and with more confidence.

I'm still not ready to plant a flag on AI coding agents. The Zola theme experiment showed me genuine value. The Vue migration showed me a real failure mode that cost real time. Claude Code has quietly become part of how I actually work — not as a replacement for thinking, but as a way to move faster when I already know what I'm trying to do. The fence is still there. I just have a better map of it now. GitHub Copilot also recently added a CLI agent, and I've been putting that through its paces too. More on that soon.
