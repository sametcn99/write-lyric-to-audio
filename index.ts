import { parseFile } from "npm:music-metadata";
import { getLyrics } from "npm:genius-lyrics-api";
import ffmetadata from "npm:ffmetadata";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const env = await load();
const __dirname = "your directory path here"; // e.g. "C:\\Users\\user\\Music\\my-music-folder";

/**
 * The API key used for accessing the Genius API.
 */
const apiKey = env["GENIUS_API_KEY"];
if (!apiKey) {
  console.error("GENIUS_API_KEY environment variable is not set.");
}

/**
 * Retrieves an array of `Deno.DirEntry` objects representing the FLAC files in the specified directory.
 * Only files with the extensions ".flac" or ".mp3" will be included in the result.
 *
 * @param directory - The directory path to search for FLAC files.
 * @returns An array of `Deno.DirEntry` objects representing the FLAC files found in the directory.
 */
function getFlacFiles(directory: string): Deno.DirEntry[] {
  try {
    const files = Array.from(Deno.readDirSync(directory)).filter(
      (file) => file.isFile && file.name.endsWith(".flac" || ".mp3")
    );
    return files;
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}

/**
 * Main function that processes FLAC files, retrieves lyrics, and writes them to the audio metadata.
 * @returns {Promise<void>} A promise that resolves when all the processing is complete.
 */
async function main() {
  const files = getFlacFiles(__dirname);
  const promises = files.map(async (file) => {
    const filePath = `${__dirname}\\${file.name}`;
    const metadata = await parseFile(`${filePath}`);
    const options = {
      apiKey: apiKey,
      title: metadata.common.title,
      artist: metadata.common.artist,
      optimizeQuery: true,
    };
    const lyrics = await getLyrics(options);
    metadata.common.lyrics = [];
    metadata.common.lyrics.push(lyrics);
    ffmetadata.write(filePath, metadata.common, function (err: Error | null) {
      if (err) console.error("Error writing metadata:", err);
      else console.log("Data written");
    });
  });
  await Promise.all(promises);
}

main();
