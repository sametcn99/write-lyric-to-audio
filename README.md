# Music Metadata and Lyrics Fetcher

This project is designed to fetch and display metadata for audio files, specifically focusing on `.flac` and `.mp3` formats. It also integrates with the Genius API to retrieve lyrics for the songs based on the metadata obtained.

## Features

- **Metadata Extraction**: Extracts metadata from `.flac` and `.mp3` audio files using the `music-metadata` library.
- **Lyrics Fetching**: Retrieves lyrics for songs using the `genius-lyrics-api`, requiring a Genius API key.
- **Environment Variables**: Utilizes Deno's dotenv library to manage environment variables securely.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- A Genius API key, which you can obtain by creating an account on the [Genius API website](https://genius.com/developers).

## Installation and Setup

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm i` and after run `npm run start`

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

If you have any questions or suggestions, please open an issue on the GitHub repository or contact me on [telegram](https://t.me/sametc0)

## Acknowledgments

- Thanks to the creators of the `music-metadata`, `genius-lyrics-api`, and `ffmetadata` npm packages for making audio file processing and lyrics fetching possible.
- This project is built using Deno, a modern runtime for JavaScript and TypeScript.
