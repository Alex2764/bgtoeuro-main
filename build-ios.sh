#!/bin/bash

# Build iOS IPA script
echo "🔨 Building web app..."
npm run build

echo "🔄 Syncing with Capacitor..."
npx cap sync ios

echo "📦 Creating Archive..."
cd ios/App

# Create archive
xcodebuild -project App.xcodeproj \
  -scheme App \
  -configuration Release \
  -archivePath ./build/App.xcarchive \
  archive \
  -allowProvisioningUpdates \
  2>&1 | tee build.log

if [ $? -eq 0 ]; then
  echo "✅ Archive created successfully!"
  echo "📤 Exporting IPA..."
  
  # Export IPA
  xcodebuild -exportArchive \
    -archivePath ./build/App.xcarchive \
    -exportPath ./build/export \
    -exportOptionsPlist exportOptions.plist \
    -allowProvisioningUpdates \
    2>&1 | tee export.log
  
  if [ $? -eq 0 ]; then
    echo "✅ IPA file created successfully!"
    echo "📱 IPA location: ios/App/build/export/App.ipa"
  else
    echo "❌ Failed to export IPA. Check export.log for details."
  fi
else
  echo "❌ Failed to create archive. Check build.log for details."
  echo ""
  echo "💡 Tip: Make sure you have:"
  echo "   1. Added your Apple ID in Xcode → Settings → Accounts"
  echo "   2. Selected a development team in Signing & Capabilities"
fi



