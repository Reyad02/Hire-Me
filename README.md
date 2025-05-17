# Hire-Me

## Technologies
- **Backend Framework**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Configuration
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Reyad02/Hire-Me.git
   cd Hire-Me
   ```

2. **Install Dependencies**
  ```bash
  npm install
   ```

3. **Set Up Environment Variables**
   ```env
   PORT=3000
   MONGOOSE_URL=your_mongodb_connection_string
   SALT_ROUNDS=10
   SECRET=your_jwt_secret
   TOKEN_EXPIRED_TIME=10d
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API=your_api_key
   CLOUDINARY_SECRET=your_secret_key

  
4. **Start the Application**
   ```bash
   npm run dev  
   ```


## Roles and Permissions
- **Admin**: Manage all users, jobs and applications
- **Employee**: Perform CRUD operation on his/her own jobs, view applicants, accept/reject applications
- **Job Seeker**: View jobs, apply with payment and CV, view their application history

## API Endpoints

### User
- **register**: users/register
- **update**: users/:userEmail
- **delete**: users/:userEmail
- **getUser**: users/:userEmail
- **getUsers**: users/

### Auth
- **login**: auth/login

### Job
- **create**: jobs/creation
- **update**: jobs/:jobId
- **delete**: jobs/:jobId
- **getJob**: jobs/:jobId
- **getJobs**: jobs/

### Job Application
- **job-acceptance**: jobApplication/:applicationId
- **pay-for-application**: jobApplication/pay/:jobId
- **send-resume**: jobApplication/apply/:trxId
- **get-my-applied-job**: jobApplication/me
- **get-my-created-job**: jobApplication/my-created-job
- **get-all-applied-job**: jobApplication/



## Payment Flow
1. **Initiate Payment**
Job Seeker starts the job application process by accessing: GET ```/jobApplication/pay/:jobId```
- This triggers a mock payment (or real gateway).
- After successful payment, a unique trxId (transaction ID) is generated and returned to the client.

2. **Upload Resume**
Job Seeker then uploads their resume using:
PUT ```/jobApplication/apply/:trxId```
- The system uses the provided trxId to verify if the payment was completed.
- **If the payment is valid:**
     - The resume (PDF/DOCX) is accepted.
     - The application is saved with a reference to the job, seeker and trxId.
     - An invoice is also stored.
- **If the payment is not found or invalid:**
     - The resume is rejected.
     - Throw an Error

## API Documentation
https://documenter.getpostman.com/view/38349072/2sB2qWHjfd
