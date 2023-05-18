pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        // Clean workspace
        deleteDir()

        // Checkout source code from the repository
        git 'https://github.com/tobiiii/contact-manager-front.git'

        // Install Node.js and required dependencies
        sh 'nvm install 14'
        sh 'npm install'

        // Build the Angular app
        sh 'npm run build -- --prod'
      }
    }

    stage('Deploy') {
      steps {
        // Copy the built files to the deployment location (e.g., server or hosting provider)
        // You can replace the following line with the appropriate deployment commands
        sh 'rsync -rav ./dist/* user@server:/path/to/deployment/folder/'
      }
    }
  }
}
