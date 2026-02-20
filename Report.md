# Task 1: Overview of the Smart Hospital Dashboard

**Course:** 22AML6  
**Assignment:** HCI Assignment 1 - Smart Hospital Dashboard

## 1. Dashboard Design & Implementation
This assignment fulfills the requirement of creating a Smart Hospital Dashboard. The system consists of an interactive UI built via HTML, CSS, and JS. It simulates real-time patient monitoring tracking 4 major vitals: Heart Rate (HR), Blood Oxygen (SpO2), Non-Invasive Blood Pressure (NIBP), and Temperature.

### Responsive Multi-device Views
The UI seamlessly scales across standard hardware typical in a hospital environment:
1. **Desktop/Large Display:** Displays a high-density grid showing all patient metrics on a single screen without needing navigation, perfect for central nursing stations.
2. **Tablet View:** Restructures for touch navigation (e.g., larger padding, simplified menus), suitable for physicians during ward rounds.
3. **Wearable/Mobile View:** Focuses primarily on critical alerts and single-patient deep dives.

![Desktop View](desktop_view.png)
*Figure 1: Desktop / Large Display grid layout simulating real-time monitoring.*

---

## 2. Evaluation of Human Factors (HCI I/O, Memory, Reasoning)

### Human I/O Channels
The dashboard is designed to heavily utilize human sensory channels to reduce the margin of error:
* **Visual Filtering:** The interface leverages a dark background (`#0f111a`) with high-contrast, color-coded medical badges. Green indicates stability, yellow indicates warning traits, and red signifies a critical threshold break.
* **Pre-attentive Processing:** Critical metrics feature a pulsing visual anomaly (e.g., a scaling heartbeat animation). This draws the peripheral vision immediately, addressing visually over-stimulated clinicians.
* **Auditory & Haptic Potential:** Alert banners at the top imply a direct trigger for auditory alarms on nursing stations or haptic vibration on doctor wearables.

### Memory Optimization
The interface mitigates heavy reliance on short-term working memory by applying the heuristic of **Recognition over Recall**:
* Iconography (lungs for SpO2, heart for HR) immediately registers the metric without reading textual labels.
* Information is persistently grouped. A doctor does not have to remember a patient's room number; the ID, Age, and Room act as a persistent header for every vitals box.

### Reasoning and Problem Solving
Rapid decision-making under pressure is supported via contextual bounds. Vitals numbers visually change color the moment they cross safe thresholds (e.g., HR > 130 bpm turns red). This handles the "pattern recognition" workload, allowing doctors to skip the interpretation phase and jump directly to the reasoning/triage phase.

![Tablet View](tablet_view.png)
*Figure 2: Responsive Tablet View, demonstrating clustered information.*

---

## 3. Analysis of Computer-Related Factors

### Device Suitability
Different interfaces are required for diverse physical constraints. The solution uses responsive CSS Grid algorithms to modify data density:
* **Central Displays** stream large packets of data asynchronously, suitable for high processing capabilities.
* **Tablets and Wearables** reorganize into single-column feeds, respecting smaller screen constraints and prioritizing immediate actionable alerts.

### Processing Speed and Memory Load
In an ICU context, blocking the main thread can delay life-saving alerts. To combat this:
* The dashboard utilizes targeted DOM DOM manipulation (via `getElementById()`) rather than re-rendering the entire patient list dynamically. 
* This drastically cuts down local system memory load, ensuring the system can process frequent, high-velocity JSON/WebSocket payloads from hospital infrastructure without browser lag.

### Network Reliability Simulation
Hospitals frequently suffer from spotty Wi-Fi networks in structurally dense zones (like radiology). 
* **The "Simulate Offline" Feature:** The dashboard includes an offline toggle. When network drops, the UI explicitly grays out (opacity drops to `0.6` and `grayscale` filter applied) and warns that the data is "Frozen".
* This is a critical safety constraint: a clinician must *never* make decisions assuming vitals are real-time when the connection is actually stalled.

![Wearable View](wearable_view.png)
*Figure 3: Wearable/Mobile constraints with visible "System Offline" safety state active.*

---

## 4. Enhancement of Usability

To finalize the UI, several enhancements were driven by established HCI models and ergonomic principles:

### HCI Models Applied
* **GOMS Model (Goals, Operators, Methods, Selection Rules):** The primary goal of a clinician approaching a screen is usually "Find who needs help." By adding a top sticky "Alert Banner" spanning the width of the display, the *Method* length to identify a critical patient drops to a single visual operation, bypassing the need to scan 20+ individual grid cards.

### Ergonomic Principles
* **Visual Ergonomics:** Constant glaring white screens cause severe eye fatigue for night-shift clinicians. Our use of Deep Space Dark themes (`#1e2130` surface colors) heavily reduces blue-light eye strain.
* **Fitts's Law:** Interactive elements (like the navigation items and the network toggle) feature generous padding, increasing the target area. This makes rapid touch interactions on tablets reliably faster and less prone to mis-clicks during emergencies.

---

## 5. Deployment and Links
This intelligent dashboard algorithm and its user interface have been officially bundled using React and TailwindCSS. The complete codebase and a live working interactive demo can be found below:

* **Live Demo (Vercel):** [https://hci-assignment-1.vercel.app](https://hci-assignment-1.vercel.app)
* **Source Code (GitHub):** [https://github.com/HarshalPatel1972/HCI-Assignment-1](https://github.com/HarshalPatel1972/HCI-Assignment-1)

---
*End of Report*
