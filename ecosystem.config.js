module.exports = {
  apps: [{
    name: 'api-dev-example',
    script: './bin/www'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-xx-xxx-xxx-xxx.compute-1.amazonaws.com',
      key: '~/.ssh/xxxx.pem',
      ref: 'origin/master',
      repo: 'xxxxxxxxxxxxx',
      path: '/home/ubuntu/api-aws-test',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}