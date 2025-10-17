pipeline {
    agent any

    environment {
       
        PATH = "/usr/local/bin:/opt/homebrew/bin:${env.PATH}"
        TOMCAT_HOME = "/Users/vadlanibhavya/Downloads/apache-tomcat-10.1.43"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                dir('MovieFrontend') {
                    sh '''
                    echo "PATH=$PATH"
                    which node || echo "node not found"
                    node -v || echo "node version unknown"
                    which npm || echo "npm not found"
                    npm -v || echo "npm version unknown"

                    npm install
                    npm run build
                    '''
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                FRONTEND_DIR="$TOMCAT_HOME/webapps/movie"
                rm -rf "$FRONTEND_DIR"
                mkdir -p "$FRONTEND_DIR"
                cp -R MovieFrontend/dist/* "$FRONTEND_DIR"
                '''
            }
        }

        stage('Build Backend WAR') {
            steps {
                dir('MovieBackend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Deploy Backend WAR to Tomcat') {
            steps {
                sh '''
                WAR_FILE="MovieBackend/target/MovieBackend-0.0.1-SNAPSHOT.war"
                cp "$WAR_FILE" "$TOMCAT_HOME/webapps/MovieBackend.war"
                '''
            }
        }

        stage('Restart Tomcat') {
            steps {
                sh '''
                $TOMCAT_HOME/bin/shutdown.sh || true
                sleep 3
                $TOMCAT_HOME/bin/startup.sh
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
};