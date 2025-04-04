# BookKs4All

## Overview
BookKs4All is a tech-enabled platform that facilitates book donations by connecting donors, volunteers, and underprivileged schools. The platform ensures efficient coordination, tracking, and transparency in book donations through a mobile or web application.
  ![image](https://github.com/user-attachments/assets/8662e2c7-7b87-48f0-bca5-09f6fee2d0a5)

## Features
- *Listing & requesting books*
- *Matching donors with nearby schools*
- *Tracking book deliveries*
- *Ensuring transparency with proof of delivery*

  ![image](https://github.com/user-attachments/assets/e607b962-8c6c-4dba-8619-4d1ad0d842f2)




## Roles & Responsibilities
### 1. Donor (Book Donor)
Individuals, institutions, or bookstores that wish to donate books.

#### Features:
- Register and create a profile.
- Upload book details (title, condition, quantity, location, grade level, language, etc.).
- Upload photos of books for verification (OCR for auto-categorization).
- View requests from nearby schools and match their donations.
- Schedule book pick-up with volunteers.
- Receive donation confirmation and certificates of appreciation.
- Feedback from Users
 ![image](https://github.com/user-attachments/assets/b2979114-9934-4fff-b88e-73aec05786de)


### 2. School (Book Receiver)
Schools in need of book donations.

#### Features:
- Register and create a profile.
- Submit book requests based on specific needs (title, category, grade level, language, etc.).
- View available book donations and request matching books.
- Track delivery status of books.
- Confirm receipt of books through OTP-based verification or photo proof.

### 3. Volunteer (Book Delivery Personnel)
NGOs or individuals who facilitate book delivery from donors to schools.

#### Features:
- Register and create a profile.
- View pending book donation requests.
- Accept book pick-up tasks from donors and deliver them to schools.
- Track and update delivery status in real-time.
- Submit proof of delivery (photo or OTP-based confirmation).
- Receive notifications for new delivery tasks.

## How It Works
1. *Donors* list books available for donation.
2. *Schools* request books based on their needs.
3. *Volunteers* pick up books from donors and deliver them to schools.
4. *Tracking & confirmation* ensure transparency in the process.

 ![image](https://github.com/user-attachments/assets/d126e533-9f08-4031-ab52-c65daff25e5d)


## Tech Stack
- *Frontend:* React.js / Vue.js (for web), Flutter / React Native (for mobile)
- *Backend:* Node.js with Express.js
- *Database:* MongoDB
- *Authentication:* JWT-based authentication
- *Maps & Geolocation:* Google Maps API (for donor-school matching & tracking deliveries)
- *OCR:* Tesseract.js / Google Cloud Vision API (for book image processing)

## API Endpoints

### User APIs
- POST /api/user/signin – User login
- POST /api/user/signup – Register a new user
- PUT /api/user/update_profile – Update user profile (Requires authentication)
- POST /api/user/orders/accept – Accept an order (Requires authentication)
- GET /api/volunteer/my-orders – Get volunteer's assigned orders (Requires authentication)

### Donor APIs
- POST /api/donor/add_book - Add a book for donation

### Volunteer APIs
- POST /api/volunteer/generate_otp – Generate OTP for order verification
- POST /api/volunteer/verify_otp – Verify OTP before completing an order
- POST /api/volunteer/change_order_status – Update the status of an order

### BOOKS APIs
- POST /api/books/add_book - Add a book
- GET /api/books/get_book - Get book by book_ID

### School APIs
- POST /api/school/get-books – Retrieve available books
- POST /api/school/search_in_store – Search for books in the store
- GET /api/school/get-all-books – Get all books
- POST /api/school/inventory_request – Request books (requires authentication)
- POST /api/school/get_all_requests – Get all book requests (requires authentication)

### Store APIs
- POST /api/store/create-store – Create a new store

- POST /api/store/process_request – Process a book request

## Contribution
Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License
MIT License