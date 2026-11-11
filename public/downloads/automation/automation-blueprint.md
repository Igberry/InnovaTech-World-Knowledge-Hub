# Automation Blueprint (Document a Multi-Step Automation)

> Once an automation has more than one step, write it down so you (or someone else) can understand,
> test, fix, and trust it. Replace every [bracket].

## Overview

- Name of this automation: _______________________
- What job it does: _______________________
- How often it runs: _______________________
- Tools/apps involved: _______________________
- Owner (who maintains it): _______________________

## The steps

| # | Step | App/tool | Trigger or action | Notes / conditions |
|---|---|---|---|---|
| 1 | | | Trigger | |
| 2 | | | Action | |
| 3 | | | Action | |
| 4 | | | Action | |

## Conditions and branches

- Runs only if: _______________________
- If a condition is not met: _______________________

## What a human still checks

Automation does not mean no one looks. List the human checkpoints:

- [ ] _______________________
- [ ] _______________________

## Safety and privacy

- [ ] No sensitive data (passwords, bank details, private info) flows through a tool that should not have it
- [ ] Access to connected accounts is the minimum needed
- [ ] The automation respects each platform's rules (no spam, no scraping banned data)

## If it breaks

- How I will know it failed: _______________________
- The manual backup (how to do the job by hand): _______________________
- How to switch it off safely: _______________________

## Test record

| Test | Date | Result | Fixed? |
|---|---|---|---|
| Sample run 1 | | | |
| Sample run 2 | | | |

> **Important:** Every automation needs a known "off switch" and a manual backup. If you cannot say how
> to turn it off and do the job by hand, it is not ready to trust.
