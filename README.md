# Music Metadata and Lyrics Fetcher

This project is designed to fetch and display metadata for audio files, specifically focusing on `.flac` and `.mp3` formats. It also integrates with the Genius API to retrieve lyrics for the songs based on the metadata obtained. The project utilizes Deno for runtime and leverages various npm packages for metadata parsing and lyrics fetching.

## Features

- **Metadata Extraction**: Extracts metadata from `.flac` and `.mp3` audio files using the `music-metadata` library.
- **Lyrics Fetching**: Retrieves lyrics for songs using the `genius-lyrics-api`, requiring a Genius API key.
- **Environment Variables**: Utilizes Deno's dotenv library to manage environment variables securely.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Deno installed on your system.
- A Genius API key, which you can obtain by creating an account on the [Genius API website](https://genius.com/developers).

## Installation and Setup

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Create a `.env` file in the root of the project directory.
4. Add your Genius API key to the `.env` file as follows:
   `GENIUS_API_KEY="your_genius_api_key_here"`
5. Ensure you have Deno installed and set up on your system.

## Usage

To use the Music Metadata and Lyrics Fetcher, follow these steps:

1. Open your terminal.
2. Navigate to the project directory.
3. Write the file path where your audio files in to __dirname constant
4. Run the script using Deno:
5.  `deno task start`
6.  Make sure to grant the necessary permissions for file reading and network access.

## Contributing

Contributions to the Music Metadata and Lyrics Fetcher are welcome. To contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

This project is licensed under the GPL-3.0 - see the LICENSE file for details.

## Contact

If you have any questions or suggestions, please open an issue on the GitHub repository.

## Acknowledgments

- Thanks to the creators of the `music-metadata`, `genius-lyrics-api`, and `ffmetadata` npm packages for making audio file processing and lyrics fetching possible.
- This project is built using Deno, a modern runtime for JavaScript and TypeScript.