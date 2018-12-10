# Programmeren 4 Gameserver - met userverificatie
De gameserver met JWT token authenticatie en userverificatie op CRUD functionaliteit. 

1. Een gebruiker registreert zich en logt in. 
2. Na succesvol inloggen krijgt de gebruiker een token. De payload van het token bevat de id van de user. Bij ieder volgend request moet het token meegestuurd worden. 
3. De server valideert het token en decrypt de payload, waarin de user id zit. De user id wordt meegegeven aan ieder request via de `next` functie. 
4. Ieder endpoint heeft hiermee de user id, waarmee gevalideerd kan worden of de ingelogde gebruiker geautoriseerd is om CRUD acties uit te voeren. 
	- Bij het aanmaken van een item (C) wordt de ingelogde user als 'eigenaar' geregistreerd.
	- Lees-acties zijn toegestaan voor alle gebruikers (R), en zouden dus zonder tokenvalidatie uitgevoerd kunnen worden. 
	- Bij alle update- of delete operaties (UD) geldt dat alleen de gebruiker die de eigenaar van het item is dat item mag wijzigen of verwijderen.

Nog niet alle code in deze repo is volledig uitgewerkt. 

De voorbeeldcode in de tests gebruikt ook JWT.

## Usage
Run

```
npm install
npm start
```

For testing:
```
npm test
```

