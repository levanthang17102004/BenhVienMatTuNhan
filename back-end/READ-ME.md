# Database

// ======================
// USER & IDENTITY
// ======================

Table User {
  _id ObjectId [pk]
  email string [unique]
  hashPassword string
  role string 
  isActive boolean [default: false, note: "Chỉ true sau khi verify OTP"]
  refreshTokenHash string 
  lastLogin date
  createdAt date 
  updatedAt date
}

// 🆕 Tách bảng chuyên khoa để chuẩn hóa dữ liệu
Table Specialty {
  _id ObjectId [pk]
  code string [unique] // VD: CARDIO, PEDIA
  name string          // VD: Tim mạch, Nhi khoa
  description string
  createdAt date
  updatedAt date
}

Table Doctor {
  _id ObjectId [pk]
  user_id ObjectId [unique]
  
  name string
  // 🔄 Thay đổi: Dùng ID thay vì string[]
  specialty_ids ObjectId[] [note: "Ref to Specialty"] 
  
  qualifications string
  experience number
  basePrice number
  phone string
  contactEmail string 
  address string
  rating number
  totalReviews number
  status string 
  createdAt date
  updatedAt date
}

Table Patient {
  _id ObjectId [pk]
  user_id ObjectId [unique]
  name string
  age number
  gender string
  phone string
  contactEmail string
  address string
  medicalHistory string[]
  insuranceProvider string
  insuranceNumber string
  status string 
  createdAt date
  updatedAt date
}

// ======================
// SCHEDULING & BOOKING
// ======================

Table Schedule {
  _id ObjectId [pk]
  doctor_id ObjectId
  workDate date
  startTime string 
  endTime string   
  slotDuration number 
  
  maxPatients number 
  currentLoad number // Số khách đã đặt
  
  // ⚡ Concurrency Control (Chống Overbooking)
  version number [default: 0, note: "Optimistic Locking"]
  
  status string 
  createdAt date
  updatedAt date
}

Table Service {
  _id ObjectId [pk]
  code string [unique]
  name string
  description string
  category string
  price number
  duration number
  isActive boolean
  createdAt date
  updatedAt date
}

Table Facility {
  _id ObjectId [pk]
  name string
  description string
  location string
  capacity number
  status string 
  imageUrl string
  createdAt date
  updatedAt  date
}

Table Appointment {
  _id ObjectId [pk]
  appointmentStart date 
  appointmentEnd date   
  status string 
  note string
  cancelReason string

  // --- Snapshot Price ---
  originalPrice number
  finalPrice number
  // ----------------------

  doctor_id ObjectId
  patient_id ObjectId
  service_id ObjectId
  facility_id ObjectId
  schedule_id ObjectId

  createdAt date
  updatedAt date
}

// ======================
// CLINICAL & FINANCE
// ======================

Table MedicalRecord {
  _id ObjectId [pk]
  appointment_id ObjectId [unique] 
  patient_id ObjectId
  diagnosis string
  treatment string
  
  // 🔄 Đã tách thuốc ra bảng riêng (PrescriptionItem)
  note string
  attachments string[] // Ảnh X-Quang, PDF
  
  createdAt date
  updatedAt date
}

// 🆕 Bảng chi tiết đơn thuốc (Phục vụ thống kê)
Table PrescriptionItem {
  _id ObjectId [pk]
  medicalRecord_id ObjectId
  
  medicineName string // Hoặc medicine_id nếu có bảng kho thuốc
  dosage string       // VD: "Sáng 1 viên, Chiều 1 viên"
  quantity number     // VD: 10
  unit string         // VD: Viên, Vỉ, Chai
  note string         // VD: "Uống sau ăn"
  
  createdAt date
  updatedAt date
}

Table Payment {
  _id ObjectId [pk]
  appointment_id ObjectId [unique] 
  amount number
  method string 
  status string 
  paidAt date
  transactionId string 
  gatewayResponse string 
  createdAt date
  updatedAt date
}

// ======================
// CONTENT & SUPPORT
// ======================

Table News {
  _id ObjectId [pk]
  title string
  slug string [unique]
  description string
  author_id ObjectId
  publicationDate date
  relatedImages string[]
  status string 
  createdAt date
  updatedAt date
}

Table Contact {
  _id ObjectId [pk]
  user_id ObjectId 
  name string
  email string
  phoneNumber string
  message string
  status string 
  createdAt date
  updatedAt date
}
// ======================
// AUTHENTICATION & OTP
// ======================

Table Otp {
  _id ObjectId [pk]

  email string [note: "Email nhận OTP"]
  user_id ObjectId [note: "Nullable - chỉ có khi user đã tồn tại"]

  otpHash string [note: "Hash của OTP, không lưu plain text"]
  type string [note: "REGISTER | FORGOT_PASSWORD | VERIFY_EMAIL"]

  expiresAt date [note: "Thời điểm hết hạn (VD: sau 5 phút)"]
  isUsed boolean [default: false, note: "Chống dùng lại OTP"]
  attemptCount number [default: 0, note: "Số lần nhập sai OTP"]

  createdAt date [default: `now()`]
}
// ======================
// RELATIONSHIPS
// ======================

Doctor.user_id - User._id 
Doctor.specialty_ids > Specialty._id // 🆕 Doctor has many Specialties

Patient.user_id - User._id 

Schedule.doctor_id > Doctor._id

Appointment.doctor_id > Doctor._id
Appointment.patient_id > Patient._id
Appointment.service_id > Service._id
Appointment.facility_id > Facility._id
Appointment.schedule_id > Schedule._id

MedicalRecord.appointment_id - Appointment._id 
MedicalRecord.patient_id > Patient._id

// 🆕 Quan hệ 1-N: Một hồ sơ bệnh án có nhiều thuốc
PrescriptionItem.medicalRecord_id > MedicalRecord._id 

Payment.appointment_id - Appointment._id 

News.author_id > User._id
Contact.user_id > User._id
Otp.user_id > User._id
