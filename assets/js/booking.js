/**
 * Nine Hills Family Salon - WhatsApp Booking System
 * Validates form inputs, formats an elegant message with emojis,
 * and launches WhatsApp directly addressed to 919836414320.
 */

document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('salonBookingForm');
  const dateInput = document.getElementById('bookingDate');

  // Prevent past dates in booking input
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  if (!bookingForm) return;

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('bookingName')?.value.trim();
    const phone = document.getElementById('bookingPhone')?.value.trim();
    const service = document.getElementById('bookingService')?.value;
    const category = document.getElementById('bookingCategory')?.value || 'General';
    const date = document.getElementById('bookingDate')?.value;
    const time = document.getElementById('bookingTime')?.value;
    const notes = document.getElementById('bookingNotes')?.value.trim();

    // Basic Validation
    if (!name || !phone || !service || !date || !time) {
      alert('Please fill in all required fields (Name, Phone, Service, Date, Time).');
      return;
    }

    // Phone validation (at least 10 digits)
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Format WhatsApp Message
    const salonWhatsAppNumber = '919836414320';
    const messageLines = [
      `✂️ *Appointment Request - Nine Hills Family Salon* ✨`,
      ``,
      `Hello Nine Hills Team, I would like to book a salon appointment:`,
      `• *Name:* ${name}`,
      `• *Phone:* ${phone}`,
      `• *Client Category:* ${category}`,
      `• *Service Requested:* ${service}`,
      `• *Preferred Date:* ${date}`,
      `• *Preferred Time:* ${time}`,
      notes ? `• *Special Note/Message:* ${notes}` : ``,
      ``,
      `📍 Location: Beliaghata, Kolkata`,
      `Kindly confirm my appointment slot. Thank you!`
    ].filter(line => line !== null);

    const fullMessage = messageLines.join('\n');
    const waUrl = `https://wa.me/${salonWhatsAppNumber}?text=${encodeURIComponent(fullMessage)}`;

    // Show visual confirmation on the button
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Opening WhatsApp...</span> ✂️`;
    submitBtn.disabled = true;

    // Launch WhatsApp in new tab
    setTimeout(() => {
      window.open(waUrl, '_blank');
      submitBtn.innerHTML = `<span>Request Sent to WhatsApp!</span> ✦`;
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        bookingForm.reset();
      }, 3500);
    }, 400);
  });
});
