# Art Rater (MaxDiff Version) for "Into Vincent's Mind" Project
View it at https://artrater.web.app
## Run the application locally
Ensure that you have NodeJS installed https://nodejs.org/en/

Change into the project directory and run `yarn` to install dependencies.
```shell script
yarn
```

Change into `functions` directory and run `yarn` to install dependencies for Firebase Functions
```shell script
cd functions && yarn
```
Create a directory called `ignored` within the `src` directory.  
```shell script
cd .. && mkdir ignored && cd ignored && touch firebaseConfig.ts
```

Inside, create a ts file called `firebaseConfig.ts`. Paste your firebase configuration object there.
```typescript
// Download firebaseConfig from your Firebase console
export const firebaseConfig = {...};
```
Start the React project in the development environment
```shell script
cd .. && yarn start
```

The web application will be running on http://localhost:3000
