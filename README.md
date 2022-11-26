# Health Companion
## _One Stop Solution for All Your Healthcare Needs_
    


Health Companion is a cloud-enabled, web-ready, application; paired with a node-mcu for accessibility to provide a seamless integration between hardware and software

- Type some Markdown on the left
- See HTML in the right
- ✨Magic ✨

## Features

- Tablet reminder with LED and buzzer integration
- Doctor appointment scheduling through a single click
- Personal drive to store medical records securely on the cloud
- ML based workout recommendation system
- RFID based smart calorie tracking and nutritional management

Markdown is a lightweight markup language based on the formatting conventions
that people naturally use in email.
As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is *actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right.

## Tech

Health Companion uses a number of external dependencies to work:

- [Firebase Real-time Database] - Free to use cloud database
- [Auth0] - Provides a secure login functionality
- [Arduino] - To log meals and get reminders for tablets
- [Google Charts] - Draw beautiful, dynamic timeline charts to visualise food consumption and appointments
- [Bootstrap] - Great UI boilerplate for modern web apps
- [Log Meal] - API to get approx. nutritional value of food
- [Twilio] - Notifies users and doctors about their upcoming appointments

And of course Health Companion itself is open source with a [public repository][dill]
 on GitHub.

## Installation

Clone the repo with:

```sh
git clone https://github.com/aswarthm/foodCompanion.git
cd foodCompanion
node start
```

`./src` contains the website
`./tablet_esp` contains tablet reminder logic
`./esp_firebase` contains logic for RFID based meal tracking

## Development

Want to contribute? Great!

Fork the repo and PR your changes

## License

MIT
