// A simple service to manage audio playback for alerts.

// Public domain alarm sound from Pixabay
const SOS_ALERT_URL = 'https://cdn.pixabay.com/audio/2022/10/13/audio_58908d1976.mp3';
// Public domain notification sound from Pixabay
const REMINDER_ALERT_URL = 'https://cdn.pixabay.com/audio/2022/03/15/audio_2c87b53493.mp3';

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
