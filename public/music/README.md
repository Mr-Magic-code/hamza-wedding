# Background music

The invitation ships with a soft, generated ambient track (Web Audio API), so
music works out of the box without any audio files.

To use your own song:

1. Add an MP3 file to this folder, for example `entry.mp3`.
   Use music you own or have a licence for.
2. Open `src/config/wedding.ts` and set:

   ```ts
   music: {
     src: "/music/entry.mp3",
     title: "Your song title",
   },
   ```

3. If the file cannot be played, the generated ambient track is used as a
   fallback automatically.
