+++
date = 2026-08-04
title = "Getting Stuck Was the Feature"
description = "Teams used to circle back because someone got stuck. Getting stuck still happens constantly. It just stopped meaning anything."

[extra]
promo_image = "promo-getting-stuck-was-the-feature.png"

[taxonomies]
tags = ["AI"]
+++

We had a conversation about approach on a Tuesday afternoon. A good one. Two of us, both experienced, neither reporting to the other. We talked through the problem, agreed on the general shape of it, and split off to think.

Wednesday morning there was a solution. Not a sketch, not a spike. A working, complicated, thoroughly scope-crept solution that answered a dozen questions we never discussed.

<!-- more -->

I'd like to tell you that was one specific Tuesday. It wasn't. It's happened often enough over the last few months that the instances have run together, and I can't isolate one anymore. That's its own kind of evidence, and it's the reason I'm writing this down instead of filing it under "bad week."

I've been on both sides of that Wednesday, and more often than I'd like, I'm the one who showed up with too much. So this is a post about a loop that used to work and doesn't anymore, and about why I didn't notice it breaking.

## The loop nobody wrote down

Before LLM-assisted development, a small team investigating something ran roughly the same play every time. Talk about the problem. Split off to research. Circle back. Compare approaches, findings, dead ends. Argue a bit. Converge on the best version, which was almost never anybody's original version. Then divide and conquer on the thing you actually agreed to build.

Nobody documented that. It wasn't in a process wiki. It just happened, on every team I've been on, for twenty years.

Here's the part I never thought about until recently: nothing scheduled the circle back.

We had standups and sprint planning and design review, same as everyone. Those aren't what I mean. A standup surfaces status, not forks. Design review happens after somebody already has a design. The mid-investigation return, the one where you say "I found something and I don't know what to do with it yet," was never on anybody's calendar.

You came back because you got stuck. You hit a fork you couldn't resolve alone. You found something in the codebase that contradicted your assumption. You needed a decision that wasn't yours to make, or a piece of context that lived in someone else's head. So you walked down the hall, or dropped it in Slack, and the conversation happened.

Getting stuck was the meeting invite. Not discipline. Not process. Friction.

I should be honest about one thing before going further. This loop was fraying long before LLMs showed up. Remote work thinned the hallway, calendars ate the drop-by, and you could argue the tooling didn't kill the loop, it just finished the job. Maybe. But for us it didn't fade. It snapped, and it snapped in March, the month the tooling arrived. Nothing else about how we work changed that month. Same people, same setup, same hours.

## The stuck didn't go away

I had this backwards for a while, and I was pretty confident about it too, which is the part I'd like back. I assumed the tools removed the friction, that work got smooth and the conversations became unnecessary.

That's not what happened. You get stuck constantly now. Every seam you hadn't considered, every feature interaction nobody thought through, every place two subsystems have to agree on something. It comes hot and heavy the entire time, because the work is moving fast enough to reach all of it in an evening. Questions that used to surface across three weeks arrive across three hours.

That's more friction, not less, and it's exactly what broke the loop.

When being stuck was rare and expensive, it meant something. That was the entire mechanism. Rarity is what made it worth interrupting somebody over. Now it fires every ninety seconds, and you can't take ninety-second interruptions to a colleague forty times in a day. Nobody can, and nobody should. (Try it for a week and see how long the friendship lasts.)

So the friction didn't disappear. It became so abundant that it stopped being information. You can't route on a signal that never stops firing. You filter it.

## "(Recommended)"

The filter comes built in.

The model asks you a question. A real one, about a genuine fork, exactly the kind of decision that deserves a second person in the room. It even does you the courtesy of laying out the choices, three tidy options, one of them tagged "(Recommended)". Maybe you don't know that corner of the system well. Maybe it's a tradeoff you'd normally want to sit with someone on.

You take the recommended one.

That's the whole interaction. On a good day you weigh the options. On a normal day you read the word "recommended" and stop reading. And on plenty of days you skip the question entirely and type "do what you think is best" up front, which is the same move with the remaining steps removed.

The part that bothers me is that the tool is doing its job correctly. It found the fork. It stopped. It asked. The check-in fired exactly the way it's supposed to. It just fired at somebody who answered it with the default.

Look at what happened to the signal. It used to be that not understanding something sent you toward a conversation. You'd go find the person who knew. Now not understanding something sends you *away* from a conversation, because there is a faster, cheaper, always-available option sitting right there that will take the decision off your hands.

**Not understanding something used to be the beginning of a conversation. Now it's the end of one.**

That reflex is also where the complexity comes from. The Wednesday-morning solution isn't one big overreach. It's a long run of small delegations, each one individually defensible, each one compounding on the last. Stack enough of them overnight and you get exactly what showed up: well past the scope anyone asked for, and understood completely by nobody, including the person who produced it.

Which brings you to the last one. There is exactly one kind of stuck left that still means what it used to, and it arrives around hour thirty, when the thing is built and working and you can't explain how it works. That one is real. So who do you take it to? There's nobody. You're the closest thing to an expert on a system you met yesterday.

## The ceremonies can't absorb it

The obvious objection is that we have process for this. We do. It doesn't fit anymore.

Yesterday's standup: "Today I'm going to look at whether we can containerize one sliver of this system." Today's standup: "I'm blocked, I need AWS access to spin up a K8s cluster so the containers can search for extraterrestrial life."

Nobody in a fifteen-minute standup can evaluate that. There's no format for it. The whole ritual assumes yesterday and today are adjacent, that the distance between two status updates is a distance a room full of people can absorb out loud. That assumption held for a long time and it doesn't now.

That's probably its own post. I'm not sure the ceremonies survive this pace, and I'm less sure what replaces them.

## Slop that compiles

We've landed on "AI slop" as the name for output like this, and I think the term misleads people in engineering circles, because it makes you picture something obviously bad. Six-fingered hands. A blog post that keeps saying "delve." Something you can spot from across the room.

Code doesn't work that way. Slop in a codebase compiles. It has tests, error handling, a config layer, a sensible folder structure, and a tidy little abstraction you never asked for. It survives review, not because reviewers are asleep, but because review is built to catch "this is wrong," and it has nothing at all to say about "nobody decided this."

The quality is fine. That's what makes it hard to argue with.

## The part where there's no spec

If you work somewhere with real specs, maybe this is survivable. Somebody wrote down what "done" means, and the delegations at least had a fence to stay inside.

That's not the world I work in. We get handed complicated problems and asked to ideate. Defining the spec *is* the job. Which means the exploration phase was never really about exploration. Exploration was how the spec got written. Five people talking, splitting, returning, comparing, and the requirements precipitating out of the conversation over a week or two. Slow enough that everyone was carrying the same picture in their head by the end.

So when exploration happens overnight, the spec doesn't get skipped. It gets written anyway. It's just written by a model filling gaps with reasonable defaults, ratified by a human taking the recommended option, and discovered by everybody else the next morning, already embedded in something that runs.

The requirements are in there. Nobody read them.

## And yes, I want mine to win

Put two people on a problem who are both used to being the one who decides, with no reporting line between them, and they will both tell you they have no ego about this. They'll both be wrong. I know because I'm one of them.

That was survivable when the artifact was a sketch. Backing down from a sketch costs you nothing. You shrug, you say "yeah, yours is cleaner," the sketch goes in the trash, and you're out twenty minutes. Backing down from a working system costs somebody a night, and now every concession has a price tag on it. So the concessions stop, and the discussion turns into a defense of something that already exists instead of a comparison of things that might.

**The ego was always there. What changed is that we made it expensive.**

Which means it doesn't resolve with an argument. Both solutions work. Both get kept. And each of us goes on using our own.

I can hear the objection, so let me be precise about where this lives. Would we keep two ORM implementations in production? No. Nobody would, and if we tried, review would catch it. The duplication lives a layer down, in the tooling. Take agent skills, the little packaged instructions that teach a coding agent how we work. They grow organically, the way personal scripts always have, except now they grow fast and they grow capable. I've got one that solves a problem. They've got one that solves the same problem, plus a bit more. I could adopt theirs tomorrow. I haven't, because I don't trust it. Not because they're careless. Because trusting it means reading my way through something that grew overnight, and that costs more than keeping mine.

That's the story I tell myself, anyway. Some of it is honest caution. Some of it is that mine is mine.

Nothing about this feels like a failure at the time. Nothing broke. Nothing was even decided. And review never touches that layer, which matters, because that layer is where a growing share of the real work happens now. A duplicated skill is small enough to survive indefinitely. The Wednesday-morning solution is the same reflex at full size.

So now there are two ways to do the same thing, both maintained, each one used by exactly one person. And whoever inherits them won't be able to tell you why. (Neither can I, and I was in the room.)

## I don't know how this ends

I'd like to close with the practices we adopted. We haven't landed on any that stuck. (We had a list. It didn't survive contact with a sprint.)

Part of the problem is that nothing has broken. The systems built this way are shipping. The business is satisfied. And I have the numbers, which is the worst part of it. We changed how we work in March. Here is what happened on either side of that line.

The flattering version: pull requests merged per month up 4.1x, stories and bugs closed per month up 5.5x. I'm not going to use those. The stretch I'd be measuring against was the quietest one we had all year, with me barely committing through most of it. Those multiples are an upper bound and I know it, which is worth saying out loud in a post about numbers nobody examined.

Here's the one I trust. One developer, same codebase, same working hours on both sides of the cutover, nothing we can point to changed but the tooling. Code landed per month went up 2.7x. Median pull request size went from 106.5 lines to 206.

And here's the one that actually bothers me. Measured against our pre-AI high-water mark, same people, same product, nobody hired in between, we close 54% more stories and bugs, we land slightly more code, and we do it on 15% *fewer* pull requests. Median pull request size across that comparison went from 68 source lines to 237.

Fewer review events. Three and a half times the size.

Reviewers timebox. They always have. A pull request three and a half times the size does not get three and a half times the scrutiny. It gets whatever attention the reviewer had budgeted that morning. So the delegations are landing in larger batches, in front of fewer opportunities to catch them, reviewed by people with exactly as much attention as they had a year ago.

I know the enthusiastic answer here, because I've heard it: stop reviewing them. Let a model review the model's work. For catching defects, that might even hold up. But catching defects was never the only thing review was quietly doing for a team. It was the last spot where a second human looked at the decisions before they became load-bearing. Automate that away and the bottleneck clears, sure. So does the last trace of anybody understanding what we ship. That isn't a fix for the problem I've been describing. It's the problem, completed.

And not one of those numbers measures whether anybody understood any of it. That isn't a gap in our dashboards. There is no metric for that. It's the thing I most want to measure and the thing I can't.

I owe you the other side of this, and I can't produce it cleanly. There are certainly cases where the overnight version was the right call. Problems where a week of the two of us talking would have produced a confident wrong answer, and building the thing in an evening settled it for good, because the information was never going to be available in a conference room at any price. I'm sure that has happened. I can't point you at a specific one.

Which is the same trouble I had at the top of this post. I can't isolate a single instance of it going badly either. That's what this pace does. Nothing is a story anymore, it's all a rate, and I ended up in a spreadsheet precisely because I couldn't tell you about a Tuesday.

So I'm sitting with a suspicion I can't prove: **we're accruing a bill that hasn't come due, and the currency is understanding.** I think it arrives as an incident nobody can debug without the model that wrote the thing, or an onboarding that takes three times as long as it should, or a refactor that no one on the team will volunteer for. I don't know which. I'd like to be specific and I can't be yet.

The uncomfortable part is that "everything looks fine right now" is exactly what it looks like if I'm right and early. It is also exactly what it looks like if I'm nostalgic for a pace that no longer has any reason to exist. The old loop produced understanding, and I believe understanding matters. I can't currently prove that it does, and the last year of results is not helping my case.

The one thing I'm reasonably sure of is a prescription, so I'll call it that instead of pretending otherwise: friction used to schedule our conversations, and it doesn't anymore. If those conversations are still worth having, somebody has to put them on the calendar on purpose, because nothing is going to force them.

I haven't seen how this story ends.

Which makes this the part where I should do the thing I've spent two thousand words saying nobody does anymore, and ask somebody before I've made up my mind. So: if you're running a small team through this, are you seeing it? And if you think I've got it backwards, that this is just a guy who misses whiteboards, I'd genuinely like to hear that too. I'm not hard to find. I'd rather get argued out of this than turn out to be right about it.
