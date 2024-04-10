# Free Games Notifier 🎮🚀

## Overview

The Free Games Notifier is your ultimate tool to stay updated on all the latest free game offerings across multiple platforms! With a focus on delivering timely notifications directly to your preferred channel - never miss out on claiming your next favorite title. Whether you're a casual gamer or a hardcore enthusiast, this project ensures you're always in the loop with the best deals and free releases. 🌟

## Features

- **Multi-Platform Support** 🕹️: Tracks free games across various platforms such as Steam (more soon)
- **Instant Notifications** 🔔: Sends out immediate alerts as soon as a new free game is available.
- **Customizable Channels** 📬: Choose your notification medium - Discord, Email, and more, to get the news where you want it.
- **Flexible Configuration** ⚙️: Easily configure which platforms to monitor and specify your notification preferences.
- **User-friendly Interface** 🌈: A simple yet powerful setup that gets you started in minutes.

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/jakmaz/free-games-notifier.git
   cd free-games-notifier
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up configuration**

   Edit the `config/default.yaml` file to set up your platform preferences and notification channels.

4. **Run the application**

   ```bash
   npm start
   ```

## Configuration

Adjust the `config/default.yaml` to match your preferences. Here's an example for setting up Steam and GOG platforms and using Discord for notifications:

```yaml
mainConfiguration:
  platforms:
    - Steam
  notificationChannel: Ntfy

settings:
  channelSettings:
    Ntfy:
      topic: free-games

  platformSettings:
    Steam:
      userPreferences:
        types: [games, dlcs, bundles]
```

## Contribution

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. 🙌

- Fork the Project
- Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
- Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the Branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

## License

Distributed under the Apache 2.0 License. See `LICENSE` and `NOTICE` for more information.

## Acknowledgements

- All the gamers and developers contributing to this project! 🌟
- The open-source community for continuous inspiration and support. 🤝

Grab your controller, and let's dive into the world of gaming together with the Free Games Notifier! 🎉🎮
