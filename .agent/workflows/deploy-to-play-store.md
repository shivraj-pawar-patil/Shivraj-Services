---
description: Deploy Expo app to Google Play Store
---

# Deploying to Google Play Store

## 1. Prerequisites
- [ ] **Google Play Developer Account**: You must have a paid account ($25 one-time fee). [Sign up here](https://play.google.com/console).
- [ ] **Expo Account**: Create a free account at [expo.dev](https://expo.dev/signup).

## 2. Configuration
- [ ] **Update URL**: In `mobile/App.js`, update `WEBSITE_URL` to your real, public website URL (e.g., `https://your-site.com`). **Do not use localhost or 192.168.x.x**.
- [ ] **Check `app.json`**: Ensure `android.package` is unique (e.g., `com.shivrajservices.app`) and `versionCode` is incremented for each new release.

## 3. Build with EAS
Run these commands in your terminal inside the `mobile` folder:

1. **Install EAS CLI** (if not already installed):
   ```powershell
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```powershell
   eas login
   ```

3. **Configure Building**:
   ```powershell
   eas build:configure
   ```
   - Select `Android` when asked.

4. **Run the Build**:
   ```powershell
   eas build -p android --profile production
   ```
   - This will upload your code to Expo's servers and build the `.aab` file (Android App Bundle).
   - Wait for the build to finish. It will give you a download link.

## 4. Upload to Play Console
1. Download the `.aab` file from the link provided by EAS.
2. Go to [Google Play Console](https://play.google.com/console).
3. Click "Create App" and fill in the details.
4. Go to **Production** (or **Testing** > **Internal testing** first).
5. Create a new release and upload the `.aab` file.
6. Complete all the required details (store listing, content rating, etc.).
7. Submit for review!
