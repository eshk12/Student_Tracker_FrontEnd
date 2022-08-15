pipeline {
    agent any

    options {
        timestamps()
        timeout(time:15, unit:'MINUTES')
        
    }

    stages {

        stage('checkout') {
            steps {
                deleteDir()
                echo 'Pulling... ' + env.GIT_BRANCH
                checkout scm
                echo "commit hash : ${env.GIT_COMMIT}, tag_name: ${env.TAG_NAME}, author: ${env.GIT_AUTHOR_NAME}"
                }
        }
        
        stage('build') {
            steps {
                echo "building the application from ${env.GIT_BRANCH}"
                sh "docker build -t front_end ."
                }
        }

        stage('test') {
            steps {
                echo "Test"
                echo "..."
                sh "docker run --name front -d -p 80:80 front_end"
                sh "docker network connect jenkins front"
                sh "curl -LI front"
                }
        }
        stage('Publish') {
            when {
		        expression {
                    env.GIT_BRANCH ==~ /(master)/
			        }
	            }
            steps {
                echo 'Publish image to ECR'
                sh '''aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 274129698771.dkr.ecr.eu-central-1.amazonaws.com
                    docker tag front_end:latest 274129698771.dkr.ecr.eu-central-1.amazonaws.com/front:latest
                    docker push 274129698771.dkr.ecr.eu-central-1.amazonaws.com/front:latest'''
            }
        }
        

    }
    
    post {
    always {
        echo "Job done"
        sh "docker rm -f front"
        }
    }
}
