## initiating repo

npx husky-init && npm install


## Assessment

- Two different types of form was used. One with react hook forms and the other with ANTD forms

- React query was used for handling api requests

- precommit hook is being used to prevent broken code from being commited

## Approch

- I went with the providers apporach to reduce the amount of dependency managed in the main.tsx file 

- for the routes 
this approch is used so when there is a change in route you will only change in a file. 

- The last commit made had the largest bundle size below 500kb. Lazy loading each route helped reduce the bundle size to this since ANTD was used which is a very large library. The bundle size can still go lower if each imported component from ANTD is also lazy loaded. 