# Pain

## Aantekeningen

Let altijd op de core functionaliteit.
Bedenk bij alle dingen die je doet of het wel hoort bij de core functionaliteit.

Doe alsof je deze app als briefing doorgeeft aan een backend engineer.

Maak een navigatiebalkje zodat de gebruiker in een random volgorde door het formulier heen kan.

Als de gebruiker nog niet klaar is met het formulier, dan kan de gebruiker het formulier opslaan door normaal te submitten.
Een checkbox aan het einde van het formulier laat de gebruiker confirmen dat hij/zij klaar is.
Als de gebruiker wel JS heeft dan MOET dat met JS, dus gewoon de HTML opslaan in de localstorage en terugzetten op pageload.

## Hoe werkt dit

De gebruiker krijgt een URL met een token in de URL query params, deze is uniek aan deze gebruiker.
Wanneer deze gebruiker naar de pagina gaat voor de eerste keer wordt er door de server gekeken of de gebruiker dit formulier al eens heeft ingevuld.
Als de gebruiker nog niks heeft gedaan, dan wordt de standaard pagina teruggestuurd.
De pagina heeft meerdere `<form>` elementen, voor elke categorie 1.
Voor elk `<form>` element moet de gebruiker na het invullen deze submitten.
Als dit formulier wordt verzonden wordt dit met een POST request gedaan.
De token van de gebruiker wordt meegestuurd door een hidden input veld waar de gebruikers token in geplaatst wordt, en de data wordt op de server opgeslagen.
De volgende keer dat de gebruiker de pagina laadt, **worden de al gesubmitte formulieren op de server voorgerenderd om alle data te bevatten.**


## TODO

* Think about how to show progress. Do as much as you can without Javascript
* Optie voor anoniem toevoegen
* 