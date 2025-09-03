const fs = require('fs');
const path = require('path');

const fixes = [
  // Fix type imports
  {
    file: 'src/contexts/AuthContext.tsx',
    from: "import { AuthContextType, User } from '../types';",
    to: "import type { AuthContextType, User } from '../types';"
  },
  {
    file: 'src/contexts/ThemeContext.tsx',
    from: "import { ThemeContextType } from '../types';",
    to: "import type { ThemeContextType } from '../types';"
  },
  {
    file: 'src/data/mockData.ts',
    from: "import { User, ProfileView, Skill, Activity, AnalyticsData } from '../types';",
    to: "import type { User, ProfileView, Skill, Activity, AnalyticsData } from '../types';"
  },
  {
    file: 'src/hooks/useLocalStorage.ts',
    from: "import { useState, useEffect } from 'react';",
    to: "import { useState } from 'react';"
  },
  {
    file: 'src/pages/AnalyticsPage.tsx',
    from: "                  {pieData.map((entry, index) => (",
    to: "                  {pieData.map((_, index) => ("
  },
  {
    file: 'src/pages/SettingsPage.tsx',
    from: "  const { isDark, setTheme } = useTheme();",
    to: "  const { setTheme } = useTheme();"
  }
];

fixes.forEach(fix => {
  const filePath = path.join(__dirname, fix.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(fix.from)) {
      content = content.replace(fix.from, fix.to);
      fs.writeFileSync(filePath, content);
      console.log(`Fixed: ${fix.file}`);
    } else {
      console.log(`Pattern not found in: ${fix.file}`);
    }
  } else {
    console.log(`File not found: ${fix.file}`);
  }
});

console.log('All fixes applied!');