# AI-FAQ System

Detta projekt är ett AI-drivet FAQ-system som använder embeddings för semantisk sökning.

## Installation

1.  Klona repot till din lokala maskin.
2.  Navigera till projektets rotkatalog i din terminal.
3.  Kör `npm install` för att installera alla nödvändiga beroenden.

## Konfiguration

* Se till att du har en Supabase-databas inställd och att dina anslutningsuppgifter finns tillgängliga.
* Konfigurera eventuella miljövariabler i `.env`-filerna i både `client`- och `server`-mapparna.

## Starta applikationen

### Starta servern (Backend)

1.  Navigera till `server`-mappen i din terminal:

    ```bash
    cd server
    ```

2.  Starta servern med Node.js:

    ```bash
    node server.js
    ```

    Servern kommer att starta och lyssna på angiven port (vanligtvis 3000).

### Starta klienten (Frontend)

1.  Öppna en ny terminalflik eller ett nytt terminalfönster.
2.  Navigera till `client`-mappen:

    ```bash
    cd client
    ```

3.  Starta React-applikationen:

    ```bash
    npm start
    ```

    React-applikationen kommer att starta och öppnas i din webbläsare (vanligtvis på `http://localhost:3000`).

## Användning

* När både servern och klienten är igång kan du använda FAQ-systemet via webbgränssnittet.
* Skriv din fråga i sökrutan och systemet kommer att returnera det mest relevanta svaret baserat på semantisk sökning.

## Ytterligare information

* För mer information om API-anrop, se dokumentationen i `server`-mappen.
* För mer information om frontend-komponenter, se koden i `client/src`-mappen.

## Bidrag

Bidrag är välkomna! Om du vill bidra, vänligen skapa en pull request
