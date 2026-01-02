# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- **Capacitor** (for iOS & Android mobile apps)

## Mobile App Development (iOS & Android)

This project is configured with **Capacitor** to build native iOS and Android apps.

### Prerequisites

**For iOS:**
- macOS with Xcode installed
- CocoaPods: `sudo gem install cocoapods`

**For Android:**
- Android Studio installed
- Java Development Kit (JDK)
- Android SDK

### Development Workflow

1. **Build the web app:**
   ```sh
   npm run build
   ```

2. **Sync with native projects:**
   ```sh
   npm run cap:sync
   ```

3. **Open in native IDE:**
   ```sh
   # For iOS
   npm run mobile:ios
   
   # For Android
   npm run mobile:android
   ```

### Troubleshooting iOS

**Problem: "No supported iOS devices are available"**

This means you need to select a simulator in Xcode:

1. In Xcode, look at the top toolbar next to the Run button (▶️)
2. Click on the device selector dropdown (it might say "Any iOS Device" or show an error)
3. Select an available simulator (e.g., "iPhone 16e", "iPhone 17 Pro", etc.)
4. If no simulators appear, open Simulator app first:
   ```sh
   open -a Simulator
   ```
5. Then try running again from Xcode

**Alternative: Start simulator from command line:**
```sh
# List available simulators
xcrun simctl list devices available

# Boot a specific simulator (replace with your preferred device)
xcrun simctl boot "iPhone 16e"

# Then open Xcode and select the booted simulator
```

### Available Scripts

- `npm run cap:sync` - Sync web assets to native projects
- `npm run cap:open:ios` - Open iOS project in Xcode
- `npm run cap:open:android` - Open Android project in Android Studio
- `npm run cap:build` - Build web app and sync to native projects
- `npm run mobile:ios` - Build and open iOS project
- `npm run mobile:android` - Build and open Android project

### Building for Production

**iOS:**
1. Open project in Xcode: `npm run mobile:ios`
2. Select your target device or simulator
3. Click "Run" or use Product > Archive for App Store distribution

**Android:**
1. Open project in Android Studio: `npm run mobile:android`
2. Build > Generate Signed Bundle / APK
3. Follow the wizard to create a release build

### Important Notes

- Always run `npm run cap:sync` after making changes to the web code
- Native code changes should be made in the `ios/` or `android/` folders
- The web app is built to `dist/` and synced to native projects automatically

## How can I deploy this project?

**Web:**
Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

**Mobile:**
Follow the mobile development workflow above to build and distribute through App Store (iOS) or Google Play (Android).

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
