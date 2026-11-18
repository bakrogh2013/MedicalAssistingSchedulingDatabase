const patients = [
  {
    "id": "1001",
    "firstName": "Laura",
    "lastName": "Simmons",
    "dob": "04/05/1980",
    "phone": "(555) 010-0001",
    "notes": [
      {
        "title": "Abnormal Vital Signs Follow-Up",
        "text": "During yesterday’s visit, BP was elevated. The provider instructed a follow-up check in 1 week. MA calls to schedule a nurse visit for a blood pressure check."
      }
    ]
  },
  {
    "id": "1002",
    "firstName": "Anthony",
    "lastName": "Ruiz",
    "dob": "10/18/1992",
    "phone": "(555) 010-0002",
    "notes": [
      {
        "title": "Lab Collection Issue",
        "text": "The patient's urine sample was insufficient for analysis. MA calls to notify the patient and arrange time to return for recollection."
      }
    ]
  },
  {
    "id": "1003",
    "firstName": "Michelle",
    "lastName": "Carter",
    "dob": "08/14/1987",
    "phone": "(555) 010-0003",
    "notes": [
      {
        "title": "Abnormal Pap Smear Notification",
        "text": "Provider reviewed results and recommends a colposcopy. MA calls to explain that a follow-up appointment is needed."
      }
    ]
  },
  {
    "id": "1004",
    "firstName": "Thomas",
    "lastName": "Green",
    "dob": "02/22/1954",
    "phone": "(555) 010-0004",
    "notes": [
      {
        "title": "Chronic Condition Education",
        "text": "Patient with newly diagnosed Type 2 diabetes. MA calls to check if a patient received a blood glucose monitor and to remind them of diabetes education class."
      }
    ]
  },
  {
    "id": "1005",
    "firstName": "Brenda",
    "lastName": "Hall",
    "dob": "06/01/1962",
    "phone": "(555) 010-0005",
    "notes": [
      {
        "title": "Wound Care Instructions",
        "text": "Patient had a skin biopsy yesterday. MA calls to review wound care instructions (cleaning, dressing changes) and confirm no signs of infection."
      }
    ]
  },
  {
    "id": "1006",
    "firstName": "Joseph",
    "lastName": "Kim",
    "dob": "11/30/1975",
    "phone": "(555) 010-0006",
    "notes": [
      {
        "title": "Chest X-Ray Follow-Up",
        "text": "Chest X-ray showed pneumonia. The provider started the patient on an antibiotic and wants follow-up in 5 days. MA calls to notify and schedule a visit."
      }
    ]
  },
  {
    "id": "1007",
    "firstName": "Sophia",
    "lastName": "Nguyen",
    "dob": "09/22/2019",
    "phone": "(555) 010-0007",
    "guardian": "Minh Nguyen",
    "guardianRelationship": "Father",
    "notes": [
      {
        "title": "Pediatric Well-Check Immunization Catch-Up",
        "text": "Parent is overdue for bringing a child in for vaccines. MA calls to review immunizations needed and to schedule an appointment. MA must verify guardian identity, then offer appointment slots and confirm consent for vaccines. Look up vaccine schedule on CDC to find out what immunizations this child may need."
      }
    ]
  },
  {
    "id": "1008",
    "firstName": "William",
    "lastName": "Harris",
    "dob": "05/16/1949",
    "phone": "(555) 010-0008",
    "notes": [
      {
        "title": "Missed INR (Coumadin) Lab Draw",
        "text": "Patient on anticoagulation therapy missed a scheduled INR check. MA calls to reschedule and review the importance of timely labs."
      }
    ]
  },
  {
    "id": "1009",
    "firstName": "Jasmine",
    "lastName": "Flores",
    "dob": "01/12/1997",
    "phone": "(555) 010-0009",
    "notes": [
      {
        "title": "Pre-Natal Appointment Reminder",
        "text": "MA calls to remind of OB visit, confirms patient brings prenatal vitamin list and asks about fetal kick counts."
      }
    ]
  },
  {
    "id": "1010",
    "firstName": "Christopher",
    "lastName": "Scott",
    "dob": "07/25/2005",
    "phone": "(555) 010-0010",
    "notes": [
      {
        "title": "Allergy Test Results",
        "text": "Allergy panel results show seasonal pollen sensitivity. Provider recommends antihistamine. MA calls to share provider’s instructions."
      }
    ]
  },
  {
    "id": "1011",
    "firstName": "Hannah",
    "lastName": "Morris",
    "dob": "02/09/1985",
    "phone": "(555) 010-0011",
    "notes": [
      {
        "title": "Abnormal Thyroid Labs",
        "text": "Recent TSH labs came back abnormal. Provider wants the patient to schedule a medication adjustment appointment. MA calls to notify and schedule."
      }
    ]
  },
  {
    "id": "1012",
    "firstName": "Daniel",
    "lastName": "Rivera",
    "dob": "04/01/1973",
    "phone": "(555) 010-0012",
    "notes": [
      {
        "title": "Sleep Study Coordination",
        "text": "Provider ordered sleep study for suspected sleep apnea. MA calls to give patient details for an outside sleep lab and confirm that a referral was faxed."
      }
    ]
  },
  {
    "id": "1013",
    "firstName": "Marcus",
    "lastName": "Bell",
    "dob": "10/30/1991",
    "phone": "(555) 010-0013",
    "notes": [
      {
        "title": "Medication Side Effect Report",
        "text": "Patient left message about new rash after starting antibiotic. MA calls to gather details, advise patient not to take further doses, and schedule urgent provider call-back."
      }
    ]
  },
  {
    "id": "1014",
    "firstName": "Patricia",
    "lastName": "Clark",
    "dob": "01/18/1960",
    "phone": "(555) 010-0014",
    "preferredName": "Pat",
    "notes": [
      {
        "title": "Cholesterol Management Plan",
        "text": "Recent lipid panel showed high LDL. Provider recommends starting statin therapy. MA calls to notify and schedule follow-up to review medication plan."
      }
    ]
  },
  {
    "id": "1015",
    "firstName": "Stephanie",
    "lastName": "Adams",
    "dob": "05/11/1994",
    "phone": "(555) 010-0015",
    "notes": [
      {
        "title": "Prenatal Lab Review",
        "text": "Prenatal labs returned; all within normal limits. MA calls to inform patient and remind her of next OB visit."
      }
    ]
  },
  {
    "id": "1016",
    "firstName": "Charles",
    "lastName": "Foster",
    "dob": "03/07/1976",
    "phone": "(555) 010-0016",
    "notes": [
      {
        "title": "Post-Op Suture Removal Reminder",
        "text": "Patient had skin lesion excision last week. MA calls to remind of suture removal appointment in 2 days."
      }
    ]
  },
  {
    "id": "1017",
    "firstName": "Lilly",
    "lastName": "Bennett",
    "dob": "07/22/1982",
    "phone": "(555) 010-0017",
    "notes": [
      {
        "title": "Fasting Glucose Lab Reminder",
        "text": "Patient scheduled for fasting glucose tomorrow morning. MA calls to remind patient no food/drink after midnight except water."
      }
    ]
  },
  {
    "id": "1018",
    "firstName": "Natalie",
    "lastName": "Gomez",
    "dob": "06/03/2015",
    "phone": "(555) 010-0018",
    "guardian": "Maria Gomez",
    "guardianRelationship": "Mother",
    "notes": [
      {
        "title": "Pediatric Immunization Reminder",
        "text": "Verify legal guardian. Confirm appointment scheduled for immunizations."
      }
    ]
  },
  {
    "id": "2001",
    "firstName": "Laura",
    "lastName": "Simmons",
    "dob": "12/11/1974",
    "phone": "(555) 020-0001",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2002",
    "firstName": "Lora",
    "lastName": "Simmons",
    "dob": "04/05/1980",
    "phone": "(555) 020-0002",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2003",
    "firstName": "Anthony",
    "lastName": "Ruiz",
    "dob": "03/09/1988",
    "phone": "(555) 020-0003",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2004",
    "firstName": "Anthony",
    "lastName": "Ruis",
    "dob": "10/18/1992",
    "phone": "(555) 020-0004",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2005",
    "firstName": "Michelle",
    "lastName": "Carter",
    "dob": "01/22/1979",
    "phone": "(555) 020-0005",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2006",
    "firstName": "Michele",
    "lastName": "Carter",
    "dob": "08/14/1987",
    "phone": "(555) 020-0006",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2007",
    "firstName": "Thomas",
    "lastName": "Green",
    "dob": "07/17/1961",
    "phone": "(555) 020-0007",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2008",
    "firstName": "Thomas",
    "lastName": "Greene",
    "dob": "02/22/1954",
    "phone": "(555) 020-0008",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2009",
    "firstName": "Brenda",
    "lastName": "Hall",
    "dob": "09/14/1965",
    "phone": "(555) 020-0009",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2010",
    "firstName": "Brenda",
    "lastName": "Hale",
    "dob": "06/01/1962",
    "phone": "(555) 020-0010",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2011",
    "firstName": "Joseph",
    "lastName": "Kim",
    "dob": "05/26/1981",
    "phone": "(555) 020-0011",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2012",
    "firstName": "Josef",
    "lastName": "Kim",
    "dob": "11/30/1975",
    "phone": "(555) 020-0012",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2013",
    "firstName": "Sophia",
    "lastName": "Nguyen",
    "dob": "02/15/2018",
    "phone": "(555) 020-0013",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ],
    "guardian": "Minh Nguyen",
    "guardianRelationship": "Father"
  },
  {
    "id": "2014",
    "firstName": "Sofia",
    "lastName": "Nguyen",
    "dob": "09/22/2019",
    "phone": "(555) 020-0014",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ],
    "guardian": "Minh Nguyen",
    "guardianRelationship": "Father"
  },
  {
    "id": "2015",
    "firstName": "William",
    "lastName": "Harris",
    "dob": "11/03/1955",
    "phone": "(555) 020-0015",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2016",
    "firstName": "William",
    "lastName": "Harriss",
    "dob": "05/16/1949",
    "phone": "(555) 020-0016",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2017",
    "firstName": "Jasmine",
    "lastName": "Flores",
    "dob": "06/28/1993",
    "phone": "(555) 020-0017",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2018",
    "firstName": "Jazmine",
    "lastName": "Flores",
    "dob": "01/12/1997",
    "phone": "(555) 020-0018",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2019",
    "firstName": "Christopher",
    "lastName": "Scott",
    "dob": "04/12/2003",
    "phone": "(555) 020-0019",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2020",
    "firstName": "Christopher",
    "lastName": "Scot",
    "dob": "07/25/2005",
    "phone": "(555) 020-0020",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2021",
    "firstName": "Hannah",
    "lastName": "Morris",
    "dob": "08/21/1982",
    "phone": "(555) 020-0021",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2022",
    "firstName": "Hanna",
    "lastName": "Morris",
    "dob": "02/09/1985",
    "phone": "(555) 020-0022",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2023",
    "firstName": "Daniel",
    "lastName": "Rivera",
    "dob": "12/19/1969",
    "phone": "(555) 020-0023",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2024",
    "firstName": "Danial",
    "lastName": "Rivera",
    "dob": "04/01/1973",
    "phone": "(555) 020-0024",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2025",
    "firstName": "Marcus",
    "lastName": "Bell",
    "dob": "03/16/1989",
    "phone": "(555) 020-0025",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2026",
    "firstName": "Markus",
    "lastName": "Bell",
    "dob": "10/30/1991",
    "phone": "(555) 020-0026",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2027",
    "firstName": "Patricia",
    "lastName": "Clark",
    "dob": "10/07/1958",
    "phone": "(555) 020-0027",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2028",
    "firstName": "Patricia",
    "lastName": "Clarke",
    "dob": "01/18/1960",
    "phone": "(555) 020-0028",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2029",
    "firstName": "Stephanie",
    "lastName": "Adams",
    "dob": "02/20/1990",
    "phone": "(555) 020-0029",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2030",
    "firstName": "Stefanie",
    "lastName": "Adams",
    "dob": "05/11/1994",
    "phone": "(555) 020-0030",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2031",
    "firstName": "Charles",
    "lastName": "Foster",
    "dob": "09/29/1978",
    "phone": "(555) 020-0031",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2032",
    "firstName": "Charles",
    "lastName": "Forster",
    "dob": "03/07/1976",
    "phone": "(555) 020-0032",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2033",
    "firstName": "Lilly",
    "lastName": "Bennett",
    "dob": "01/05/1980",
    "phone": "(555) 020-0033",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2034",
    "firstName": "Lily",
    "lastName": "Bennett",
    "dob": "07/22/1982",
    "phone": "(555) 020-0034",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ]
  },
  {
    "id": "2035",
    "firstName": "Natalie",
    "lastName": "Gomez",
    "dob": "10/18/2014",
    "phone": "(555) 020-0035",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ],
    "guardian": "Maria Gomez",
    "guardianRelationship": "Mother"
  },
  {
    "id": "2036",
    "firstName": "Natalia",
    "lastName": "Gomez",
    "dob": "06/03/2015",
    "phone": "(555) 020-0036",
    "notes": [
      {
        "title": "Telephone / Chart Note",
        "text": "Routine chart documentation is on file. Verify that you have selected the correct patient before discussing chart information."
      }
    ],
    "guardian": "Maria Gomez",
    "guardianRelationship": "Mother"
  }
];

const form=document.getElementById("patient-search-form");
const firstNameInput=document.getElementById("first-name");
const lastNameInput=document.getElementById("last-name");
const dobInput=document.getElementById("dob");
const clearButton=document.getElementById("clear-search");
const messageArea=document.getElementById("message-area");
const patientResult=document.getElementById("patient-result");

function normalizeName(v){return v.trim().toLowerCase();}
function formatDobInput(v){
  const n=v.replace(/\D/g,"").slice(0,8);
  if(n.length<=2)return n;
  if(n.length<=4)return n.slice(0,2)+"/"+n.slice(2);
  return n.slice(0,2)+"/"+n.slice(2,4)+"/"+n.slice(4);
}
dobInput.addEventListener("input",()=>dobInput.value=formatDobInput(dobInput.value));

form.addEventListener("submit",(event)=>{
  event.preventDefault();
  const firstName=normalizeName(firstNameInput.value);
  const lastName=normalizeName(lastNameInput.value);
  const dob=dobInput.value.trim();
  messageArea.innerHTML=""; patientResult.innerHTML="";
  if(!firstName&&!lastName&&!dob){showNotFound("Enter at least a first name, last name, or date of birth before searching.");return;}
  const matches=patients.filter(r=>
    (!firstName||normalizeName(r.firstName)===firstName)&&
    (!lastName||normalizeName(r.lastName)===lastName)&&
    (!dob||r.dob===dob)
  );
  if(!matches.length){showNotFound("No patients match the information entered. Verify the patient's information and try again.");return;}
  if(firstName&&lastName&&dob&&matches.length===1){renderPatient(matches[0]);return;}
  renderPatientMatches(matches);
});

clearButton.addEventListener("click",()=>{form.reset();messageArea.innerHTML="";patientResult.innerHTML="";firstNameInput.focus();});

function showNotFound(message){
  messageArea.innerHTML=`<div class="message-card error"><h2>Patient Not Found</h2><p>${message}</p></div>`;
}

function renderPatientMatches(matches){
  const rows=matches.map(p=>`<tr><td><strong>${p.firstName} ${p.lastName}</strong></td><td>${p.dob}</td><td>${p.id}</td><td><button type="button" class="view-button" data-patient-id="${p.id}">Open Patient</button></td></tr>`).join("");
  patientResult.innerHTML=`<article class="patient-card"><div class="patient-header"><span class="patient-found">Search Results</span><h2>${matches.length} Patient${matches.length===1?"":"s"} Found</h2><p class="patient-meta">Verify the patient's name and date of birth before opening the chart.</p></div><div class="notes-section"><div class="table-wrap"><table><thead><tr><th>Patient Name</th><th>Date of Birth</th><th>Patient ID</th><th></th></tr></thead><tbody>${rows}</tbody></table></div></div></article>`;
  patientResult.querySelectorAll("[data-patient-id]").forEach(b=>b.addEventListener("click",()=>{const p=patients.find(r=>r.id===b.dataset.patientId);if(p)renderPatient(p);}));
}

function renderPatient(patient){
  const guardian=patient.guardian?`<div class="guardian-box"><strong>Legal Guardian</strong>${patient.guardian} (${patient.guardianRelationship})</div>`:"";
  const preferred=patient.preferredName?`<div class="demographic-field"><span>Preferred Name</span><strong>${patient.preferredName}</strong></div>`:"";
  const notes=patient.notes.map((n,i)=>`<tr><td><strong>${n.title}</strong></td><td><button type="button" class="view-button" data-note-index="${i}">View Note</button></td></tr>`).join("");
  patientResult.innerHTML=`<article class="patient-card"><div class="patient-header"><span class="patient-found">Patient Found</span><h2>${patient.firstName} ${patient.lastName}</h2><p class="patient-meta">Patient ID: ${patient.id}</p></div><div class="demographics"><div class="demographic-field"><span>Date of Birth</span><strong>${patient.dob}</strong></div><div class="demographic-field"><span>Phone Number</span><strong>${patient.phone}</strong></div>${preferred}</div>${guardian}<div class="notes-section"><h3>Chart Notes</h3><p class="notes-instruction">Open the note related to this patient's telephone follow-up.</p><div class="table-wrap"><table><thead><tr><th>Note</th><th></th></tr></thead><tbody>${notes}</tbody></table></div></div></article><div id="note-detail"></div>`;
  patientResult.querySelectorAll("[data-note-index]").forEach(b=>b.addEventListener("click",()=>renderNoteDetail(patient.notes[Number(b.dataset.noteIndex)])));
}

function renderNoteDetail(note){
  const area=document.getElementById("note-detail");
  area.innerHTML=`<article class="detail-card"><div class="detail-top"><span class="note-label">Chart Note</span><h3>${note.title}</h3></div><div class="note-body">${note.text}</div></article>`;
  area.scrollIntoView({behavior:"smooth",block:"nearest"});
}
