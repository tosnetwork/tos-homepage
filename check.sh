#!/bin/bash

# TOS Network Homepage - Verification Script

echo "════════════════════════════════════════════════════════════"
echo "   TOS Network Homepage - File Verification"
echo "════════════════════════════════════════════════════════════"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1 (MISSING)"
        return 1
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        return 0
    else
        echo -e "${RED}✗${NC} $1/ (MISSING)"
        return 1
    fi
}

MISSING=0

# Check HTML files
echo "HTML Files:"
check_file "index.html" || ((MISSING++))
check_file "index.html.backup" || ((MISSING++))
echo ""

# Check CSS directory
echo "CSS Directory:"
check_dir "css" || ((MISSING++))
echo ""

echo "CSS Files:"
check_file "css/variables.css" || ((MISSING++))
check_file "css/base.css" || ((MISSING++))
check_file "css/components.css" || ((MISSING++))
check_file "css/animations.css" || ((MISSING++))
check_file "css/responsive.css" || ((MISSING++))
echo ""

# Check JS directory
echo "JavaScript Directory:"
check_dir "js" || ((MISSING++))
echo ""

echo "JavaScript Files:"
check_file "js/main.js" || ((MISSING++))
check_file "js/navigation.js" || ((MISSING++))
check_file "js/animations.js" || ((MISSING++))
check_file "js/faq.js" || ((MISSING++))
echo ""

# Check images
echo "Image Directories:"
check_dir "img" || ((MISSING++))
check_dir "img/features" || ((MISSING++))
echo ""

echo "Feature Icons:"
ICONS=("did.svg" "agiw.svg" "credits.svg" "ghostdag.svg" "performance.svg"
       "trilemma.svg" "pow.svg" "instant.svg" "pruning.svg" "spv.svg"
       "fairlaunch.svg" "deflationary.svg" "smartcontract.svg" "community.svg" "aimining.svg")

for icon in "${ICONS[@]}"; do
    check_file "img/features/$icon" || ((MISSING++))
done
echo ""

# Check documentation
echo "Documentation:"
check_file "REDESIGN_NOTES.md" || ((MISSING++))
check_file "QUICKSTART.md" || ((MISSING++))
echo ""

# Summary
echo "════════════════════════════════════════════════════════════"
if [ $MISSING -eq 0 ]; then
    echo -e "${GREEN}✓ All files present! (0 missing)${NC}"
    echo ""
    echo "Ready to test!"
    echo "Run: python3 -m http.server 8080"
    echo "Then open: http://localhost:8080"
else
    echo -e "${RED}✗ $MISSING file(s) missing${NC}"
    echo ""
    echo "Please check the missing files above."
fi
echo "════════════════════════════════════════════════════════════"
