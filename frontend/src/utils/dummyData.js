export const dummyComplaints = [
  {
    id: 'CMP001',
    title: 'Laptop Theft from Office',
    category: 'Theft',
    location: 'Tech Park, Sector 18, New Delhi',
    description: 'My laptop was stolen from my office desk during lunch break. The laptop is a Dell XPS 15 with serial number DL123456789. It contains important work documents and personal data.',
    status: 'Under Investigation',
    date: '2024-11-25',
    evidence: ['laptop_photo.jpg', 'office_cctv.mp4'],
    userId: 'USER001',
    timeline: [
      { date: '2024-11-25 10:30 AM', status: 'Pending', remarks: 'Complaint filed successfully' },
      { date: '2024-11-25 02:15 PM', status: 'Under Investigation', remarks: 'Case assigned to Inspector Rajesh Kumar. Evidence under review.' },
    ],
    policeRemarks: 'CCTV footage has been collected. Forensic team is analyzing the evidence. Suspect identified from footage.'
  },
  {
    id: 'CMP002',
    title: 'Online Payment Fraud',
    category: 'Cybercrime',
    location: 'Mumbai, Maharashtra',
    description: 'Unauthorized transactions of Rs. 45,000 from my bank account through a phishing link. Received fake bank emails asking for OTP verification.',
    status: 'Resolved',
    date: '2024-11-20',
    evidence: ['transaction_screenshot.jpg', 'phishing_email.pdf'],
    userId: 'USER001',
    timeline: [
      { date: '2024-11-20 09:00 AM', status: 'Pending', remarks: 'Complaint registered' },
      { date: '2024-11-20 11:30 AM', status: 'Under Investigation', remarks: 'Cybercrime team investigating the IP address and transaction trail' },
      { date: '2024-11-23 04:00 PM', status: 'Resolved', remarks: 'Fraudster arrested. Amount refunded to victim\'s account.' },
    ],
    policeRemarks: 'Cybercrime team traced the IP address to a fraud ring operating from another state. All accused have been apprehended. Bank has refunded the stolen amount.'
  },
  {
    id: 'CMP003',
    title: 'House Burglary',
    category: 'Burglary',
    location: 'Green Avenue, Sector 22, Bangalore',
    description: 'My house was broken into while I was away on vacation. Thieves stole jewelry worth Rs. 2 lakhs, a TV, and other electronics. The main door lock was broken.',
    status: 'Pending',
    date: '2024-11-27',
    evidence: ['broken_lock.jpg', 'ransacked_room.jpg'],
    userId: 'USER001',
    timeline: [
      { date: '2024-11-27 08:00 AM', status: 'Pending', remarks: 'Complaint filed. Awaiting police inspection.' },
    ],
    policeRemarks: 'Initial report filed. Crime scene investigation scheduled for tomorrow morning.'
  }
];

export const dummyUsers = [
  {
    id: 'USER001',
    name: 'Saukatali',
    email: 'saukatmasi@gmail.com',
    phone: '+91 98765 43210',
    address: '123 MG Road, New Delhi, 110001',
    password: 'password123'
  }
];
