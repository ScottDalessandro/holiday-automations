---
title: "Holiday Joke & Fact Convo Starter"
description: 'Sends a daily Christmas joke and interesting fact from a Google Sheet. Perfect for cheesy dad jokes your kids will love and <span class="text-slate-200 font-medium">conversation starters</span> at holiday gatherings.'
icon: "😃"
tutorialNumber: 2
difficulty: "beginner"
order: 2
skills:
  - "Sheets Integration"
  - "Data Filtering"
  - "JS Expressions"
  - "HTML Emails"
  - "Test Patterns"
shareWith: "Family, social media"
businessSkill: "Database reads, filtering"

workflowDescription: "This workflow builds on the countdown bot, adding Google Sheets integration to pull a joke and fact for each day. It filters the sheet data to match the current countdown day, then sends a beautifully styled HTML email."

workflowNodes:
  - icon: "lucide:clock"
    label: "Schedule"
    color: "emerald"
  - icon: "lucide:settings-2"
    label: "Config"
    color: "slate"
  - icon: "lucide:calendar"
    label: "Xmas Fields"
    color: "slate"
  - icon: "lucide:table"
    label: "Google Sheets"
    color: "emerald"
  - icon: "lucide:filter"
    label: "Filter"
    color: "amber"
  - icon: "lucide:mail"
    label: "Gmail"
    color: "rose"

steps:
  - title: "Duplicate the Countdown Bot"
    content: 'Start by duplicating your Holiday Countdown workflow. Rename it to something like "Joke Facts Bot". Make sure <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">is_test</code> is set to <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">true</code> in Config for testing.'
  - title: "Add Xmas Fields Node"
    content: 'After Resolve Dates, add an "Edit Fields" node called "Xmas Fields". Create <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">xmasDay</code> (number: 25) and <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">daysUntilXmas</code> using the expression <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">{{ $json.xmasDay - $json.currentDay }}</code>.'
  - title: "Connect Google Sheets"
    content: 'Add a Google Sheets node. Select "Get Rows" operation. Connect your Google account, paste the spreadsheet URL, and select the sheet. This pulls all rows from your joke/fact sheet.'
  - title: "Add Filter Node"
    content: 'Add a Filter node to match the current day. Compare <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">days_until_xmas</code> (from sheet) equals <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">daysUntilXmas</code> (from Xmas Fields). Use number comparison, not string!'
  - title: "Structure Your Spreadsheet"
    content: 'Key insight: Put joke AND fact on the same row. Columns: <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">days_until_xmas</code>, <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">joke</code>, <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">fact</code>, <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">fact_source</code>. This ensures Filter returns ONE item, so Gmail sends ONE email.'
  - title: "Style Your Email"
    content: 'Update the Gmail node. Set type to HTML. Use an LLM to generate festive HTML/CSS, then paste expressions for <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">{{ $json.joke }}</code>, <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">{{ $json.fact }}</code>, and <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">{{ $json.fact_source }}</code>.'
  - title: "Dynamic Subject Line"
    content: 'Make the subject dynamic so each email is unique. Use an expression like <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">{{ $("Xmas Fields").item.json.daysUntilXmas }} days to go!</code> to show the countdown in the subject.'
  - title: "Test & Go Live"
    content: 'Test with different <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">test_day</code> values (try 15, 24, 25). Verify you get one email with both joke and fact. Set <code class="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">is_test</code> to false and activate!'

codeBlocks:
  - label: "Days Until Christmas"
    code: "{{ $json.xmasDay - $json.currentDay }}"
  - label: "Filter: Number Comparison"
    code: "{{ $json.days_until_xmas }} = {{ $('Xmas Fields').item.json.daysUntilXmas }}"
  - label: "Email Subject (Dynamic)"
    code: "{{ $('Xmas Fields').item.json.daysUntilXmas }} days to go!"
  - label: "Joke in HTML Email"
    code: "{{ $json.joke }}"

concepts:
  - icon: "📬"
    title: "Item Processing"
    description: "Nodes process EACH item passed to them. 2 items = 2 emails. Structure data to return 1 item when you want 1 action."
  - icon: "🐫"
    title: "Naming Conventions"
    description: 'Use camelCase for n8n variables, snake_case for external data (sheets). Helps identify data source when debugging.'
  - icon: "🔍"
    title: "Filter Node"
    description: "Compares values to keep only matching items. Use number comparison (not string) when comparing numeric values."
  - icon: "📊"
    title: "Spreadsheet Design"
    description: "Structure matters! One row per day with all data keeps your workflow simple and ensures single-item output."
  - icon: "🎨"
    title: "HTML Emails"
    description: "Set email type to HTML. Use an LLM to generate styled templates, then insert n8n expressions for dynamic content."

resources:
  - icon: "📊"
    label: "Google Sheets Node"
    url: "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/"
  - icon: "🔗"
    label: "Joke & Fact Sheet Template"
    url: "https://docs.google.com/spreadsheets/d/1example"
  - icon: "📖"
    label: "n8n Filter Node"
    url: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.filter/"

bonusIdeas:
  - title: "Use Aggregate Node"
    description: "Try the original 2-row-per-day format with Aggregate to combine items."
  - title: "Christmas Day Special"
    description: "Add IF logic for day 0 to send a special 'Merry Christmas!' message."
  - title: "Random Joke Mode"
    description: "Add a Code node to pick a random joke instead of the daily one."

prevLesson:
  title: "Holiday Countdown Bot"
  slug: "countdown-bot"
videoId: "WMw-DpGtWc0"
---
