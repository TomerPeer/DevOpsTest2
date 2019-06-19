pipeline {
    agent { 
        dockerfile true
        }
    stages {
        stage('Deploy') {
            steps {
                sh 'npm start'
            }
        }
    }
}