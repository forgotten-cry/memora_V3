// A simple service to manage audio playback for alerts.

// Public domain alarm sound from Freesound
const SOS_ALERT_URL = 'https://cdn.freesound.org/previews/518/518332_10250800-lq.mp3';
// Public domain notification sound from Freesound
const REMINDER_ALERT_URL = 'https://cdn.freesound.org/previews/415/415763_6142149-lq.mp3';

let sosAudio: HTMLAudioElement | null = null;
let reminderAudio: HTMLAudioElement | null = null;

const soundService = {
  /**
   * Plays the looping SOS/Fall alert sound.
   */
  playSosAlert: () => {
    if (!sosAudio) {
      sosAudio = new Audio(SOS_ALERT_URL);
      sosAudio.loop = true;
    }
    // Check if it's already playing to avoid interrupting and restarting it
    if (sosAudio.paused) {
      sosAudio.play().catch(e => console.error("Error playing SOS sound:", e));
    }
  },
  
  /**
   * Stops the looping SOS/Fall alert sound and rewinds it.
   */
  stopSosAlert: () => {
    if (sosAudio && !sosAudio.paused) {
      sosAudio.pause();
      sosAudio.currentTime = 0; // Rewind to the start
    }
  },

  /**
   * Plays the one-time reminder notification sound.
   */
  playReminderAlert: () => {
    if (!reminderAudio) {
      reminderAudio = new Audio(REMINDER_ALERT_URL);
      reminderAudio.loop = false;
    }
    reminderAudio.currentTime = 0; // Rewind in case it's triggered again
    reminderAudio.play().catch(e => console.error("Error playing reminder sound:", e));
  }
};

export default soundService;