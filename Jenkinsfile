pipeline {
    agent { 
        dockerfile true {
                args '-p 3000:3000'
            }
        }
    stages {
        stage('Deploy') {
            steps {
                sh 'npm start &'
            }
        }
    }
}