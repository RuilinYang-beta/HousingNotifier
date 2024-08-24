# About

This is an expo App to query multiple housing providers in Berlin/Potsdam region. When it's fully finished, it can:

- Automatically send queries to a housing provider at certain time interval; send user push notifications; this function can be toggled on / off.
- Fire a query of a certain housing provider manually.
- Set criterion to filter the possible searching results, such as including and / or excluding certain keywords.

The request to each housing provider differs significantly, so as the way to parse the response, therefore these functionalities are hard-coded for each housing provider. See the file `HousingNotifier/requests/onFire.ts`.

# Progress

Currently manually fire a query and display the result is finished.
Next up is to tackle the automatic query function.
Later:

- how to send push notification?
- incorporate user's filters
