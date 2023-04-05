# Browser tech 2223

This website is a survey for the minor Web Design & Development that heavily implements progressive enhancement.
It is viewable at [browsertech.home.dutchellie.nl](https://browsertech.home.dutchellie.nl).

## Features

- Light and dark mode
- Lightweight page
- Single page	(Using CSS)
- Automatic progression save (Using JS)
- Manual progression save (Using server-side code)
- Responsive
- Progressive enhancement (and graceful degradation)

### Progression saving

Using localstorage in the browser, the progress of the survey is saved if JS is enabled.
However, if JS doesn't work, you can still save your progress.
This is because the individual sections of the form survey are actually small forms on themselves.
After submitting each one, the server saves your progression using a unique user token.
The URL should contain a unique token for the user that the server can use to associate the submitted answers with the user.
The server will render the page server-side, so when reloading the page, the progress is still there.
You can then edit your answers and submit them again.

## Tested browsers

- Chrome, Firefox & Lynx (Linux)
- Chrome (Android)
- Safari (iPhone, MacOS)

## Test

1. You can fill in the form (Always)
2. You can submit the form	(Always)
3. The form is paginated and you're not shown too many forms at once (CSS)
4. You can view your progress (JS)
5. Your progress is saved and you can resume the survey at any time (Always)
6. Your progress is saved automatically (JS)
7. It's clear where you are in the survey (Always)

## Test reports

### Normal browsers

This test results in the same on every following browser:

- Chrome Linux
- Firefox Linux
- Chrome Android
- Safari iPhone
- Safari Mac

With everything enabled, works perfectly fine.
Every test is successful.
With localstorage disabled, the progress bar doesn't work and neither does automatically saving progression.
Saving progression still works by submitting each individual form, however.
With JS disabled, the range elements look different, they are now number input elements.
The features above also do not work anymore.
Submitting the form works differently, but is still very functional.
With CSS disabled, the page has no styling.
Every single form on the page is visible at once, but still everything is functional.

### Lynx

Lynx has no support for JS or CSS, and works entirely in the terminal.
This means no styling, no scripting and no images or any of the sort.
It also does not have range elements, but forms still work normally.

The website is loaded normally on Lynx.
Every form on the page is visible and you can input and submit your answers.
They still submit individually and that means that progression is still saved on the server.
The range elements visible on normal browsers are actually created using JS, so they aren't here.
They are now input number elements, so everything works fine.

Lynx also has no form validation at all, so that's not a factor here.

<!-- ## Hoe werkt dit

De gebruiker krijgt een URL met een token in de URL query params, deze is uniek aan deze gebruiker.
Wanneer deze gebruiker naar de pagina gaat voor de eerste keer wordt er door de server gekeken of de gebruiker dit formulier al eens heeft ingevuld.
Als de gebruiker nog niks heeft gedaan, dan wordt de standaard pagina teruggestuurd.
De pagina heeft meerdere `<form>` elementen, voor elke categorie 1.
Voor elk `<form>` element moet de gebruiker na het invullen deze submitten.
Als dit formulier wordt verzonden wordt dit met een POST request gedaan.
De token van de gebruiker wordt meegestuurd door een hidden input veld waar de gebruikers token in geplaatst wordt, en de data wordt op de server opgeslagen.
De volgende keer dat de gebruiker de pagina laadt, **worden de al gesubmitte formulieren op de server voorgerenderd om alle data te bevatten.**
 -->
