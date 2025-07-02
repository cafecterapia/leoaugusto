#!/bin/bash

echo "🚀 GitHub Pages Deployment Monitor"
echo "=================================="
echo ""
echo "📋 Your deployment details:"
echo "Repository: https://github.com/cafecterapia/leoaugusto"
echo "Actions: https://github.com/cafecterapia/leoaugusto/actions"
echo "Live Site: https://cafecterapia.github.io/leoaugusto"
echo ""
echo "📊 Current git status:"
git status --porcelain
echo ""
echo "🔄 Latest commits:"
git log --oneline -5
echo ""
echo "✅ To check deployment status:"
echo "1. Visit: https://github.com/cafecterapia/leoaugusto/actions"
echo "2. Look for the latest 'Deploy to GitHub Pages' workflow"
echo "3. Wait for green checkmark (usually takes 2-3 minutes)"
echo ""
echo "🌐 Once deployed, your site will be live at:"
echo "https://cafecterapia.github.io/leoaugusto"
