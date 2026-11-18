const START_YEAR=2026;
const END_YEAR=2030;

const CAMPUSES=[
  {name:"MTECH Lehi Clinic",address:"2301 West Ashton Blvd, Lehi, UT 84048",phone:"801-753-6282"},
  {name:"MTECH Orem Clinic",address:"1410 West 1250 South, Orem, UT 84058",phone:"801-753-4200"},
  {name:"MTECH Provo Clinic",address:"125 North 100 West, Provo, UT 84601",phone:"801-753-4210"},
  {name:"MTECH Spanish Fork Clinic",address:"693 West 1210 South, Spanish Fork, UT 84660",phone:"801-753-4115"},
  {name:"MTECH Payson Clinic",address:"993 South 1950 West, Payson, UT 84651",phone:"385-287-2100"},
  {name:"MTECH Heber Valley Clinic",address:"977 West Riverhawk Road, Heber City, UT 84032",phone:"435-348-8380"}
];

const TIMES=["8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM"];
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];

const monthSelect=document.getElementById("month-select");
const yearSelect=document.getElementById("year-select");
const calendarGrid=document.getElementById("calendar-grid");
const prevMonth=document.getElementById("prev-month");
const nextMonth=document.getElementById("next-month");
const dayPanel=document.getElementById("day-panel");
const dayTitle=document.getElementById("day-title");
const dayContent=document.getElementById("day-content");
const closeDay=document.getElementById("close-day");
const bookingModal=document.getElementById("booking-modal");
const appointmentSummary=document.getElementById("appointment-summary");
const closeBooking=document.getElementById("close-booking");
const cancelBooking=document.getElementById("cancel-booking");
const bookingForm=document.getElementById("booking-form");
const dobInput=document.getElementById("patient-dob");
const confirmationModal=document.getElementById("confirmation-modal");
const confirmationContent=document.getElementById("confirmation-content");

let selectedSlot=null;
const bookedThisSession=new Set();

function pad(n){return String(n).padStart(2,"0")}
function keyForDate(d){return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`}
function hashString(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
function shuffle(arr,random){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function mondayOf(d){const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());const day=x.getDay();x.setDate(x.getDate()+(day===0?-6:1-day));return x}

function weekSlots(monday){
  const random=rng(hashString("MA-SCHEDULE-V2-"+keyForDate(monday)));

  // Fewer available days: only 1 or 2 days per week.
  const availableDayCount=random()<0.62?1:2;
  const availableOffsets=shuffle([0,1,2,3,4,5],random).slice(0,availableDayCount);

  const slots=[];

  availableOffsets.forEach((offset,dayIndex)=>{
    const date=new Date(monday.getFullYear(),monday.getMonth(),monday.getDate()+offset);

    if(date.getFullYear()<START_YEAR||date.getFullYear()>END_YEAR)return;

    // Multiple openings on an available day: 2 to 4.
    const slotCount=2+Math.floor(random()*3);
    const chosenTimes=shuffle(TIMES,random).slice(0,slotCount).sort((a,b)=>timeToMinutes(a)-timeToMinutes(b));

    chosenTimes.forEach((time,timeIndex)=>{
      const campus=CAMPUSES[Math.floor(random()*CAMPUSES.length)];
      slots.push({
        id:`${keyForDate(date)}-${dayIndex}-${timeIndex}-${time}`,
        date:new Date(date),
        time,
        campus
      });
    });
  });

  return slots;
}

function timeToMinutes(time){
  const [clock,period]=time.split(" ");
  let [hour,minute]=clock.split(":").map(Number);
  if(period==="PM"&&hour!==12)hour+=12;
  if(period==="AM"&&hour===12)hour=0;
  return hour*60+minute;
}

function slotsForDate(date){
  if(date.getDay()===0)return[];
  return weekSlots(mondayOf(date))
    .filter(s=>keyForDate(s.date)===keyForDate(date))
    .filter(s=>!bookedThisSession.has(s.id));
}

function initSelectors(){
  MONTHS.forEach((m,i)=>{const o=document.createElement("option");o.value=i;o.textContent=m;monthSelect.appendChild(o)});
  for(let y=START_YEAR;y<=END_YEAR;y++){const o=document.createElement("option");o.value=y;o.textContent=y;yearSelect.appendChild(o)}
  monthSelect.value=10;
  yearSelect.value=2026;
}

function renderCalendar(){
  dayPanel.classList.add("hidden");
  const month=Number(monthSelect.value);
  const year=Number(yearSelect.value);
  const first=new Date(year,month,1);
  const days=new Date(year,month+1,0).getDate();
  calendarGrid.innerHTML="";

  for(let i=0;i<first.getDay();i++){
    const blank=document.createElement("div");
    blank.className="blank-day";
    calendarGrid.appendChild(blank);
  }

  for(let day=1;day<=days;day++){
    const date=new Date(year,month,day);
    const slots=slotsForDate(date);
    const sunday=date.getDay()===0;
    const b=document.createElement("button");
    b.type="button";
    b.className="day-btn "+(sunday?"sunday":slots.length?"has-opening":"no-opening");
    b.innerHTML=`<span class="day-num">${day}</span><span class="day-status">${sunday?"Closed":slots.length?`${slots.length} openings`:"No openings"}</span>`;
    b.addEventListener("click",()=>openDay(date));
    calendarGrid.appendChild(b);
  }

  prevMonth.disabled=(year===START_YEAR&&month===0);
  nextMonth.disabled=(year===END_YEAR&&month===11);
}

function openDay(date){
  const slots=slotsForDate(date);
  dayTitle.textContent=date.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});

  if(date.getDay()===0){
    dayContent.innerHTML=`<div class="empty-message"><strong>No appointments.</strong> Sundays are closed.</div>`;
  }else if(!slots.length){
    dayContent.innerHTML=`<div class="empty-message"><strong>No openings on this date.</strong> Close this window and select another date.</div>`;
  }else{
    dayContent.innerHTML=`<div class="slot-list">${slots.map((s,i)=>`
      <div class="slot-card">
        <div class="slot-time">${s.time}</div>
        <div class="slot-place"><strong>${s.campus.name}</strong><span>${s.campus.address}</span><span>Phone: ${s.campus.phone}</span></div>
        <button class="slot-select" type="button" data-index="${i}">Select</button>
      </div>`).join("")}</div>`;
    dayContent.querySelectorAll("[data-index]").forEach(btn=>{
      btn.addEventListener("click",()=>openBooking(slots[Number(btn.dataset.index)]));
    });
  }

  dayPanel.classList.remove("hidden");
}

function openBooking(slot){
  selectedSlot=slot;
  bookingForm.reset();
  appointmentSummary.textContent=`${slot.date.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})} at ${slot.time} — ${slot.campus.name}, ${slot.campus.address} — Phone: ${slot.campus.phone}`;
  bookingModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeBookingModal(){
  bookingModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  selectedSlot=null;
}

function formatDob(v){
  const n=v.replace(/\D/g,"").slice(0,8);
  if(n.length<=2)return n;
  if(n.length<=4)return n.slice(0,2)+"/"+n.slice(2);
  return n.slice(0,2)+"/"+n.slice(2,4)+"/"+n.slice(4);
}
dobInput.addEventListener("input",()=>dobInput.value=formatDob(dobInput.value));

function esc(v){
  return v.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

bookingForm.addEventListener("submit",e=>{
  e.preventDefault();
  if(!selectedSlot)return;

  const firstName=document.getElementById("patient-first-name").value.trim();
  const lastName=document.getElementById("patient-last-name").value.trim();
  const dob=dobInput.value.trim();
  const pid=document.getElementById("patient-id").value.trim();
  const phone=document.getElementById("patient-phone").value.trim();
  const note=document.getElementById("patient-note").value.trim();
  const contact=bookingForm.querySelector('input[name="contact"]:checked');

  if(!firstName||!lastName||!dob||!pid||!phone||!note||!contact){
    alert("Complete all fields, choose a contact method, and enter a note.");
    return;
  }

  bookedThisSession.add(selectedSlot.id);
  const d=selectedSlot.date.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});

  bookingModal.classList.add("hidden");

  confirmationContent.innerHTML=`
    <div>
      <p class="eyebrow">PRACTICE COMPLETE</p>
      <h2 id="confirmation-title">Appointment Scheduled</h2>
      <p>This is practice only. The information is not permanently saved.</p>
      <div class="confirmation-grid">
        <div class="confirm-field"><span>Patient</span><strong>${esc(firstName)} ${esc(lastName)}</strong></div>
        <div class="confirm-field"><span>Date of Birth</span><strong>${esc(dob)}</strong></div>
        <div class="confirm-field"><span>Patient ID</span><strong>${esc(pid)}</strong></div>
        <div class="confirm-field"><span>Phone</span><strong>${esc(phone)}</strong></div>
        <div class="confirm-field"><span>Appointment</span><strong>${d} at ${selectedSlot.time}</strong></div>
        <div class="confirm-field"><span>Location</span><strong>${selectedSlot.campus.name}</strong><div>${selectedSlot.campus.address}</div><div>Phone: ${selectedSlot.campus.phone}</div></div>
        <div class="confirm-field"><span>Contact Method</span><strong>${esc(contact.value)}</strong></div>
      </div>
      <div class="practice-note"><strong>Note</strong><br>${esc(note)}</div>
      <div class="actions"><button id="return-calendar" class="primary-btn" type="button">Return to Calendar</button></div>
    </div>`;

  confirmationModal.classList.remove("hidden");

  confirmationContent.querySelector("#return-calendar").addEventListener("click",()=>{
    confirmationModal.classList.add("hidden");
    document.body.classList.remove("modal-open");
    selectedSlot=null;
    renderCalendar();
  });
});

closeDay.addEventListener("click",()=>dayPanel.classList.add("hidden"));
closeBooking.addEventListener("click",closeBookingModal);
cancelBooking.addEventListener("click",closeBookingModal);

bookingModal.addEventListener("click",(e)=>{
  if(e.target===bookingModal)closeBookingModal();
});

confirmationModal.addEventListener("click",(e)=>{
  if(e.target===confirmationModal){
    confirmationModal.classList.add("hidden");
    document.body.classList.remove("modal-open");
    selectedSlot=null;
    renderCalendar();
  }
});

monthSelect.addEventListener("change",renderCalendar);
yearSelect.addEventListener("change",renderCalendar);

prevMonth.addEventListener("click",()=>{
  let m=Number(monthSelect.value),y=Number(yearSelect.value);
  m--;
  if(m<0){m=11;y--}
  if(y<START_YEAR)return;
  monthSelect.value=m;
  yearSelect.value=y;
  renderCalendar();
});

nextMonth.addEventListener("click",()=>{
  let m=Number(monthSelect.value),y=Number(yearSelect.value);
  m++;
  if(m>11){m=0;y++}
  if(y>END_YEAR)return;
  monthSelect.value=m;
  yearSelect.value=y;
  renderCalendar();
});

initSelectors();
renderCalendar();
