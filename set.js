const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0g4ZHZGVkJ4aUZhWkd3dTIvUmpvc2hRSDFQYUF5RzBSN09QV09MZVNFbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYldVcVE5ME14SHVzMzBCVStOWDNDUDFTRHY1ZUdOcjhCVmRvM2hIR2FDYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4UHJESVg2YkY3a0tDRHdxREFQbG9mOHowc01mdm9YaGowc0xSWWJPT21jPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4c0J1NDU5cUxIK3J5ZnREOEZxdUtXS2J1NHNhVHRvcXduMXpyTjRMZXc4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndJZ0s4TGtFUEg0ZElHak9wdmI5bGtFT3kzdzRGblVmK1RWZmJjZEpnMVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklnV0lyN2dBMjM0aGM4SnArb05XaFRielZkdEkvK3pQL0hkN05aVG8zalk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE1sd1A5amFlT1BlRk5NckZkMEwzQXRyZHgySDlEUklqTDhXYnhCM2ttMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRnk2aVhJUUl5dUZaY0JhdDlZMmhNdmNSd3d6ckFINHVTdlB1cVhLSFV5bz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBINUFzeUpDSTgrR3BWejA5dkNzbTZuLzh3dUZQYkIrZGxwcTZqR3g0djhmSVZKME5LUlAzRGUzRlNyY2FVVW51ZW1wWktRWHRCMUxnalRPRENsOWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQyLCJhZHZTZWNyZXRLZXkiOiJHT3dldS9RKzE4WkZxR1dCOXp2cDZHenZKa3FsODJkWVd6NEMveVgva280PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiItVXliakdVVFR1Mll2MUJXem5DeFNRIiwicGhvbmVJZCI6IjYwYjJlMzA4LTUxY2QtNDA5Ny04MDc5LTFlNDJlY2JlNWNjNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTU2U0WXlMM290cGczQ2ZhSHJ5dEFGR1dLSUk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVlsOFFhWExOV3dVdWc3TERBenNkbDIwdEs0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlpDQkxBWUVCIiwibWUiOnsiaWQiOiI5NDcxMjQzODkwNDoxOEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJvbWF4IHNraXBwZXIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tMdmpwTUZFSVBuMDd3R0dBNGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlpiZkZIU1dQVDFDdE9lOStjN3A1dnJPOGltQmw4emVlczUxWUhCcTFyaWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ilpwekp3UGJqSEdUcDlBdng0MWZBeWJ2YVlSUVNMLzlkQ2wyUTBoQTY0N203eDFQK1J0aHluVkY2WjJtLzA4N0RnNTg4U3FXbDFJblhoQldZREpqTkF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJFM1BhTUMzdjlCQ3JQczY5cWVlTjlqdUtlTyswQkZmS1pzZ1lweGEydnA3SGZyRDhpckNLS3RnSk1COWZOdXV0bmdrWnFTN21rdzN5Y3I0TGs3RENpZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzEyNDM4OTA0OjE4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldXM3hSMGxqMDlRclRudmZuTzZlYjZ6dklwZ1pmTTNuck9kV0J3YXRhNHAifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mzc4MTQ5MjgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT0xhIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Njabulo",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Njabulo",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
