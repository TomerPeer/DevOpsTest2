pipeline {

    environment {
        registry = "fleeing/counternodeapp"
        registryCredential = 'dockerhub'
        dockerImage = ''
    }

    agent { label 'nodejnlp2' }

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
                        label 'nodejnlp2'
                        image "fleeing/counternodeapp:test"
                        args "-p 3001:3000 --name test"
                    }
                }

            steps {
                sh 'npm start &'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }

        stage('Trolling Elisha'){
            parallel {
                stage('Fucking Elishas mom') {
                    steps{
                        sh './scripts/lol.sh'
                    }
                }
                stage('Fucking Elishas mom Again') {
                    steps{
                        sh './scripts/lol.sh'
                    }
                }
                stage('Fucking Elishas mom For the third time') {
                    steps{
                        sh './scripts/lol.sh'
                    }
                }
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

        stage('Ansible Test'){
            steps {
                ansiblePlaybook('yml/ping.yml') {
                    inventoryPath('inventories/hosts.ini')
                    credentialsId('credsid')
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