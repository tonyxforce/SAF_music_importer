# SEF_music_importer

A simple mp3 importer for [tizio_bello's `Stage Equipment Fornitures`](https://www.curseforge.com/minecraft/mc-mods/stage-equipment-fornitures) mod

## Using released binaries (for most people)

### Prerequisites

- Have either [ffmpeg](https://www.ffmpeg.org/) installed in PATH or have the ffmpeg.exe executable downloaded
    - I also [host ffmpeg on my website](https://tonyxforce.hu/ffmpeg.exe) for quick access, but you shouldn't trust any unofficial sources for binaries
- Have the to-be-converted songs in mp3, mp4 (DO **NOT** rename mp4 to mp3), or pretty much any common audio or video format
- Download the latest version of this converter from the [releases page](https://github.com/tonyxforce/SAF_music_importer/releases)

### Usage

1. Put the converter's executable (for example, `index-win.exe` for windows) in an empty directory
    - If you don't have ffmpeg installed in PATH, put ffmpeg.exe in the same directory
2. Run the executable and it should create two directories named `INPUT` and `OUTPUT`
3. Put the mp3 or mp4 files in the `INPUT` directory
4. Run the executable again and it should create the resource pack into the `OUTPUT` directory
5. Copy the directory named `S.E.F_Music_Pack` into the `resourcepacks` directory of your minecraft install
6. Go into the in-game resource pack settings and install the pack, if it gives you a warning about the wrong version, ignore it

## Building from source

### Prerequisites

- Have Node.js with npm installed
- Have ffmpeg either in PATH or ffmpeg.exe downloaded
- Have git installed for source control

### Build

1) Clone the repo:

    ```bash
    git clone https://github.com/tonyxforce/SAF_music_importer
    ```

2) `cd` into the directory

    ```bash
    cd SAF_music_importer
    ```

    - If you don't have ffmpeg in PATH, copy ffmpeg.exe here

3) Install all required dependencies and packages

    ```bash
    npm i
    ```

4) To run the code, execute:

    ```bash
    npm start
    ```

5) To build/package it, execute:

    ```bash
    npm run build
    ```

    It should create a directory named `build` with binaries for all platforms in it
