module.exports = {
  apps: [
    {
      name: 'pocket_book',
      script: 'pocket_book_server.js'
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: '47.100.166.112',
      ref: 'origin/main',
      repo: 'git@github.com:victor-one/pocket_book.git',
      path: '/workspace/pocket_book',
      'post-deploy': 'git reset --hard && git checkout main && git pull && npm i --production=false && npm run build:release && pm2 startOrReload ecosystem.config.js', // -production=false 下载全量包
      env: {
        NODE_ENV: 'production'
      }
    }
  }
}