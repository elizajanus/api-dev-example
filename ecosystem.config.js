module.exports = {
  apps: [{
    name: 'api-aws-test',
    script: './bin/www'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-34-206-217-241.compute-1.amazonaws.com',
      key: '~/.ssh/server.pem',
      ref: 'origin/master',
      repo: 'git@github.com:SocialAutoTransport/api-aws-test.git',
      path: '/home/ubuntu/api-aws-test',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}