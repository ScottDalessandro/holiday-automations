---
title: "Holiday Countdown Bot"
description: 'Posts <span class="text-slate-200 font-medium">"X days until Christmas!"</span> to email daily. A perfect first automation to learn scheduling, branching logic, and testing strategies.'
icon: "⏰"
tutorialNumber: 1
difficulty: "beginner"
order: 1
skills:
  - "Cron Scheduling"
  - "JS Expressions"
  - "Branching Logic"
  - "Test Patterns"
  - "Date Math"
shareWith: "Spouse, family, friends"
businessSkill: "Cron scheduling, date logic"

workflowDescription: "This workflow triggers every morning, checks if today is between Dec 1st and Dec 25th, calculates the days remaining, and sends an email. It uses a configuration node to allow for easy testing without waiting for the actual date."

workflowNodes:
  - icon: "lucide:clock"
    label: "Schedule"
    color: "emerald"
  - icon: "lucide:settings-2"
    label: "Config"
    color: "slate"
  - icon: "lucide:split"
    label: "IF"
    color: "slate"
  - icon: "lucide:mail"
    label: "Gmail"
    color: "rose"

steps:
  - title: "Create Workflow & Manual Trigger"
    content: "Start with a Manual Trigger to build and test logic before automating. This is best practice for all new workflows."
  - title: "Config Node (Test Mode)"
    content: 'Add an "Edit Fields" node. Create boolean <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">is_test</code>, and number fields <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">test_month</code> (12) and <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">test_day</code> (e.g. 20).'
  - title: "Resolve Dates Node"
    content: 'Add another "Edit Fields" node. Use expressions to set <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">current_day</code> and <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">current_month</code>. This is where we swap between real time and test time.'
  - title: "IF Node (Date Range Check)"
    content: 'Filter logic: <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">month = 12</code> AND <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">day <= 25</code>. Only continue if true.'
  - title: "Gmail Node"
    content: 'Authenticate your account. Subject: "Daily Countdown". Body: Calculate <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">25 - day</code> in an expression.'
  - title: "Add Schedule Trigger"
    content: 'Replace manual trigger with Schedule Trigger. Use Cron Mode: <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">0 9 1-25 12 *</code> to run at 9am only on Dec 1-25.'
  - title: "Test & Go Live"
    content: 'Set <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">is_test</code> to false. Activate the workflow toggle in the top right.'

codeBlocks:
  - label: "Resolve Dates: current_day"
    code: "{{ $json.is_test ? $json.test_day : $now.day }}"
  - label: "Resolve Dates: current_month"
    code: "{{ $json.is_test ? $json.test_month : $now.month }}"
  - label: "Gmail Message Body"
    code: "{{ 25 - $json.current_day }} days until Christmas!"
  - label: "Cron Expression"
    code: "0 9 1-25 12 *"

concepts:
  - icon: "🔄"
    title: "Cron Expressions"
    description: "Format: Minute Hour Day Month Weekday. Precise scheduling control."
  - icon: "❓"
    title: "Ternary Operator"
    description: 'Syntax: <code class="bg-slate-800 px-1 rounded">cond ? true : false</code>. Essential for inline IF logic in n8n.'
  - icon: "🔢"
    title: "Strings vs Numbers"
    description: 'Comparisons like <code class="bg-slate-800 px-1 rounded">"12" > 10</code> can fail. Always ensure types match.'
  - icon: "🧪"
    title: "Test Mode Pattern"
    description: "Building a toggle allows you to simulate future dates without waiting."
  - icon: "⚡"
    title: "Execution Limits"
    description: "Scheduling triggers strictly for needed times saves your monthly execution quota."

resources:
  - icon: "⏰"
    label: "Crontab Guru"
    url: "https://crontab.guru/"
  - icon: "📖"
    label: "n8n Expressions Ref"
    url: "https://docs.n8n.io/code/builtin/overview/"
  - icon: "✉️"
    label: "Gmail Node Docs"
    url: "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/"

bonusIdeas:
  - title: "Send a holiday GIF"
    description: "Connect to Giphy API to fetch random tags."
  - title: "Movie Suggester"
    description: "Pull from a 'Christmas Movies' google sheet."
  - title: "Deal Alerts"
    description: "Filter RSS feeds for 'discount' keywords."

nextLesson:
  title: "Holiday Joke & Fact Convo Starter"
  slug: "joke-bot"
---
