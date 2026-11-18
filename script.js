const START_YEAR = 2026;
const END_YEAR = 2030;

// Current MTECH public campus locations used for this training simulation.
const CAMPUSES = [
  {
    name: "MTECH Lehi Main Campus",
    address: "2301 West Ashton Blvd, Lehi, UT 84048"
  },
  {
    name: "MTECH Orem Campus",
    address: "1410 West 1250 South, Orem, UT 84058"
  },
  {
    name: "MTECH Provo Campus",
    address: "125 North 100 West, Provo, UT 84601"
  },
  {
    name: "MTECH Spanish Fork Campus",
    address: "693 West 1210 South, Spanish Fork, UT 84660"
  },
  {
    name: "MTECH Payson Campus",
    address: "993 South 1950 West, Payson, UT 84651"
  },
  {
    name: "MTECH Heber Valley Campus",
    address: "977 West Riverhawk Road, Heber City, UT 84032"
  }
];

const TIMES = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM"
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendarGrid = document.getElementById("calendar-grid");
const dayPanel = document.getElementById("day-panel");
const selectedDateHeading = document.getElementById("selected-date-heading");
const dayMessage = document.getElementById("day-message");
const slotList = document.getElementById("slot-list");
const closeDayPanel = document.getElementById("close-day-panel");
const bookingPanel = document.getElementById("booking-panel");
const closeBookingPanel = document.getElementById("close-booking-panel");
const cancelBooking = document.getElementById("cancel-booking");
const bookingForm = document.getElementById("booking-form");
const selectedSlotSummary = document.getElementById("selected-slot-summary");
const patientDob = document.getElementById("patient-dob");
const confirmationPanel = document.getElementById("confirmation-panel");

let selectedSlot = null;
const sessionBookedSlots = new Set();

function pad(value) {
  return String(value).padStart(2, "0");
}

function dateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function hashString(value) {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function pseudoRandom(seed) {
  let state = seed >>> 0;

  return function () {
    state += 0x6D2B79F5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(array, random) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function getMonday(date) {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = result.getDay();
  const difference = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + difference);
  return result;
}

function buildWeekAvailability(monday) {
  const weekId = dateKey(monday);
  const random = pseudoRandom(hashString(`mtech-appointments-${weekId}`));

  // Exactly 3 or 4 openings per Monday-Saturday week.
  const slotCount = random() < 0.5 ? 3 : 4;

  // Spread openings across different days so availability stays sparse.
  const dayOffsets = shuffle([0, 1, 2, 3, 4, 5], random).slice(0, slotCount);
  const slots = [];

  dayOffsets.forEach((offset, index) => {
    const appointmentDate = new Date(
      monday.getFullYear(),
      monday.getMonth(),
      monday.getDate() + offset
    );

    if (
      appointmentDate.getFullYear() < START_YEAR ||
      appointmentDate.getFullYear() > END_YEAR
    ) {
      return;
    }

    const time = TIMES[Math.floor(random() * TIMES.length)];
    const campus = CAMPUSES[Math.floor(random() * CAMPUSES.length)];

    slots.push({
      id: `${dateKey(appointmentDate)}-${index}-${time.replace(/[^0-9APM]/g, "")}`,
      date: new Date(appointmentDate),
      time,
      campus
    });
  });

  return slots;
}

function getAvailabilityForDate(date) {
  if (date.getDay() === 0) return [];

  const monday = getMonday(date);

  return buildWeekAvailability(monday)
    .filter((slot) => dateKey(slot.date) === dateKey(date))
    .filter((slot) => !sessionBookedSlots.has(slot.id));
}

function initializeSelectors() {
  MONTHS.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  for (let year = START_YEAR; year <= END_YEAR; year += 1) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }

  // Start on November 2026 for this version.
  monthSelect.value = "10";
  yearSelect.value = "2026";
}

function renderCalendar() {
  closePanels();

  const month = Number(monthSelect.value);
  const year = Number(yearSelect.value);
  const firstDay = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();

  calendarGrid.innerHTML = "";

  for (let i = 0; i < firstDay.getDay(); i += 1) {
    const blank = document.createElement("div");
    blank.className = "calendar-blank";
    blank.setAttribute("aria-hidden", "true");
    calendarGrid.appendChild(blank);
  }

  for (let day = 1; day <= lastDate; day += 1) {
    const date = new Date(year, month, day);
    const availability = getAvailabilityForDate(date);
    const isSunday = date.getDay() === 0;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";

    if (isSunday) {
      button.classList.add("sunday", "no-availability");
    } else if (availability.length > 0) {
      button.classList.add("has-availability");
    } else {
      button.classList.add("no-availability");
    }

    button.innerHTML = `
      <span class="day-number">${day}</span>
      <span class="day-status">
        ${
          isSunday
            ? "Closed"
            : availability.length > 0
              ? `${availability.length} opening${availability.length === 1 ? "" : "s"}`
              : "No openings"
        }
      </span>
    `;

    button.setAttribute(
      "aria-label",
      `${MONTHS[month]} ${day}, ${year}. ${
        isSunday
          ? "Closed Sunday."
          : availability.length
            ? `${availability.length} appointment opening${availability.length === 1 ? "" : "s"}.`
            : "No openings."
      }`
    );

    button.addEventListener("click", () => showDay(date));
    calendarGrid.appendChild(button);
  }
}

function showDay(date) {
  confirmationPanel.classList.add("hidden");
  bookingPanel.classList.add("hidden");

  const availability = getAvailabilityForDate(date);
  const readableDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  selectedDateHeading.textContent = readableDate;
  dayMessage.innerHTML = "";
  slotList.innerHTML = "";

  if (date.getDay() === 0) {
    dayMessage.innerHTML = `
      <div class="empty-day">
        <p><strong>No appointments available.</strong> Sundays are closed.</p>
      </div>
    `;
  } else if (availability.length === 0) {
    dayMessage.innerHTML = `
      <div class="empty-day">
        <p><strong>No openings on this date.</strong> Close this day and select another date.</p>
      </div>
    `;
  } else {
    availability.forEach((slot) => {
      const card = document.createElement("div");
      card.className = "slot-card";

      card.innerHTML = `
        <div class="slot-time">${slot.time}</div>
        <div class="slot-location">
          <strong>${slot.campus.name}</strong>
          <span>${slot.campus.address}</span>
        </div>
        <button type="button" class="slot-button">Select</button>
      `;

      card.querySelector(".slot-button").addEventListener("click", () => {
        openBookingForm(slot);
      });

      slotList.appendChild(card);
    });
  }

  dayPanel.classList.remove("hidden");
  dayPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function openBookingForm(slot) {
  selectedSlot = slot;
  bookingForm.reset();
  confirmationPanel.classList.add("hidden");

  const readableDate = slot.date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  selectedSlotSummary.textContent =
    `${readableDate} at ${slot.time} — ${slot.campus.name}, ${slot.campus.address}`;

  bookingPanel.classList.remove("hidden");
  bookingPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function formatDobInput(value) {
  const numbers = value.replace(/\D/g, "").slice(0, 8);

  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 4) return numbers.slice(0, 2) + "/" + numbers.slice(2);

  return numbers.slice(0, 2) + "/" + numbers.slice(2, 4) + "/" + numbers.slice(4);
}

patientDob.addEventListener("input", () => {
  patientDob.value = formatDobInput(patientDob.value);
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!selectedSlot) return;

  const patientName = document.getElementById("patient-name").value.trim();
  const dob = patientDob.value.trim();
  const patientId = document.getElementById("patient-id").value.trim();
  const phone = document.getElementById("patient-phone").value.trim();
  const note = document.getElementById("patient-note").value.trim();
  const contactMethod = bookingForm.querySelector('input[name="contactMethod"]:checked');

  if (!patientName || !dob || !patientId || !phone || !note || !contactMethod) {
    alert("Complete all patient information, select a contact method, and enter a note.");
    return;
  }

  const readableDate = selectedSlot.date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  sessionBookedSlots.add(selectedSlot.id);

  confirmationPanel.innerHTML = `
    <p class="eyebrow">Practice Complete</p>
    <h2>Appointment documented</h2>
    <p>This entry is for practice only and is not permanently saved.</p>

    <div class="confirmation-grid">
      <div class="confirmation-field">
        <span>Patient</span>
        <strong>${escapeHtml(patientName)}</strong>
      </div>

      <div class="confirmation-field">
        <span>Date of Birth</span>
        <strong>${escapeHtml(dob)}</strong>
      </div>

      <div class="confirmation-field">
        <span>Patient ID</span>
        <strong>${escapeHtml(patientId)}</strong>
      </div>

      <div class="confirmation-field">
        <span>Phone</span>
        <strong>${escapeHtml(phone)}</strong>
      </div>

      <div class="confirmation-field">
        <span>Appointment</span>
        <strong>${readableDate} at ${selectedSlot.time}</strong>
      </div>

      <div class="confirmation-field">
        <span>Location</span>
        <strong>${selectedSlot.campus.name}</strong>
        <div>${selectedSlot.campus.address}</div>
      </div>

      <div class="confirmation-field">
        <span>Contact Method</span>
        <strong>${escapeHtml(contactMethod.value)}</strong>
      </div>
    </div>

    <div class="practice-note">
      <strong>Note</strong><br />
      ${escapeHtml(note)}
    </div>

    <div class="form-actions">
      <button id="return-to-calendar" class="primary-button" type="button">
        Return to Calendar
      </button>
    </div>
  `;

  bookingPanel.classList.add("hidden");
  confirmationPanel.classList.remove("hidden");

  document.getElementById("return-to-calendar").addEventListener("click", () => {
    confirmationPanel.classList.add("hidden");
    dayPanel.classList.add("hidden");
    renderCalendar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  confirmationPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function closePanels() {
  dayPanel.classList.add("hidden");
  bookingPanel.classList.add("hidden");
  confirmationPanel.classList.add("hidden");
  selectedSlot = null;
}

closeDayPanel.addEventListener("click", () => {
  dayPanel.classList.add("hidden");
  bookingPanel.classList.add("hidden");
  confirmationPanel.classList.add("hidden");
  selectedSlot = null;
});

closeBookingPanel.addEventListener("click", () => {
  bookingPanel.classList.add("hidden");
  selectedSlot = null;
});

cancelBooking.addEventListener("click", () => {
  bookingPanel.classList.add("hidden");
  selectedSlot = null;
});

monthSelect.addEventListener("change", renderCalendar);
yearSelect.addEventListener("change", renderCalendar);

initializeSelectors();
renderCalendar();
