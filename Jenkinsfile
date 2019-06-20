pipeline {

    environment {
        registry = "fleeing/counternodeapp"
        registryCredential = 'dockerhub'
        dockerImage = ''
    }

    agent any

    stages {        
        stage('Test') {

            agent { 
                dockerfile {
                        args "-p 3001:3000 --name test"
                        additionalBuildArgs "-t fleeing/counternodeapptest"
                    }
                }

            steps {
                sh 'npm start &'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }

        stage('Building Image') {
            steps{
                script {
                    dockerImage = docker.build registry + ":latest"
                }
            }
        }

        stage('Deploy Image to Docker Hub') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }

         stage('Deploy') {
            steps {
                sh './scripts/deploy.sh'
            }
        }

        stage('cleanup') {
            steps{
                sh './scripts/cleanup.sh'
                sh 'echo done yay motherfucker'
            }
        }
    }
}