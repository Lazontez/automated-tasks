# automated-tasks

## testEvidenceMover.js

Watches the Downloads folder and automatically moves any file matching the file pattern into an organized Test Evidence folder.

**Setup:**

- Install dependencies: `npm install`
- Add a `.env` file with your destination path:
  ```
  testEvidenceDestinationFolder=C:\Users\yourname\Documents\Test Evidence
  ```
- Run it persistently with PM2: `pm2 start testEvidenceMover.js --name test-evidence` then `pm2 save`.
