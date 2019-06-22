pipeline {

    environment {
        registry = "fleeing/counternodeapp"
        registryCredential = 'dockerhub'
        dockerImage = ''
    }

    agent any

    stages {

        stage('Building Test Image') {
            steps{
                script {
                    docker.build registry + ":test"
                }
            }
        }

        stage('Test') {

            agent { 
                docker {
                        image "fleeing/counternodeapp:test"
                        args "-p 3001:3000 --name test"
                    }
                }

            steps {
                sh 'npm start &'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }

        stage('Fucking Elishas mom') {
            steps{
                sh './scripts/lol'
            }
        }

        stage('Building Prod Image') {
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