require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REPO,
  DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [
    {
      name: 'mesto-backend',
      script: './dist/app.js',
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-setup': 'rm -rf web-plus-pm2-deploy',
      'pre-deploy-local': `scp ./.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend`,
      'pre-deploy': 'cd backend && rm -rf node_modules dist',
      'post-deploy': "cd backend && echo -e 'NODE_ENV=production' >> .env && echo -e 'JWT_SECRET=JWT_SECRET' >> .env && npm install && npm run build && pm2 start",
    },
  },
};
