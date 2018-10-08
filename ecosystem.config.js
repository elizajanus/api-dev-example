module.exports = {
  apps: [{
    name: 'example',
    script: './bin/www'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-example.compute-1.amazonaws.com',
      key: '~/.ssh/server.pem',
      ref: 'origin/master',
      repo: 'git@github.com:example',
      path: '/home/ubuntu/example',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}