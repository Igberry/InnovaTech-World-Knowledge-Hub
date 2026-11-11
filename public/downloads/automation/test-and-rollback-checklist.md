# Test and Rollback Checklist

> Before you let an automation run on anything real, test it safely and know how to undo it.
> This checklist keeps a small automation from causing a big problem.

## Before testing

- [ ] I am testing with **sample data**, not real customers, real money, or the only copy of data
- [ ] I have a **copy or backup** of anything the automation will change
- [ ] I know exactly **what the automation is supposed to do** (the blueprint)

## Test in stages

1. **Dry run:** read through the steps. Does each one do what I expect?
2. **One safe run:** trigger it once with sample data. Check the result by hand.
3. **A few real runs, watched:** let it run on real cases while I watch each result.
4. **Trust gradually:** only leave it unwatched after it has worked correctly several times.

## Check the result each time

- [ ] It did the right thing to the right item
- [ ] It did **not** do anything extra or unexpected
- [ ] It did not fire when it should not have
- [ ] Nothing private leaked to the wrong place

## Know your rollback (the "undo" plan)

- How to **switch it off** quickly: _______________________
- How to **undo** what it already did (or why it is safe if you cannot): _______________________
- The **manual backup**, how to do the job by hand if the automation is off: _______________________

## Ongoing

- [ ] I check it works after any change to a connected app
- [ ] I review it every so often to confirm it still behaves
- [ ] Someone knows how to turn it off if I am not around

> **Warning:** Automations can repeat a mistake very fast. A bad rule can send 500 wrong messages before
> you notice. Test small, watch closely, and keep the off switch within reach.

> **Rule of thumb:** If you cannot undo it and cannot turn it off, do not automate it yet.
