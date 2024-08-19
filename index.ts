import { parseFile } from "npm:music-metadata";
import { getLyrics } from "npm:genius-lyrics-api";
import ffmetadata from "npm:ffmetadata";

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
      (file) =>
        file.isFile &&
        (file.name.endsWith(".flac") || file.name.endsWith(".mp3"))
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
  let apiKey: string | null = null;
  let isValidAPIKey = false;

  while (!isValidAPIKey) {
    apiKey = prompt("Please enter your Genius API key:");
    if (!apiKey) {
      console.error("API key is required.");
      continue;
    }

    try {
      const validateAPIKey = await getLyrics({
        apiKey,
        title: "test",
        artist: "test",
      });
      if (validateAPIKey) {
        isValidAPIKey = true;
      } else {
        console.error("Invalid API key. Please try again.");
      }
    } catch (error) {
      console.error("Error validating API key:", error);
    }
  }

  const directory = prompt("Please enter the directory path:") || "";
  if (!directory) {
    console.error("Directory path is required.");
    return;
  }

  const files = getFlacFiles(directory);

  for (const file of files) {
    try {
      const metadata = await parseFile(`${directory}/${file.name}`);
      const title = metadata.common?.title;
      const artist = metadata.common?.artist;

      if (!title || !artist) {
        console.log(
          `Skipping ${file.name} due to missing title or artist metadata.`
        );
        continue;
      }

      const lyrics = await getLyrics({ apiKey, title, artist });
      if (lyrics) {
        metadata.common.lyrics = [];
        metadata.common.lyrics.push(lyrics);
        ffmetadata.write(
          `${directory}/${file.name}`,
          metadata.common,
          function (err: Error | null) {
            if (err) {
              if (err.message.includes("Permission denied")) {
                console.error(
                  "Error writing metadata: Permission denied. Please check file permissions."
                );
              } else {
                console.error("Error writing metadata:", err);
              }
            } else {
              console.log("Data written");
            }
          }
        );

        console.log(`Lyrics added to ${file.name}`);
      } else {
        console.log(`No lyrics found for ${file.name}`);
      }
    } catch (error) {
      if (error.message.includes("Permission denied")) {
        console.error(
          `Error processing file ${file.name}: Permission denied. Please check file permissions.`
        );
      } else {
        console.error(`Error processing file ${file.name}:`, error);
      }
    }
  }
}

// Call the main function
main().catch((error) => {
  if (error.message.includes("Permission denied")) {
    console.error(
      "An error occurred: Permission denied. Please check file permissions."
    );
  } else {
    console.error("An error occurred:", error);
  }
});
